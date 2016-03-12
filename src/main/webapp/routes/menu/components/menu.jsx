import React from 'react';
import update from 'react/lib/update';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import cx from 'classnames';

import { FaIcon, Label, Collapse } from '../../../controls';
import { toggleable } from '../../../decorators';

const { bool, object, string, number, func, oneOfType, oneOf } = React.PropTypes

const ItemTypes = {
    LINK: 'link',
    SUBTREE: 'subtree',
    BLOCK: 'block',
    MENUTREE: 'menutree'
};

const style = {
    border: '1px dashed gray',
    cursor: 'move'
};

const NestedMenu = [
    {
        id: 1,
        header: 'Navigation',
        links: [
            {
                name: 'Dashboard',
                path: '/dashboard',
                fa: 'dashboard',
                label: {
                    content: 'Top',
                    bsStyle: 'success',
                    pullRight: true
                }
            }
        ]
    },
    {
        id: 2,
        header: 'Admin',
        links: [
            {
                name: 'Users',
                path: '/users',
                fa: 'users'
            }
        ]
    },
    {
        id: 3,
        header: 'Development',
        links: [
            {
                collapse: {
                    name: 'Toolkits',
                    fa: 'briefcase',
                    links: [
                        {
                            name: 'Page',
                            href: '/page',
                            label: {
                                content: 'new',
                                bsStyle: 'primary',
                                pullRight: true
                            }
                        },
                        {
                            name: 'Menu',
                            href: '/menu'
                        }
                    ]
                }
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
                    <nav className="nav-container">
                        <div className="nav">
                            <MenuTree />
                        </div>
                    </nav>
                </div>
                {/* End page content */}

            </div>

            
        )
    }
}


@DragDropContext(HTML5Backend)
@DropTarget(
    ItemTypes.BLOCK,
    { drop() {} }, 
    connect => ({
        connectDropTarget: connect.dropTarget()
    })
)
class MenuTree extends React.Component {

    static propTypes = {
        connectDropTarget: func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            blocks: NestedMenu
        }
    }

    moveBlock = (id, atIndex) => {
        const { block, index } = this.findBlock(id);
        this.setState(update(this.state, {
            blocks: {
                $splice: [
                    [index, 1],
                    [atIndex, 0, block]
                ]
            }
        }));
    }

    findBlock = (id) => {
        const { blocks } = this.state;
        const block = blocks.filter(c => c.id === id)[0];

        return {
            block,
            index: blocks.indexOf(block)
        };
    }

    render() {
        const { connectDropTarget } = this.props;
        const { blocks } = this.state;

        return connectDropTarget(
            <ul className="nav-menu">
                { blocks.map( (block) => {
                    return (
                        <MenuBlock key={block.id}
                                   { ...block } 
                                   moveBlock={this.moveBlock}
                                   findBlock={this.findBlock}/> 
                    )
                }) }
            </ul>
        );
    }
}

const blockSource = {
    beginDrag(props) {
        return {
            id: props.id,
            originalIndex: props.findBlock(props.id).index
        };
    },

    endDrag(props, monitor) {
        const { id: droppedId, originalIndex } = monitor.getItem();
        const didDrop = monitor.didDrop();

        if (!didDrop) {
            props.moveBlock(droppedId, originalIndex);
        }
    }
};

const blockTarget = {
    canDrop() {
        return false;
    },

    hover(props, monitor) {
        const { id: draggedId } = monitor.getItem();
        const { id: overId } = props;

        if (draggedId !== overId) {
            const { index: overIndex } = props.findBlock(overId);
            props.moveBlock(draggedId, overIndex);
        }
    }
};

@DropTarget(
    ItemTypes.BLOCK,
    blockTarget, 
    connect => ({
        connectDropTarget: connect.dropTarget()
    })
)
@DragSource(
    ItemTypes.BLOCK,
    blockSource, 
    (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    })
)
class MenuBlock extends React.Component {
    static propTypes = {
        connectDragSource: func.isRequired,
        connectDropTarget: func.isRequired,
        isDragging: bool.isRequired,
        id: number.isRequired,
        header: string.isRequired,
        moveBlock: func.isRequired,
        findBlock: func.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { id, header, links, isDragging, connectDragSource, connectDropTarget } = this.props;
        const opacity = isDragging ? 0 : 1;

        return connectDragSource(connectDropTarget(
            <li className="block" style={{ ...style, opacity }}>
                <div className="list-header">
                    { header }
                </div>
                <ul>
                { links.map( (link, i) => {
                    const { collapse, ...linkProps} = link;
                    if (collapse) {
                        return (
                            <MenuSubtree key={i} {...collapse} />
                        )
                    } else {
                        return (
                            <MenuLink key={i} {...linkProps} />
                        )
                    }
                })}
                </ul>
            </li>
        ));
    }

}

@toggleable
class MenuSubtree extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { name, fa, links, open, onToggle } = this.props;
        return (
            <li className={cx({ 'active': open })} style={{ ...style }}>
                <a href="#" onClick={onToggle}>
                    <FaIcon fa={fa} />
                    <span className="menu-title">{name}</span>
                    <i className="arrow"></i>
                </a>

                <Collapse in={open}>
                    <ul>
                        { links.map( (link, i) => {
                            return (
                                <MenuLink key={i} {...link} />
                            )
                        }) }
                    </ul>
                </Collapse>
            </li>
        )
    }
}

class MenuLink extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { name, path, fa, label } = this.props;
        let highlight = null;
        if (label) {
            const { content, pullRight, ...props } = label;
            highlight = <Label {...props} className={cx({'pull-right': pullRight})}>{ content }</Label>
        }
        return (
            <li style={{ ...style }}>
                { fa ? <FaIcon fa={fa} /> : null }
                { name }
                { highlight }
            </li>
        )
    }
}
