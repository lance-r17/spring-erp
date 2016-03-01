import when from 'when';
import client from './client';
import follow from './follow';

define(function(require) {
    'use strict';

    var root = 'api';

    var helper = {
        getAllByPaging: function(options) {
            var { rel, resource, pageSize, pageNumber, schema, onSuccess } = options,
                page = {},
                links = [];

            resource = resource || rel;
            pageNumber = pageNumber || 0;

            follow(
                client,
                root,
                [ { rel: rel, params: { size: pageSize, page: pageNumber } } ]
            ).then(collection => {

                if (schema) {
                    return collection;
                } else {
                    return client({
                        method: 'GET',
                        path: collection.entity._links.profile.href,
                        headers: {'Accept': 'application/schema+json'}
                    }).then(response => {
                        schema = response.entity;
                        Object.keys(schema.properties).forEach(property => {
                            if (schema.properties[property].hasOwnProperty('format') &&
                                schema.properties[property].format === 'uri') {
                                delete schema.properties[property];
                            }
                            if (schema.properties[property].hasOwnProperty('$ref')) {
                                delete schema.properties[property];
                            }
                        });
                        return collection;
                    })
                }
            }).then(collection => {
                links = collection.entity._links;
                page = collection.entity.page;

                return collection.entity._embedded[resource].map(item =>
                    client({
                        method: 'GET',
                        path: item._links.self.href
                    })
                )
            }).then(itemPromises => {
                return when.all(itemPromises);
            }).done(items => {
                var attributes = Object.keys(schema.properties);

                onSuccess({
                    page,
                    items,
                    schema,
                    attributes,
                    links
                });
            });
        },

        getLinksByPage: function(options) {
            const { rel, pageSize, onSuccess } = options;

            follow(client, root, [{
                rel: rel,
                params: {size: pageSize}
            }]).done(response => {
                onSuccess(response.entity._links);
            });
        },

        getSearchLinks: function(options) {
            const { rel, onSuccess } = options;

            follow(client, root, [rel]
            ).then(response => {
                return client({
                    method: 'GET',
                    path: response.entity._links.search.href
                }).then(response => {
                    return response.entity._links;
                })
            }).done(links => {
                if (onSuccess) {
                    onSuccess(links);
                }
            });
        },

        navigateTo: function(options) {
            const { navUri, resource, onSuccess } = options;
            var page = {},
                links = [];

            client({
                method: 'GET',
                path: navUri
            }).then(collection => {
                links = collection.entity._links;
                page = collection.entity.page;

                return collection.entity._embedded[resource].map(item =>
                    client({
                        method: 'GET',
                        path: item._links.self.href
                    })
                );
            }).then(itemPromises => {
                    return when.all(itemPromises);
            }).done(items => {
                onSuccess({
                    page,
                    items,
                    links
                })
            })
        },

        get: function(options) {
            const { path, params, onSuccess, onError } = options;

            client({
                method: 'GET',
                path: path,
                params: params
            }).done(response => {
                if (onSuccess) {
                    onSuccess(response);
                }
            }, error => {
                if (onError) {
                    onError(error);
                }
            });
        },

        post: function(options) {
            const { rel, item, onSuccess, onError } = options;

            follow(client, root, [rel]
            ).done(response => {
                return client({
                    method: 'POST',
                    path: response.entity._links.self.href,
                    entity: item,
                    headers: {'Content-Type': 'application/json'}
                }).done(
                    response => {
                        if (onSuccess) {
                            onSuccess(response);
                        }
                    }, error => {
                        if (onError) {
                            onError(response);
                        }
                    }
                )
            })
        },

        put: function(options) {

            const { item, updatedItem, onSuccess, onError } = options;

            client({
                method: 'PUT',
                path: item.entity._links.self.href,
                entity: updatedItem,
                headers: {
                    'Content-Type': 'application/json',
                    'If-Match': item.headers.Etag
                }
            }).done(
                response => {
                    if (onSuccess) {
                        onSuccess(response);
                    }
                }, error => {
                    if (onError) {
                        onError(error);
                    }
                }
            );
        },

        delete: function(options) {
            const { item, onSuccess, onError } = options;

            client({
                method: 'DELETE',
                path: item.entity._links.self.href
            }).done(response => {
                if (onSuccess) {
                    onSuccess(response);
                }
            }, error => {
                if (onError) {
                    onError(error);
                }
            });
        }
    };


    return helper;
});
