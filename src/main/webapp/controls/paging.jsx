import React from 'react';
import { findDOMNode } from 'react-dom';
import { Pagination, FaIcon, Row, Col } from './bootstrap.jsx';

var Paging = {};

// tag::wrapper[]
Paging.Wrapper = class extends React.Component {
    static displayName = 'Paging';

    render() {

        return (
            <div className="dt-bootstrap no-footer">
                {this.props.children}
            </div>
        )
    }
}
// end::wrapper[]

// tag::toolbar[]
Paging.Toolbar = class extends React.Component {
    handleChange = (event) => {
        event.preventDefault();

        var pageSize = findDOMNode(this.refs.pageSize).value;
        if (/^[0-9]+$/.test(pageSize)) {
            this.props.updatePageSize(pageSize);
        }
    }

    render() {
        var pageSizeOptions = this.props.pageSizeOptions || [1, 2, 5, 10, 25, 50, 100];
        var options = pageSizeOptions.map(size =>
            <option key={`page-size-${size}`} value={size}>{size}</option>
        );
        return (
            <div className="toolbar form-inline">
                <Row>
                    <Col sm={6} className="table-toolbar-left">
                        <label>
                            Show&nbsp;
                            <select ref="pageSize" className="form-control input-sm" onChange={this.handleChange} value={this.props.pageSize}>
                                {options}
                            </select>
                            &nbsp;entries
                        </label>
                    </Col>
                    <Col sm={6} className="table-toolbar-right">
                        {this.props.children}
                    </Col>
                </Row>
            </div>
        )
    }
}
// end::toolbar[]


// tag::pagination[]
Paging.Pagination = class extends React.Component {

    constructor(props) {
        super(props);
    }

    handleSelect = (event, selectedEvent) => {
        const selectedPage = selectedEvent.eventKey;
        const currentPage = this.props.page.number + 1;
        const { first, last, next, prev } = this.props.links;

        var href = null;

        if (selectedPage === currentPage) {
            return;
        } else if (selectedPage > currentPage) {
            href = ((selectedPage === currentPage + 1) && next) ? next.href : last.href;
        } else {
            href = ((selectedPage === currentPage -1) && prev) ? prev.href : first.href;
        }

        this.props.onNavigate(href);
    }

    render() {

        const { prev, next } = this.props.links;

        var records = null,
            activePage = 1,
            items = 1,
            maxButtons = (prev && next) ? 3 : 2;

        if (this.props.page) {
            
            const { size, totalElements, totalPages, number } = this.props.page;
            activePage = number + 1;
            items = totalPages;
            var first = number * size + 1;
            var last = Math.min((number + 1) * size, totalElements);
            records = `Showing ${first} to ${last} of ${totalElements} entries`;
        }

        return (
            <Row>
                <Col sm={6}>
                    <div className="dataTables_info" role="status" aria-live="polite">
                        {records}
                    </div>
                </Col>
                <Col sm={6}>
                    <div className="text-right">
                        <Pagination
                            className="mar-no"
                            prev={ <FaIcon fa="angle-left" />}
                            next={ <FaIcon fa="angle-right" />}
                            ellipsis
                            boundaryLinks
                            items={ items }
                            maxButtons={ maxButtons }
                            activePage={ activePage }
                            onSelect={ this.handleSelect } />
                    </div>
                </Col>
            </Row>
        )
    }
}
// end::pagination[]

export default Paging
