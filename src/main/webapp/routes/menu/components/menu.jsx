import React from 'react';
import update from 'react/lib/update';
import { findDOMNode } from 'react-dom';
import Immutable from 'immutable';
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
            blocks: Immutable.fromJS(blocks),
            numOfSubtree: numOfSubtree,
            numOfLinks: numOfLinks
        }
    }

    findItem = (id) => {
        const { blocks } = this.state;
        let item = null,
            itemType = null,
            depth = [],
            index = 0;

        if (id.startsWith('b')) {
            index = blocks.findIndex( block =>
                block.get("id") === id
            );

            item = blocks.get(index);
            itemType = ItemTypes.BLOCK;
            depth = [];
        } else if (id.startsWith('s')) {

            const blockIndex = blocks.findIndex( block => {
                let links = block.get("links");

                if (links) {
                    let linkIndex = links.findIndex( link =>
                        Immutable.Map(link).getIn(["collapse", "id"]) === id
                    );

                    if (linkIndex !== -1) {
                        index = linkIndex;
                        item = links.get(linkIndex);
                        return true;
                    }
                }

                return false;
            });

            itemType = ItemTypes.SUBTREE;
            depth = [blockIndex, "links"];
        }

        return {
            item,
            itemType,
            depth,
            index
        };
    }

    moveItem = (id, atIndex, atDepth) => {
        let { blocks } = this.state;
        const { item, itemType, depth, index } = this.findItem(id);

        if (itemType === ItemTypes.BLOCK) {
            blocks = blocks.splice(index, 1).splice(atIndex, 0, item);
        } else if (itemType === ItemTypes.SUBTREE) {
            if (_.isEqual(depth, atDepth)) {
                if (index === atIndex) {
                    return;
                } else {
                    blocks = blocks.updateIn(atDepth, links => {
                        return links.splice(index, 1).splice(atIndex, 0, item);
                    });
                }
            } else {
                blocks = 
                    blocks.updateIn(depth, links => {
                        return links ? links.splice(index, 1) : links;
                    }).updateIn(atDepth, Immutable.List.of(), links => {
                        return links.splice(atIndex, 0, item);
                    });
            }
        }

        this.setState({
            blocks: blocks
        });
    }

    moveBlock = (id, atIndex) => {
        let { blocks } = this.state;
        const { block, index } = this.findBlock(id);

        blocks = blocks.splice(index, 1).splice(atIndex, 0, block);
        this.setState({
            blocks: blocks
        });
    }

    findBlock = (id) => {
        const { blocks } = this.state;
        const index = blocks.findIndex( block =>
            block.get("id") === id
        );

        return {
            index,
            block: blocks.get(index)
        };
    }

    moveSubtree = (id, atIndex, atBlockIndex) => {
        let { blocks } = this.state;
        const { subtree, index, blockIndex } = this.findSubtree(id);

        if (blockIndex === atBlockIndex && index === atIndex) {
            return;
        }

        if (blockIndex === atBlockIndex) {
            blocks = blocks.updateIn([atBlockIndex, "links"], links => {
                return links.splice(index, 1).splice(atIndex, 0, subtree);
            });
        } else {
            blocks = blocks.updateIn([blockIndex, "links"], links => {
                if (links) {
                    return links.splice(index, 1);
                }
            }).updateIn([atBlockIndex, "links"], Immutable.List.of(), links => {
                return links.splice(atIndex, 0, subtree);
            });
        }

        this.setState({
            blocks: blocks
        });
    }

    findSubtree = (id) => {
        const { blocks } = this.state;
        let index = null,
            subtree = null;

        const blockIndex = blocks.findIndex( block => {
            let links = block.get("links");

            if (links) {
                let linkIndex = links.findIndex( link =>
                    Immutable.Map(link).getIn(["collapse", "id"]) === id
                );

                if (linkIndex !== -1) {
                    index = linkIndex;
                    subtree = links.get(linkIndex);
                    return true;
                }
            }

            return false;
        });

        return {
            subtree,
            index,
            blockIndex
        };
    }

    render() {
        const { connectDropTarget } = this.props;
        const { blocks } = this.state;

        return connectDropTarget(
            <ul className="nav-menu">
                { blocks.toJS().map( (block, i) => {
                    return (
                        <MenuBlock key={block.id}
                                   { ...block } 
                                   moveItem={this.moveItem}
                                   findItem={this.findItem}
                                   moveBlock={this.moveBlock}
                                   findBlock={this.findBlock}
                                   findSubtree={this.findSubtree}
                                   moveSubtree={this.moveSubtree} /> 
                    )
                }) }
            </ul>
        );
    }
}

