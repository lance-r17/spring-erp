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
                            <MenuTree menu={NestedMenu} />
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

        let numOfLinks = 0,
            numOfSubtree = 0;

        let blocks = this.props.menu.map( (block, i) => {
            block.id = `b${i}`;
            let { links } = block;

            if (links) {
                links.forEach( link => {
                    if (link.collapse) {
                        link.collapse.id = `s${numOfSubtree++}`;

                        let subLinks = link.collapse.links;
                        subLinks.forEach( subLink => {
                            subLink.id = `l${numOfLinks++}`;
                        })
                    } else {
                        link.id = `l${numOfLinks++}`;
                    }
                })
            }

            return block;
        });
        this.state = {
            blocks: blocks,
            numOfSubtree: numOfSubtree,
            numOfLinks: numOfLinks
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

    findSubtree = (id) => {
        const { blocks } = this.state;
        let subtree = null,
            block = null;

        blocks.forEach( b => {
            if (b.links) {
                b.links.forEach( link => {
                    if (link.collapse && link.collapse.id === id) {
                        subtree = link.collapse;
                        block = b;
                    }
                })
            }
        });

        return {
            subtree,
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
    [ItemTypes.BLOCK, ItemTypes.SUBTREE],
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
        id: string.isRequired,
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
                            <MenuSubtree key={collapse.id} {...collapse} />
                        )
                    } else {
                        return (
                            <MenuLink key={linkProps.id} {...linkProps} />
                        )
                    }
                })}
                </ul>
            </li>
        ));
    }

}

const subtreeSource = {
    beginDrag(props) {
        return {
            id: props.id,
            originalIndex: props.findSubtree(props.id).index
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

const subtreeTarget = {
    canDrop() {
        return false;
    },

    hover(props, monitor) {
        const { id: draggedId } = monitor.getItem();
        const { id: overId } = props;

        if (draggedId !== overId) {
            const { index: overIndex } = props.findSubtree(overId);
            props.moveBlock(draggedId, overIndex);
        }
    }
};

@DropTarget(
    [ItemTypes.SUBTREE],
    subtreeTarget,
    connect => ({
        connectDropTarget: connect.dropTarget()
    })
)
@DragSource(
    ItemTypes.SUBTREE,
    subtreeSource,
    (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    })
)
@toggleable
class MenuSubtree extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { name, fa, links, open, onToggle, isDragging, connectDragSource, connectDropTarget } = this.props;
        const opacity = isDragging ? 0 : 1;

        return connectDragSource(connectDropTarget(
            <li className={cx({ 'active': open })} style={{ ...style, opacity }}>
                <a href="#" onClick={onToggle}>
                    <FaIcon fa={fa} />
                    <span className="menu-title">{name}</span>
                    <i className="arrow"></i>
                </a>

                <Collapse in={open}>
                    <ul>
                        { links.map( (link, i) => {
                            return (
                                <MenuLink key={link.id} {...link} />
                            )
                        }) }
                    </ul>
                </Collapse>
            </li>
        ));
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
