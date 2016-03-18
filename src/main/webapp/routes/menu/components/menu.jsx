import React from 'react';
import update from 'react/lib/update';
import { findDOMNode } from 'react-dom';
import InlineEdit from 'react-edit-inline';
import Immutable from 'immutable';
import { Link } from 'react-router';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import cx from 'classnames';

import { FaIcon, Label, Collapse } from '../../../controls';
import { toggleable } from '../../../decorators';

import { SimpleMenu as NestedMenu } from '../../../stubs/menus';

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
                    <div className="panel">
                        <div className="panel-heading">
                            <h3 className="panel-title">Developer</h3>
                        </div>

                        <div className="panel-body">
                            <div className="row">
                                <div className="col-sm-4">
                                </div>
                                <div className="col-sm-4">
                                    <MenuContainer menu={NestedMenu} />
                                </div>
                                <div className="col-sm-4">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                {/* End page content */}

            </div>

            
        )
    }
}


@DragDropContext(HTML5Backend)
class MenuContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="nav-container">
                <div className="nav">
                    <MenuTree menu={this.props.menu} />
                </div>
            </nav>
        )
    }
}

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
                        link.collapse.expanded = false;

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
            parentId = null,
            depth = [],
            index = -1;

        if (id.startsWith('b')) {
            index = blocks.findIndex( block =>
                block.get("id") === id
            );

            item = blocks.get(index);
            itemType = ItemTypes.BLOCK;
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
            depth = [blockIndex, "links", ...depth];
            parentId = blocks.getIn([blockIndex, "id"]);
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
                                    parentId = subtree.get("id");
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
                            depth = [linkIndex, ...depth];
                        }

                        return true;
                    }
                }

                return false;
            });

            itemType = ItemTypes.LINK;
            depth = [blockIndex, "links", ...depth];
            parentId = parentId === null ? blocks.getIn([blockIndex, "id"]) : parentId;
        }

        return {
            item,
            itemType,
            depth,
            index,
            parentId
        };
    }

    moveItem = (id, atIndex, atDepth) => {

        let { blocks } = this.state;
        const { item, depth, index } = this.findItem(id);

        if (_.isEqual(depth, atDepth)) {
            if (index === atIndex) {
                return;
            } else {
                blocks = blocks.updateIn(atDepth, list => {
                    return list.splice(index, 1).splice(atIndex, 0, item);
                });
            }
        } else {
            console.log(blocks.toJS());
            if (depth.length >= atDepth.length) {
                blocks =
                    blocks.updateIn(depth, list => {
                        return list ? list.splice(index, 1) : list;
                    }).updateIn(atDepth, Immutable.List.of(), list => {
                        return list.splice(atIndex, 0, item);
                    });
            } else {
                blocks =
                    blocks.updateIn(atDepth, Immutable.List.of(), list => {
                        return list.splice(atIndex, 0, item);
                    }).updateIn(depth, list => {
                        return list ? list.splice(index, 1) : list;
                    });
            }
            console.log(index, atIndex, depth, atDepth);
            console.log(blocks.toJS());
        }

        this.setState({
            blocks: blocks
        });
    }

    updateItem = (id, data) => {
        let { blocks } = this.state;

        const { index, itemType, depth } = this.findItem(id);

        if (itemType === ItemTypes.BLOCK) {
            _.forEach( data, (value, key) => {
                blocks = blocks.updateIn([index, key], originalValue => value);
            });
        } else if (itemType === ItemTypes.SUBTREE) {
            _.forEach( data, (value, key) => {
                blocks = blocks.updateIn([...depth, index, "collapse", key], originalValue => value);
            });
        } else if (itemType === ItemTypes.LINK) {
            _.forEach( data, (value, key) => {
                blocks = blocks.updateIn([...depth, index, key], originalValue => value);
            });
        } else {
            return;
        }

        this.setState({
            blocks: blocks
        })
    }

    findAvailablePath = (id, sourceId, lastOffset, initialOffset) => {
        const { blocks } = this.state;
        const { index: atIndex, itemType, depth: atDepth, parentId: atParentId } = this.findItem(id);
        const { itemType: sourceItemType, depth: sourceDepth } = this.findItem(sourceId);

        let index = -1,
            depth = [];

        if (itemType === ItemTypes.BLOCK) {
            if (sourceItemType === ItemTypes.BLOCK) {
                depth = atDepth;
                index = atIndex;
            } else if (sourceItemType === ItemTypes.SUBTREE) {
                depth = [atIndex, "links"];
                const links = blocks.getIn(depth);
                index = (links === null || typeof links === "undefined") || (initialOffset.y >= 0) ? 0 : links.count() - 1;
            } else if (sourceItemType === ItemTypes.LINK) {
                depth = [atIndex, "links"];
                const links = blocks.getIn(depth);
                if (_.isEqual(depth, sourceDepth.slice(0, 2))) {
                } 

                index = (links === null || typeof links === "undefined") || (initialOffset.y >= 0) ? 0 : links.count() - 1;
            }
        } else if (itemType === ItemTypes.SUBTREE) {
            if (sourceItemType === ItemTypes.SUBTREE) {
                depth = atDepth;
                index = atIndex;
            } else if (sourceItemType === ItemTypes.LINK) {
                // link could be nested into collapse only when the collapse is expanded
                if (blocks.getIn([...atDepth, atIndex, "collapse", "expanded"])) {
                    depth =[...atDepth, atIndex, "collapse", "links"];
                    const links = blocks.getIn(depth);
                    index = (links === null || typeof links === "undefined") || (initialOffset.y >= 0) ? 0 : links.count() - 1;
                } else {
                    depth = atDepth;
                    index = atIndex;
                }
            }
        } else if (itemType === ItemTypes.LINK) {
            if (sourceItemType === ItemTypes.SUBTREE) {
                if (atDepth.length <= sourceDepth.length) {
                    depth = atDepth;
                    index = atIndex;
                } else {
                    return this.findAvailablePath(atParentId, sourceId, lastOffset, initialOffset);
                }
            } else if (sourceItemType === ItemTypes.LINK) {
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

    toggle = (id) => {
        let { blocks } = this.state;
        const {index, itemType, depth } = this.findItem(id);

        if (itemType === ItemTypes.SUBTREE) {
            blocks = blocks.updateIn([...depth, index, "collapse", "expanded"], value => !value);
        }

        this.setState({
            blocks: blocks
        })
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
                                   toggle={this.toggle}
                                   findItem={this.findItem}
                                   moveItem={this.moveItem}
                                   updateItem={this.updateItem}
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
        updateItem: func.isRequired,
        findAvailablePath: func.isRequired
    };

    constructor(props) {
        super(props);
    }

    updateHeader = (data) => {
        this.props.updateItem(this.props.id, data);
    }

    render() {
        const { id, header, links, toggle, findItem, moveItem, updateItem, findAvailablePath, isDragging, connectDragSource, connectDropTarget } = this.props;
        const passThrough = { findItem, moveItem, updateItem, findAvailablePath };
        const opacity = isDragging ? 0 : 1;

        let subLinks = [];
        if (links) {
            subLinks = links.map( (link, i) => {
                const { collapse, ...linkProps} = link;
                if (collapse) {
                    return (
                        <MenuSubtree key={collapse.id}
                                     {...collapse}
                                     toggle={toggle}
                                     {...passThrough} />
                    )
                } else {
                    return (
                        <MenuLink key={linkProps.id}
                                  {...linkProps}
                                  {...passThrough} />
                    )
                }
            });
        }

        return connectDragSource(connectDropTarget(
            <li className="block" style={{ ...style, opacity }}>
                <div className="list-header">
                    <InlineEdit activeClassName="editing"
                                text={header} 
                                paramName="header"
                                change={this.updateHeader} /> 
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
        const { itemType } = monitor.getItem();
        return (itemType === ItemTypes.LINK && props.expanded);
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
class MenuSubtree extends React.Component {
    static propTypes = {
        connectDragSource: func.isRequired,
        connectDropTarget: func.isRequired,
        isDragging: bool.isRequired,
        id: string.isRequired,
        findItem: func.isRequired,
        moveItem: func.isRequired,
        updateItem: func.isRequired,
        findAvailablePath: func.isRequired
    };

    constructor(props) {
        super(props);
    }

    handleToggle = (e) => {
        e.preventDefault();

        this.props.toggle(this.props.id);
    }

    updateName = (data) => {
        this.props.updateItem(this.props.id, data);
    }

    render() {
        const { name, fa, links, expanded, findItem, moveItem, updateItem, findAvailablePath, isDragging, connectDragSource, connectDropTarget, ...passThrough } = this.props;
        const passThrough = { findItem, moveItem, updateItem, findAvailablePath };
        const opacity = isDragging ? 0 : 1;

        return connectDragSource(connectDropTarget(
            <li className={cx({ 'active': expanded })} style={{ ...style, opacity }}>
                <a href="#" onClick={this.handleToggle}>
                    <FaIcon fa={fa} />
                    <span className="menu-title">
                        <InlineEdit activeClassName="editing"
                                    text={name} 
                                    paramName="name"
                                    change={this.updateName} />
                    </span>
                    <i className="arrow"></i>
                </a>

                <Collapse in={expanded}>
                    <ul>
                        { links.map( (link, i) => {
                            return (
                                <MenuLink key={link.id}
                                          {...link}
                                          {...passThrough} />
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
        const { index: originalIndex, depth: originalDepth, parentId: originalParentId } = props.findItem(props.id);
        return {
            id: props.id,
            originalIndex,
            originalDepth,
            originalParentId,
            itemType: ItemTypes.LINK
        };
    },

    isDragging(props, monitor) {
        return props.id === monitor.getItem().id;
    },

    endDrag(props, monitor) {
        const { id: droppedId, originalIndex, originalDepth, originalParentId } = monitor.getItem();
        const didDrop = monitor.didDrop();

        if (!didDrop) {
            let { index: parentIndex, depth: atDepth } = props.findItem(originalParentId);
            atDepth = [...atDepth, parentIndex];
            let tail = originalDepth.slice(atDepth.length, originalDepth.length);
            props.moveItem(droppedId, originalIndex, [...atDepth, ...tail]);
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
    [ItemTypes.SUBTREE, ItemTypes.LINK],
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
        updateItem: func.isRequired,
        findAvailablePath: func.isRequired
    };

    constructor(props) {
        super(props);
    }

    updateName = (data) => {
        this.props.updateItem(this.props.id, data);
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
                <InlineEdit activeClassName="editing"
                            text={name} 
                            paramName="name"
                            change={this.updateName} />
                { highlight }
            </li>
        ));
    }
}