const blockSource = {
    beginDrag(props) {
        const { index, depth } = props.findItem(props.id);
        return {
            id: props.id,
            originalIndex: index,
            originalDepth: depth,
            itemType: ItemTypes.BLOCK
        };
    },

    endDrag(props, monitor) {
        const { id: droppedId, originalIndex, originalDepth } = monitor.getItem();
        const didDrop = monitor.didDrop();

        if (!didDrop) {
            // props.moveBlock(droppedId, originalIndex);
            props.moveItem(droppedId, originalIndex, originalDepth);
        }
    }
};

const blockTarget = {
    canDrop(props, monitor) {
        const { itemType } = monitor.getItem();
        return itemType !== ItemTypes.BLOCK;
    },

    hover(props, monitor) {
        const { id: draggedId, originalBlockIndex, itemType: draggedItemType } = monitor.getItem();
        const { id: overId } = props;

        if (draggedId !== overId) {
            // const { index: overIndex, atDepth } = props.findBlock(overId);
            const { index: overIndex, depth, itemType: overItemType } = props.findItem(overId);

            // if (itemType === ItemTypes.BLOCK) {
            //     props.moveBlock(draggedId, overIndex);
            // } else if (itemType === ItemTypes.SUBTREE) {
            //     props.moveSubtree(draggedId, -1, overIndex);
            // }

            const atIndex = draggedItemType === ItemTypes.BLOCK ? overIndex : -1;
            let atDepth = depth;
            if (draggedItemType === ItemTypes.SUBTREE && overItemType === ItemTypes.BLOCK) {
                atDepth = [overIndex, "links"];
            }
            props.moveItem(draggedId, atIndex, atDepth);
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
        findItem: func.isRequired,
        moveItem: func.isRequired,
        moveBlock: func.isRequired,
        findBlock: func.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { id, header, links, findItem, moveItem, findSubtree, moveSubtree, isDragging, connectDragSource, connectDropTarget } = this.props;
        const opacity = isDragging ? 0 : 1;

        let subLinks = [];
        if (links) {
            subLinks = links.map( (link, i) => {
                const { collapse, ...linkProps} = link;
                if (collapse) {
                    return (
                        <MenuSubtree key={collapse.id}
                                     {...collapse}
                                     moveItem={moveItem}
                                     findItem={findItem}
                                     findSubtree={findSubtree}
                                     moveSubtree={moveSubtree} />
                    )
                } else {
                    return (
                        <MenuLink key={linkProps.id} {...linkProps} />
                    )
                }
            });
        }

        return connectDragSource(connectDropTarget(
            <li className="block" style={{ ...style, opacity }}>
                <div className="list-header">
                    { header }
                </div>
                <ul>
                { subLinks }
                </ul>
            </li>
        ));
    }

}

const subtreeSource = {
    beginDrag(props) {
        // const { index: originalIndex, blockIndex: originalBlockIndex } = props.findSubtree(props.id);
        const { index: originalIndex, depth: originalDepth } = props.findItem(props.id);
        return {
            id: props.id,
            originalIndex,
            originalDepth,
            itemType: ItemTypes.SUBTREE
        };
    },

    isDragging(props, monitor) {
        return props.id === monitor.getItem().id;
    },

    endDrag(props, monitor) {
        // const { id: droppedId, originalIndex, originalBlockIndex } = monitor.getItem();
        const { id: droppedId, originalIndex, originalDepth } = monitor.getItem();
        const didDrop = monitor.didDrop();

        if (!didDrop) {
            // props.moveSubtree(droppedId, originalIndex, originalBlockIndex);
            props.moveItem(droppedId, originalIndex, originalDepth);
        }
    }
};

const subtreeTarget = {
    canDrop() {
        return false;
    },

    hover(props, monitor) {
        // const { id: draggedId } = monitor.getItem();
        // const { id: overId } = props;

        // if (draggedId !== overId) {
        //     if (overId.startsWith('s')) {
        //         const { index: overIndex, blockIndex: overBlockIndex } = props.findSubtree(overId);
        //         props.moveSubtree(draggedId, overIndex, overBlockIndex);
        //     } else if (overId.startsWith('b')) {
        //         const { index: overIndex } = props.findSubtree(overId);
        //         props.moveSubtree(draggedId, -1, overIndex);
        //     }
            
        // }
    }
};

@DropTarget(
    ItemTypes.SUBTREE,
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
    static propTypes = {
        connectDragSource: func.isRequired,
        connectDropTarget: func.isRequired,
        isDragging: bool.isRequired,
        id: string.isRequired,
        findItem: func.isRequired,
        moveItem: func.isRequired,
        findSubtree: func.isRequired,
        moveSubtree: func.isRequired
    };

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
