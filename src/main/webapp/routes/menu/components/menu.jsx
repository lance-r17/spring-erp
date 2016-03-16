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
                collapse: {
                    name: 'Entitle',
                    fa: 'sitemap',
                    links: [
                        {
                            name: 'Users',
                            path: '/users',
                            fa: 'users'
                        }
                    ]
                }
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
            index = -1;

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
                        link.getIn(["collapse", "id"]) === id
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
            depth = [blockIndex, "links"].concat(depth);
        } else if (id.startsWith('l')) {
            const blockIndex = blocks.findIndex( block => {
                let links = block.get("links");

                if (links && links.count() > 0) {
                    let linkIndex = links.findIndex(link => {
                        const subtree = link.get("collapse");

                        if (subtree) {
                            let sublinks = subtree.get("links");

                            if (sublinks) {
                                let sublinkIndex = sublinks.findIndex(sublink =>
                                    sublink.get("id") === id
                                );

                                if (sublinkIndex !== -1) {
                                    index = sublinkIndex;
                                    depth = ["collapse", "links"];
                                    item = sublinks.get(index);
                                    return true;
                                }
                            }
                        } else {
                            return link.get("id") === id;
                        }
                    });

                    if (linkIndex !== -1) {
                        if (index === -1) {
                            index = linkIndex;
                            item = links.get(index);
                        } else {
                            depth = [linkIndex].concat(depth);
                        }

                        return true;
                    }
                }

                return false;
            });

            itemType = ItemTypes.LINK;
            depth = [blockIndex, "links"].concat(depth);
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
        } else if (itemType === ItemTypes.SUBTREE || itemType === ItemTypes.LINK) {
            if (_.isEqual(depth, atDepth)) {
                if (index === atIndex) {
                    return;
                } else {
                    blocks = blocks.updateIn(atDepth, links => {
                        return links.splice(index, 1).splice(atIndex, 0, item);
                    });
                }
            } else {
                console.log(blocks.toJS());
                blocks = 
                    blocks.updateIn(depth, links => {
                        return links ? links.splice(index, 1) : links;
                    }).updateIn(atDepth, Immutable.List.of(), links => {
                        return links.splice(atIndex, 0, item);
                    });
                console.log(index, atIndex, depth, atDepth);
                console.log(blocks.toJS());
            }
        }

        this.setState({
            blocks: blocks
        });
    }

    findAvailablePath = (id, sourceId, lastOffset, initialOffset) => {
        const { blocks } = this.state;
        const { index: atIndex, itemType, depth: atDepth } = this.findItem(id);
        const { itemType: sourceItemType, depth: sourceDepth } = this.findItem(sourceId);

        let index = -1,
            depth = [];

        if (itemType === ItemTypes.BLOCK) {
            if (sourceItemType === ItemTypes.BLOCK) {
                depth = atDepth;
                index = atIndex;
            } else if (sourceItemType === ItemTypes.SUBTREE || sourceItemType === ItemTypes.LINK) {
                depth = [atIndex, "links"];
                const links = blocks.getIn(depth);
                index = (links === null || typeof links === "undefined") || (initialOffset.y >= 0) ? 0 : links.count() - 1;
            }
        } else if (itemType === ItemTypes.SUBTREE) {
            if (sourceItemType === ItemTypes.SUBTREE) {
                depth = atDepth;
                index = atIndex;
            } else if (sourceItemType === ItemTypes.LINK) {
                depth = atDepth.concat([atIndex, "collapse", "links"]);
                const links = blocks.getIn(depth);
                index = (links === null || typeof links === "undefined") || (initialOffset.y >= 0) ? 0 : links.count() - 1;
            }
        } else if (itemType === ItemTypes.LINK) {
            if (sourceItemType === ItemTypes.LINK || sourceItemType === ItemTypes.SUBTREE) {
                depth = atDepth;
                index = atIndex;
            }
        }

        return {
            index,
            itemType,
            depth
        }
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
                                   findItem={this.findItem}
                                   moveItem={this.moveItem}
                                   findAvailablePath={this.findAvailablePath} />
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
        const { id: draggedId } = monitor.getItem();
        const { id: overId } = props;

        if (draggedId !== overId && monitor.isOver({ shallow: true })) {
            const { index: atIndex, depth: atDepth } = props.findAvailablePath(overId, draggedId, monitor.getClientOffset(), monitor.getDifferenceFromInitialOffset());
            props.moveItem(draggedId, atIndex, atDepth);
        }
    }
};

