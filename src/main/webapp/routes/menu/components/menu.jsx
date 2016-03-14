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
        // const { blocks } = this.state;
        // if (id.startsWith('b')) {
        //     const block = blocks.filter(c => c.id === id)[0];
        //     return {
        //         block,
        //         index: blocks.indexOf(block)
        //     };
        // } else if (id.startsWith('s')) {
        //     let block = null,
        //         subtree = null;

        //     blocks.forEach( b => {
        //         if (b.links) {
                    
        //             b.links.forEach( l => {
        //                 if (l.collapse && l.collapse.id === id) {
        //                     subtree = collapse;
        //                     block = b;
        //                 }
        //             });
        //         }
        //     });

        //     return {
        //         block,
        //         subtree,
        //         index: blocks.indexOf(block)
        //     }
        // }
    }

    moveItem = (id, atIndex) => {
        const { block, subtree, link, index } = this.findBlock(id);
        if (subtree) {

        } else {
            this.setState(update(this.state, {
                blocks: {
                    $splice: [
                        [index, 1],
                        [atIndex, 0, block]
                    ]
                }
            }));
        }
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
        const { subtree, index, block, blockIndex } = this.findSubtree(id);

        if (blockIndex !== atBlockIndex) {
            blocks = blocks.deleteIn([blockIndex, "links", index]);
        }
        blocks = blocks.updateIn([atBlockIndex, "links"], links => {
            // if (atIndex == -1) {
            //     atIndex = links.getSize() - 1;
            // }
            return links.splice(atIndex, 0, subtree);
        });

        this.setState({
            blocks: blocks
        });
    }

    findSubtree = (id) => {
        const { blocks } = this.state;
        let index = null,
            subtree = null;

        const blockIndex = blocks.findIndex( block => {
            let links = Immutable.Map(block).get("links");
            
            let linkIndex = links.findIndex( link =>
                Immutable.Map(link).getIn(["collapse", "id"]) === id
            );

            if (linkIndex !== -1) {
                index = linkIndex;
                subtree = links.get(linkIndex);
                return true;
            }

            return false;
        });

        const block = blocks.get(blockIndex);

        return {
            subtree,
            index,
            block,
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
        return {
            id: props.id,
            originalIndex: props.findBlock(props.id).index,
            itemType: ItemTypes.BLOCK
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
        const { id: draggedId, originalBlockIndex, itemType } = monitor.getItem();
        const { id: overId } = props;

        if (draggedId !== overId) {
            const { index: overIndex } = props.findBlock(overId);

            if (itemType === ItemTypes.BLOCK) {
                props.moveBlock(draggedId, overIndex);
            } else if (itemType === ItemTypes.SUBTREE && originalBlockIndex !== overIndex) {
                props.moveSubtree(draggedId, -1, overIndex);
            }
        }
    }
};

@DropTarget(
    [ItemTypes.BLOCK],
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
        const { id, header, links, findSubtree, moveSubtree, isDragging, connectDragSource, connectDropTarget } = this.props;
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
                            <MenuSubtree key={`${collapse.id}-${i}`} 
                                         {...collapse} 
                                         findSubtree={findSubtree}
                                         moveSubtree={moveSubtree} />
                        )
                    } else {
                        return (
                            <MenuLink key={`${linkProps.id}-${i}`} {...linkProps} />
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
        const { index: originalIndex, blockIndex: originalBlockIndex } = props.findSubtree(props.id);
        return {
            id: props.id,
            originalIndex,
            originalBlockIndex,
            itemType: ItemTypes.SUBTREE
        };
    },

    endDrag(props, monitor) {
        const { id: droppedId, originalIndex, originalBlockIndex } = monitor.getItem();
        const didDrop = monitor.didDrop();

        if (!didDrop) {
            props.moveSubtree(droppedId, originalIndex, originalBlockIndex);
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
                                <MenuLink key={`${link.id}-${i}`} {...link} />
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
