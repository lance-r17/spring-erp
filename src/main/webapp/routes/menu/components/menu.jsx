import React from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router';
import cx from 'classnames';
import nestable from 'nestable';
import $ from 'jquery';

import { FaIcon } from '../../../controls';

const { bool, object, string, number, func, oneOfType, oneOf } = React.PropTypes

const Nestable = (DecoratedComponent) => {
    return class extends React.Component {

        static propTypes = {
            maxDepth : number,
            group: number,
            expandBtnHTML: string,
            collapseBtnHTML: string
        };

        static defaultProps = {
            maxDepth: 3,
            group: 1,
            expandBtnHTML   : '<button class="pull-right" data-action="expand" type="button"><i class="fa fa-plus-square" /></button>',
            collapseBtnHTML : '<button class="pull-right" data-action="collapse" type="button"><i class="fa fa-minus-square" /></button>',
        };

        constructor(props) {
            super(props);
        }

        componentDidMount() {
            this.nestable();
        }

        nestable = () => {
            this.nestableContainer = $(findDOMNode(this.refs['nestable-container']));

            this.nestableContainer.nestable({
                maxDepth: this.props.maxDepth,
                group: this.props.group,
                expandBtnHTML: this.props.expandBtnHTML,
                collapseBtnHTML: this.props.collapseBtnHTML
            });

            this.nestableContainer.on('change', () => {
                console.log(this.nestableContainer.nestable('serialize'));
            });
        }

        render() {
            let { maxDepth, group, ...props } = this.props;
            _.extend(props, { nestable: this.nestable });

            return (
                <div ref="nestable-container" className="dd">
                    <DecoratedComponent {...props} {...this.state} />
                </div>
            )
        }
    }
}

const NestedMenu = [
    {
        header: 'Navigation',
        children: [
            {
                name: 'Dashboard',
                path: '/dashboard',
                fa: 'dashboard',
            }
        ]
    },
    {
        header: 'Admin',
        children: [
            {
                name: 'Users',
                path: '/users',
                fa: 'users'
            }
        ]
    },
    {
        header: 'Development',
        children: [
            {
                name: 'Toolkits',
                fa: 'briefcase',
                children: [
                    {
                        name: 'Page',
                        path: '/page'
                    },
                    {
                        name: 'Menu',
                        path: '/menu'
                    }
                ]
            }
        ]
    }
    
];

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
    }    

    render() {
        return (
            <div id="content-container">

                {/* Page Title */}
                <div id="page-title">
                    <h1 className="page-header text-overflow">Menu</h1>
                </div>
                {/* End page Title */}

                {/* Page content */}
                <div id="page-content">
                    <NestableMenuList list={NestedMenu}/>
                </div>
                {/* End page content */}

            </div>

            
        )
    }
}

@Nestable
class NestableMenuList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { list } = this.props;
        let items = [];

        list.forEach( (item, i) => {
            const { header, name, path, fa, children } = item;

            let content = (
                <div className="dd3-content">
                    { fa ? <FaIcon fa={fa} /> : null }
                    { header || name  }
                </div>
            );

            let childList = children ? (<NestableMenuList list={children} />) : null;

            items.push(
                <li className="dd-item dd3-item" data-header={header} data-name={name} data-path={path} data-fa={fa} >
                    <div className="dd-handle dd3-handle">Drag</div>
                    { content }
                    { childList }
                </li>
            );
        });

        return (
            <ol className="dd-list">
                { items }
            </ol>
        )
    }
}

class NestableMenuItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        
    }
}
