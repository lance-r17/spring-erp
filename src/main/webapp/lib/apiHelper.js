import when from 'when';
import client from './client';
import follow from './follow';

define(function(require) {
    'use strict';

    var root = 'api';

    var helper = {
        loadPagingData: function(options) {
            var { pageSize, rel, resourceName, callback } = options;
            resourceName = resourceName || rel;
            follow(client, root, [{rel: rel, params:{size: pageSize}}]
            ).then(collection => {
                return client({
                    method: 'GET',
                    path: collection.entity._links.profile.href,
                    headers: {'Accept': 'application/schema+json'}
                }).then(schema => {
                    Object.keys(schema.entity.properties).forEach(property => {
                        if (schema.entity.properties[property].hasOwnProperty('format') &&
                            schema.entity.properties[property].format === 'uri') {
                            delete schema.entity.properties[property];
                        }
                        if (schema.entity.properties[property].hasOwnProperty('$ref')) {
                            delete schema.entity.properties[property];
                        }
                    });
                    this.schema = schema.entity;
                    this.links = collection.entity._links;
                    return collection;
                });
            }).then(collection => {
                this.page = collection.entity.page;
                return collection.entity._embedded[resourceName].map(item =>
                    client({
                        method: 'GET',
                        path: item._links.self.href
                    })
                );
            }).then(itemPromises => {
                return when.all(itemPromises);
            }).done(items => {
                var page = this.page,
                    schema = this.schema,
                    attributes = Object.keys(this.schema.properties),
                    links = this.links;
                    

                callback({
                    page,
                    items,
                    schema,
                    attributes,
                    pageSize,
                    links                    
                });
            });
        }
    }

    return helper;
});