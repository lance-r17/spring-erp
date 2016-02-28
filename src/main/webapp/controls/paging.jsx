import React from 'react';
import { findDOMNode } from 'react-dom';

var Paging = {};

// tag::wrapper[]
Paging.Wrapper = React.createClass({
    displayName: 'Paging',
    render: function() {

        return (
            <div className="form-inline dt-bootstrap no-footer">
                {this.props.children}
            </div>
        )
    }
});
// end::wrapper[]

// tag::toolbar[]
Paging.Toolbar = React.createClass({
    handleChange: function(e) {
        e.preventDefault();
        var pageSize = findDOMNode(this.refs.pageSize).value;
        if (/^[0-9]+$/.test(pageSize)) {
            this.props.updatePageSize(pageSize);
        }
    },
    render: function() {
        var pageSizeOptions = this.props.pageSizeOptions || [1, 2, 5, 10, 25, 50, 100];
        var options = pageSizeOptions.map(size =>
            <option value={size}>{size}</option>
        );
        return (
            <div className="toolbar">
                <label>
                    Show&nbsp;
                    <select ref="pageSize" className="form-control input-sm" onChange={this.handleChange} value={this.props.pageSize}>
                        {options}
                    </select>
                    &nbsp;entries
                </label>
            </div>
        )
    }
});
// end::toolbar[]


// tag::pagination[]
Paging.Pagination = React.createClass({
    // tag::handle-nav[]
    handleNavFirst: function(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.first.href);
    },
    handleNavPrev: function(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.prev.href);
    },
    handleNavNext: function(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.next.href);
    },
    handleNavLast: function(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.last.href);
    },
    handleDisableClick: function (e) {
        e.preventDefault();
    },
    // end::handle-nav[]
    render: function() {
        var records = null;
        var navLinks = [];

        if (this.props.page) {
            var { size, totalElements, totalPages, number } = this.props.page;
            var first = number * size + 1;
            var last = Math.min((number + 1) * size, totalElements);
            records = `Showing ${first} to ${last} of ${totalElements} entries`;

            // build pagination links
            if ("prev" in this.props.links) {
                navLinks.push(<li key="prev"><a className="fa fa-angle-left" href="#" onClick={this.handleNavPrev}></a></li>)
            } else {
                navLinks.push(<li key="prev" className="disabled"><a className="fa fa-angle-left" href="#" onClick={this.handleDisableClick}></a></li>);
            }
            
            if ("first" in this.props.links && number !== 0) {
                navLinks.push(<li key="first"><a href="#" onClick={this.handleNavFirst}>1</a></li>);
            } else {
                navLinks.push(<li key="first" className="active"><a href="#" onClick={this.handleDisableClick}>1</a></li>);
            }

            if (number > 3 || (number === 3 & number < totalPages - 1)) {
                navLinks.push(<li><span>...</span></li>);
            }

            if (number > 1 && number + 3 != totalPages && "prev" in this.props.links) {
                navLinks.push(<li key="preceeding"><a href="#" onClick={this.handleNavPrev}>{number}</a></li>)
            }

            if (number > 0 && number < totalPages - 1) {
                navLinks.push(<li key="current" className="active"><a href="#" onClick={this.handleDisableClick}>{number + 1}</a></li>);
            }

            if (number !== 2 && number + 2 < totalPages && "next" in this.props.links) {
                navLinks.push(<li key="after"><a href="#" onClick={this.handleNavNext}>{number + 2}</a></li>)
            }

            if (number < totalPages - 3) {
                navLinks.push(<li><span>...</span></li>);
            }

            if ("last" in this.props.links && totalPages > number + 1) {
                navLinks.push(<li key="last"><a href="#" onClick={this.handleNavLast}>{totalPages}</a></li>);
            } else if (totalPages > 1 && totalPages === number + 1) {
                navLinks.push(<li key="last" className="active"><a href="#" onClick={this.handleDisableClick}>{totalPages}</a></li>);
            }
            
            if ("next" in this.props.links) {
                navLinks.push(<li key="next"><a className="fa fa-angle-right" href="#" onClick={this.handleNavNext}></a></li>)
            } else {
                navLinks.push(<li key="next" className="disabled"><a className="fa fa-angle-right" href="#" onClick={this.handleDisableClick}></a></li>);
            }
        }

        return (
            <div className="row">
                <div className="col-sm-6">
                    <div className="dataTables_info" role="status" aria-live="polite">
                        {records}
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="text-right">
                        <ul className="pagination mar-no">
                            {navLinks}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
});
// end::pagination[]

if (!global.exports && !global.module && (!global.define || !global.define.amd)) {
    global.Paging = Paging;
}

module.exports = Paging;