@DropTarget(
    [ItemTypes.BLOCK, ItemTypes.SUBTREE, ItemTypes.LINK],
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
        findAvailablePath: func.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { id, header, links, findItem, moveItem, findAvailablePath, isDragging, connectDragSource, connectDropTarget } = this.props;
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
                                     findAvailablePath={findAvailablePath} />
                    )
                } else {
                    return (
                        <MenuLink key={linkProps.id}
                                  {...linkProps}
                                  moveItem={moveItem}
                                  findItem={findItem}
                                  findAvailablePath={findAvailablePath} />
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
        const { id: droppedId, originalIndex, originalDepth } = monitor.getItem();
        const didDrop = monitor.didDrop();

        if (!didDrop) {
            props.moveItem(droppedId, originalIndex, originalDepth);
        }
    }
};

const subtreeTarget = {
    canDrop(props, monitor) {
        // const { itemType } = monitor.getItem();
        // return itemType === ItemTypes.LINK;
        return false;
    },

    hover(props, monitor) {
        const { id: draggedId } = monitor.getItem();
        const { id: overId } = props;

        if (draggedId !== overId && monitor.isOver({ shallow: true })) {
            const { index: atIndex, depth: atDepth } = props.findAvailablePath(overId, draggedId, monitor.getClientOffset(), monitor.getDifferenceFromInitialOffset());
            props.moveItem(draggedId, atIndex, atDepth);
        }
    }
};

@DropTarget(
    [ItemTypes.SUBTREE, ItemTypes.LINK],
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
        findAvailablePath: func.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { name, fa, links, open, onToggle, findItem, moveItem, findAvailablePath, isDragging, connectDragSource, connectDropTarget } = this.props;
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
                                <MenuLink key={link.id}
                                          {...link}
                                          moveItem={moveItem}
                                          findItem={findItem}
                                          findAvailablePath={findAvailablePath} />
                            )
                        }) }
                    </ul>
                </Collapse>
            </li>
        ));
    }
}

const linkSource = {
    beginDrag(props) {
        const { index: originalIndex, depth: originalDepth } = props.findItem(props.id);
        return {
            id: props.id,
            originalIndex,
            originalDepth,
            itemType: ItemTypes.LINK
        };
    },

    isDragging(props, monitor) {
        return props.id === monitor.getItem().id;
    },

    endDrag(props, monitor) {
        const { id: droppedId, originalIndex, originalDepth } = monitor.getItem();
        const didDrop = monitor.didDrop();

        if (!didDrop) {
            props.moveItem(droppedId, originalIndex, originalDepth);
        }
    }
};

const linkTarget = {
    canDrop() {
        return false;
    },

    hover(props, monitor) {
        const { id: draggedId } = monitor.getItem();
        const { id: overId } = props;

        if (draggedId !== overId) {
            const { index: atIndex, depth: atDepth } = props.findAvailablePath(overId, draggedId, monitor.getClientOffset(), monitor.getDifferenceFromInitialOffset());
            props.moveItem(draggedId, atIndex, atDepth);
        }
    }
};

@DropTarget(
    ItemTypes.LINK,
    linkTarget,
    connect => ({
        connectDropTarget: connect.dropTarget()
    })
)
@DragSource(
    ItemTypes.LINK,
    linkSource,
    (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    })
)
class MenuLink extends React.Component {

    static propTypes = {
        connectDragSource: func.isRequired,
        connectDropTarget: func.isRequired,
        isDragging: bool.isRequired,
        id: string.isRequired,
        findItem: func.isRequired,
        moveItem: func.isRequired,
        findAvailablePath: func.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { name, path, fa, label, isDragging, connectDragSource, connectDropTarget } = this.props;
        const opacity = isDragging ? 0 : 1;

        let highlight = null;
        if (label) {
            const { content, pullRight, ...props } = label;
            highlight = <Label {...props} className={cx({'pull-right': pullRight})}>{ content }</Label>
        }
        return connectDragSource(connectDropTarget(
            <li style={{ ...style, opacity }}>
                { fa ? <FaIcon fa={fa} /> : null }
                { name }
                { highlight }
            </li>
        ));
    }
}
