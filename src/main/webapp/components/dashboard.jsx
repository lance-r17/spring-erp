import React from 'react';

// tag::dashboard[]
var Dashboard = React.createClass({
    render: function () {
        return (
            <div id="content-container">

                {/* Page Title */}
                {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                <div id="page-title">
                    <h1 className="page-header text-overflow">Dashboard</h1>

                    {/* Searchbox */}
                    <div className="searchbox">
                        <div className="input-group custom-search-form">
                            <input type="text" className="form-control" placeholder="Search.." />
							<span className="input-group-btn">
								<button className="text-muted" type="button"><i className="fa fa-search"></i></button>
							</span>
                        </div>
                    </div>
                </div>
                {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                {/* End page title */}


                {/* Breadcrumb */}
                {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                <ol className="breadcrumb">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Library</a></li>
                    <li className="active">Data</li>
                </ol>
                {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                {/* End breadcrumb */}




                {/* Page content */}
                {/* =================================================== */}
                <div id="page-content">

                    <div className="row">
                        <div className="col-lg-7">

                            {/* Network Line Chart */}
                            {/* =================================================== */}
                            <div id="demo-panel-network" className="panel">
                                <div className="panel-heading">
                                    <div className="panel-control">
                                        <button id="demo-panel-network-refresh" data-toggle="panel-overlay" data-target="#demo-panel-network" className="btn"><i className="fa fa-rotate-right"></i></button>
                                        <div className="btn-group">
                                            <button className="dropdown-toggle btn" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-gear"></i></button>
                                            <ul className="dropdown-menu dropdown-menu-right">
                                                <li><a href="#">Action</a></li>
                                                <li><a href="#">Another action</a></li>
                                                <li><a href="#">Something else here</a></li>
                                                <li className="divider"></li>
                                                <li><a href="#">Separated link</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <h3 className="panel-title">Network</h3>
                                </div>

                                {/* Morris line chart placeholder */}
                                <div id="morris-chart-network" className="morris-full-content"></div>

                                {/* Chart information */}
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-lg-9">
                                            <p className="text-semibold text-uppercase">CPU Temperature</p>
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <div className="media">
                                                        <div className="media-left">
                                                            <span className="text-3x text-thin">43.7</span>
                                                        </div>
                                                        <div className="media-body">
                                                            <p className="mar-no">°C</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xs-7 text-sm">
                                                    <p>
                                                        <span>Min Values</span>
					                                    <span className="pad-lft text-semibold">
					                                        <span className="text-lg">27°</span>
					                                        <span className="labellabel-success mar-lft">
					                                            <i className="fa fa-caret-down text-success"></i>
					                                            <smal>23%</smal>
					                                        </span>
					                                    </span>
                                                    </p>
                                                    <p>
                                                        <span>Max Values</span>
					                                    <span className="pad-lft text-semibold">
					                                        <span className="text-lg">69°</span>
					                                        <span className="labellabel-danger mar-lft">
					                                            <i className="fa fa-caret-up text-danger"></i>
					                                            <smal>57%</smal>
					                                        </span>
					                                    </span>
                                                    </p>
                                                </div>
                                            </div>

                                            <hr/>

                                            <div className="pad-rgt">
                                                <p className="text-semibold text-uppercase"><i className="fa fa-question-circle fa-fw text-primary"></i> Today Tips </p>
                                                <p className="text-muted mar-top">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.</p>
                                            </div>
                                        </div>

                                        <div className="col-lg-3">
                                            <p className="text-uppercase text-semibold">Bandwidth Usage</p>
                                            <ul className="list-unstyled">
                                                <li>
                                                    <div className="media pad-btm">
                                                        <div className="media-left">
                                                            <span className="text-2x text-thin">754.9</span>
                                                        </div>
                                                        <div className="media-body">
                                                            <p className="mar-no">Mbps</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="pad-btm">
                                                    <div className="clearfix">
                                                        <p className="pull-left mar-no">Income</p>
                                                        <p className="pull-right mar-no">70%</p>
                                                    </div>
                                                    <div className="progress progress-xs">
                                                        <div className="progress-bar" style={{width: '70%'}}>
                                                            <span className="sr-only">70% Complete</span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="clearfix">
                                                        <p className="pull-left mar-no">Outcome</p>
                                                        <p className="pull-right mar-no">10%</p>
                                                    </div>
                                                    <div className="progress progress-xs">
                                                        <div className="progress-bar progress-bar-info" style={{width: '10%'}}>
                                                            <span className="sr-only">10% Complete</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            {/* =================================================== */}
                            {/* End network line chart */}

                        </div>
                        <div className="col-lg-5">
                            <div className="row">
                                <div className="col-sm-6 col-lg-6">

                                    {/* Sparkline Area Chart */}
                                    <div className="panel panel-success panel-colorful">

                                        <div className="pad-all">
                                            <p className="text-lg text-semibold"><i className="fa fa-hdd-o"></i> HDD Usage</p>
                                            <p className="mar-no">
                                                <span className="pull-right text-bold">132Gb</span>
                                                Free Space
                                            </p>
                                            <p className="mar-no">
                                                <span className="pull-right text-bold">1,45Gb</span>
                                                Used space
                                            </p>
                                        </div>
                                        <div className="pad-all text-center">

                                            {/* Placeholder */}
                                            <div id="demo-sparkline-area"></div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-6">

                                    {/* Sparkline Line Chart */}
                                    <div className="panel panel-info panel-colorful">
                                        <div className="pad-all">
                                            <p className="text-lg text-semibold">Earning</p>
                                            <p className="mar-no">
                                                <span className="pull-right text-bold">$764</span>
                                                Today
                                            </p>
                                            <p className="mar-no">
                                                <span className="pull-right text-bold">$1,332</span>
                                                Last 7 Day
                                            </p>
                                        </div>
                                        <div className="pad-all text-center">

                                            {/* Placeholder */}
                                            <div id="demo-sparkline-line"></div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6 col-lg-6">

                                    {/* Sparkline bar chart  */}
                                    <div className="panel panel-purple panel-colorful">
                                        <div className="pad-all">
                                            <p className="text-lg text-semibold">Sales</p>
                                            <p className="mar-no">
                                                <span className="pull-right text-bold">$764</span>
                                                Today
                                            </p>
                                            <p className="mar-no">
                                                <span className="pull-right text-bold">$1,332</span>
                                                Last 7 Day
                                            </p>
                                        </div>
                                        <div className="pad-all text-center">

                                            {/* Placeholder */}
                                            <div id="demo-sparkline-bar" className="box-inline"></div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-6">

                                    {/* Sparkline pie chart  */}
                                    <div className="panel panel-warning panel-colorful">
                                        <div className="pad-all">
                                            <p className="text-lg text-semibold">Task Progress</p>
                                            <p className="mar-no">
                                                <span className="pull-right text-bold">34</span>
                                                Completed
                                            </p>
                                            <p className="mar-no">
                                                <span className="pull-right text-bold">79</span>
                                                Total
                                            </p>
                                        </div>
                                        <div className="pad-all">
                                            <ul className="list-group list-unstyled">
                                                <li className="mar-btm">
                                                    <span className="label label-warning pull-right">15%</span>
                                                    <p>Progress</p>
                                                    <div className="progress progress-md">
                                                        <div style={{width: '15%'}} className="progress-bar progress-bar-light">
                                                            <span className="sr-only">15%</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            {/* Placeholder */}
                                            <div id="demo-sparkline-pie" className="box-inline hidden"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* Extra Small Weather Widget */}
                            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                            <div className="panel middle">
                                <div className="media-left pad-all">
                                    <canvas id="demo-weather-xs-icon" width="48" height="48"></canvas>
                                </div>

                                <div className="media-body">
                                    <p className="text-2x mar-no text-mint">25&#176;</p>
                                    <p className="text-muted mar-no">Partly Cloudy Day</p>
                                </div>
                            </div>

                            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                            {/* End Extra Small Weather Widget */}


                        </div>
                    </div>


                    {/* Tiles - Bright Version */}
                    {/* =================================================== */}
                    <div className="row">
                        <div className="col-sm-6 col-lg-3">

                            {/* Registered User */}
                            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                            <div className="panel media pad-all">
                                <div className="media-left">
					                <span className="icon-wrap icon-wrap-sm icon-circle bg-success">
					                <i className="fa fa-user fa-2x"></i>
					                </span>
                                </div>

                                <div className="media-body">
                                    <p className="text-2x mar-no text-thin">241</p>
                                    <p className="text-muted mar-no">Registered User</p>
                                </div>
                            </div>
                            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

                        </div>
                        <div className="col-sm-6 col-lg-3">

                            {/* New Order */}
                            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                            <div className="panel media pad-all">
                                <div className="media-left">
					                <span className="icon-wrap icon-wrap-sm icon-circle bg-info">
					                <i className="fa fa-shopping-cart fa-2x"></i>
					                </span>
                                </div>

                                <div className="media-body">
                                    <p className="text-2x mar-no text-thin">543</p>
                                    <p className="text-muted mar-no">New Order</p>
                                </div>
                            </div>
                            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

                        </div>
                        <div className="col-sm-6 col-lg-3">

                            {/* Comments */}
                            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                            <div className="panel media pad-all">
                                <div className="media-left">
					                <span className="icon-wrap icon-wrap-sm icon-circle bg-warning">
					                <i className="fa fa-comment fa-2x"></i>
					                </span>
                                </div>

                                <div className="media-body">
                                    <p className="text-2x mar-no text-thin">34</p>
                                    <p className="text-muted mar-no">Comments</p>
                                </div>
                            </div>
                            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

                        </div>
                        <div className="col-sm-6 col-lg-3">

                            {/* Sales */}
                            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                            <div className="panel media pad-all">
                                <div className="media-left">
					                <span className="icon-wrap icon-wrap-sm icon-circle bg-danger">
					                <i className="fa fa-dollar fa-2x"></i>
					                </span>
                                </div>

                                <div className="media-body">
                                    <p className="text-2x mar-no text-thin">654</p>
                                    <p className="text-muted mar-no">Sales</p>
                                </div>
                            </div>
                            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

                        </div>
                    </div>
                    {/* =================================================== */}
                    {/* End Tiles - Bright Version */}

                    <div className="row">
                        <div className="col-lg-4">
                            {/* List Todo */}
                            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                            <div className="panel panel-trans">
                                <div className="panel-heading">
                                    <div className="panel-control">
                                        <button className="btn btn-default"><i className="fa fa-gear"></i></button>
                                    </div>
                                    <h3 className="panel-title">To do list</h3>
                                </div>
                                <div className="pad-ver">
                                    <ul className="list-group bg-trans list-todo mar-no">
                                        <li className="list-group-item">
                                            <label className="form-checkbox form-icon">
                                                <input type="checkbox" />
                                                <span>Find an idea.</span>
                                            </label>
                                        </li>
                                        <li className="list-group-item">
                                            <label className="form-checkbox form-icon active">
                                                <input type="checkbox" checked />
                                                <span>Do some work</span>
                                            </label>
                                        </li>
                                        <li className="list-group-item">
                                            <label className="form-checkbox form-icon">
                                                <input type="checkbox" />
                                                <span>Read the book</span>
                                            </label>
                                        </li>
                                        <li className="list-group-item">
                                            <label className="form-checkbox form-icon">
                                                <input type="checkbox" />
                                                <span>Upgrade server</span>
                                            </label>
                                        </li>
                                        <li className="list-group-item">
                                            <label className="form-checkbox form-icon active">
                                                <input type="checkbox" checked />
                                                <span>Redesign my logo</span>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                                <div className="input-group pad-all">
                                    <input type="text" className="form-control" placeholder="New task" autocomplete="off" />
                                    <span className="input-group-btn">
                                        <button type="button" className="btn btn-success"><i className="fa fa-plus"></i></button>
                                    </span>
                                </div>
                            </div>
                            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                            {/* End todo list */}
                        </div>
                        <div className="col-lg-4">
                            {/* Weather widget */}
                            {/* =================================================== */}
                            <div id="demo-weather-widget-md" className="panel panel-primary">
                                <div className="panel-heading">
                                    <div className="panel-control">
                                        <button className="btn btn-default"><i className="fa fa-magic"></i></button>
                                        <button className="btn btn-default"><i className="fa fa-plus"></i></button>
                                    </div>
                                    <h3 className="panel-title"><i className="fa fa-map-marker fa-fw"></i> San Jose, CA</h3>
                                </div>

                                {/* Weather widget body */}
                                <div className="panel-body bg-primary">

                                    <div className="media">
                                        <div className="media-left">
                                            <p className="text-4x text-thin mar-no">27&#176;</p>
                                            <p className="mar-no">21&#176; / 30&#176;</p>
                                            <p className="text-semibold text-nowrap">Partly Cloudy Day</p>
                                        </div>
                                        <div className="media-body text-center">
                                            <canvas id="demo-weather-md-icon-1" width="90" height="90"></canvas>
                                        </div>
                                    </div>
                                    <ul className="list-inline text-nowrap">
                                        <li><i className="fa fa-random fa-fw"></i> 17.67mph</li>
                                        <li><i className="fa fa-tint fa-fw"></i> 3%</li>
                                    </ul>
                                </div>

                                {/* Weather widget footer */}
                                <div className="pad-all text-center">
                                    <ul className="list-unstyled mar-no clearfix">
                                        <li className="col-xs-4">
                                            <div className="text-uppercase par-btm">
                                                <div className="text-semibold">Sat</div>
                                                <small className="text-muted">Cloudy</small>
                                            </div>
                                            <canvas id="demo-weather-md-icon-2" width="24" height="24"></canvas>
                                            <div className="text-sm">18 &#176; 25 &#176;</div>
                                        </li>
                                        <li className="col-xs-4">
                                            <div className="text-uppercase par-btm">
                                                <div className="text-semibold">Sun</div>
                                                <small className="text-muted">Wind</small>
                                            </div>
                                            <canvas id="demo-weather-md-icon-3" width="24" height="24"></canvas>
                                            <div className="text-sm">17 &#176; 23 &#176;</div>
                                        </li>
                                        <li className="col-xs-4">
                                            <div className="text-uppercase par-btm">
                                                <div className="text-semibold">Mon</div>
                                                <small className="text-muted">Rain</small>
                                            </div>
                                            <canvas id="demo-weather-md-icon-4" width="24" height="24"></canvas>
                                            <div className="text-sm">20 &#176; 21 &#176;</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* =================================================== */}
                            {/* End Weather widget */}
                        </div>
                        <div className='col-lg-4'>
                            <div className="panel">
                                <div className="pad-all">
                                    <div className="media mar-btm">
                                        <div className="media-left">
                                            <img src="img/av6.png" className="img-md img-circle" alt="Avatar" />
                                        </div>
                                        <div className="media-body">
                                            <p className="text-lg text-semibold mar-no">Brenda Fuller</p>
                                            <p>Project manager</p>
                                        </div>
                                    </div>
                                    <blockquote className="bq-sm bq-open">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.</blockquote>
                                </div>

                                <div className="bord-top">
                                    <ul className="list-group bord-no">
                                        <li className="list-group-item list-item-sm">
                                            <div className="media-left">
                                                <i className="fa fa-facebook-official fa-lg"></i>
                                            </div>
                                            <div className="media-body">
                                                <a href="#" className="btn-link">Facebook</a>
                                            </div>
                                        </li>
                                        <li className="list-group-item list-item-sm">
                                            <div className="media-left">
                                                <i className="fa fa-twitter fa-lg"></i>
                                            </div>
                                            <div className="media-body">
                                                <a href="#" className="btn-link">@BRfull</a>
                                                <br/>
                                                Design my themes with <a href="#" className="btn-link">#Bootstrap</a> Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                                            </div>
                                        </li>
                                        <li className="list-group-item list-item-sm">
                                            <div className="media-left">
                                                <i className="fa fa-linkedin fa-lg"></i>
                                            </div>
                                            <div className="media-body">
                                                <a href="#" className="btn-link">brendafull</a>
                                            </div>
                                        </li>
                                        <li className="list-group-item list-item-sm">
                                            <div className="media-body">

                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="panel">
                        <div className="panel-heading">
                            <div className="panel-control">
                                <a className="fa fa-question-circle fa-lg fa-fw unselectable add-tooltip" href="#" data-original-title="<h4 className='text-thin'>Information</h4><p style='width:150px'>This is an information bubble to help the user.</p>" data-html="true" title=""></a>
                            </div>
                            <h3 className="panel-title">Order Status</h3>
                        </div>

                        {/* Data Table */}
                        {/* =================================================== */}
                        <div className="panel-body">
                            <div className="pad-btm form-inline">
                                <div className="row">
                                    <div className="col-sm-6 table-toolbar-left">
                                        <button className="btn btn-purple btn-labeled fa fa-plus" id="demo-btn-addrow">Add</button>
                                        <button className="btn btn-default"><i className="fa fa-print"></i></button>
                                        <div className="btn-group">
                                            <button className="btn btn-default"><i className="fa fa-exclamation-circle"></i></button>
                                            <button className="btn btn-default"><i className="fa fa-trash"></i></button>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 table-toolbar-right">
                                        <div className="form-group">
                                            <input type="text" autocomplete="off" className="form-control" placeholder="Search" id="demo-input-search2" />
                                        </div>
                                        <div className="btn-group">
                                            <button className="btn btn-default"><i className="fa fa fa-cloud-download"></i></button>
                                            <div className="btn-group">
                                                <button className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                    <i className="fa fa-cog"></i>
                                                    <span className="caret"></span>
                                                </button>
                                                <ul className="dropdown-menu dropdown-menu-right" role="menu">
                                                    <li><a href="#">Action</a></li>
                                                    <li><a href="#">Another action</a></li>
                                                    <li><a href="#">Something else here</a></li>
                                                    <li className="divider"></li>
                                                    <li><a href="#">Separated link</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>Invoice</th>
                                        <th>User</th>
                                        <th>Order date</th>
                                        <th>Amount</th>
                                        <th className="text-center">Status</th>
                                        <th className="text-center">Tracking Number</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td><a href="#" className="btn-link"> Order #53431</a></td>
                                        <td>Steve N. Horton</td>
                                        <td><span className="text-muted"><i className="fa fa-clock-o"></i> Oct 22, 2014</span></td>
                                        <td>$45.00</td>
                                        <td className="text-center">
                                            <div className="label label-table label-success">Paid</div>
                                        </td>
                                        <td className="text-center">-</td>
                                    </tr>
                                    <tr>
                                        <td><a href="#" className="btn-link"> Order #53432</a></td>
                                        <td>Charles S Boyle</td>
                                        <td><span className="text-muted"><i className="fa fa-clock-o"></i> Oct 24, 2014</span></td>
                                        <td>$245.30</td>
                                        <td className="text-center">
                                            <div className="label label-table label-info">Shipped</div>
                                        </td>
                                        <td className="text-center"><i className="fa fa-plane"></i> CGX0089734531</td>
                                    </tr>
                                    <tr>
                                        <td><a href="#" className="btn-link"> Order #53433</a></td>
                                        <td>Lucy Doe</td>
                                        <td><span className="text-muted"><i className="fa fa-clock-o"></i> Oct 24, 2014</span></td>
                                        <td>$38.00</td>
                                        <td className="text-center">
                                            <div className="label label-table label-info">Shipped</div>
                                        </td>
                                        <td className="text-center"><i className="fa fa-plane"></i> CGX0089934571</td>
                                    </tr>
                                    <tr>
                                        <td><a href="#" className="btn-link"> Order #53434</a></td>
                                        <td>Teresa L. Doe</td>
                                        <td><span className="text-muted"><i className="fa fa-clock-o"></i> Oct 15, 2014</span></td>
                                        <td>$77.99</td>
                                        <td className="text-center">
                                            <div className="label label-table label-info">Shipped</div>
                                        </td>
                                        <td className="text-center"><i className="fa fa-plane"></i> CGX0089734574</td>
                                    </tr>
                                    <tr>
                                        <td><a href="#" className="btn-link"> Order #53435</a></td>
                                        <td>Teresa L. Doe</td>
                                        <td><span className="text-muted"><i className="fa fa-clock-o"></i> Oct 12, 2014</span></td>
                                        <td>$18.00</td>
                                        <td className="text-center">
                                            <div className="label label-table label-success">Paid</div>
                                        </td>
                                        <td className="text-center">-</td>
                                    </tr>
                                    <tr>
                                        <td><a href="#" className="btn-link">Order #53437</a></td>
                                        <td>Charles S Boyle</td>
                                        <td><span className="text-muted"><i className="fa fa-clock-o"></i> Oct 17, 2014</span></td>
                                        <td>$658.00</td>
                                        <td className="text-center">
                                            <div className="label label-table label-danger">Refunded</div>
                                        </td>
                                        <td className="text-center">-</td>
                                    </tr>
                                    <tr>
                                        <td><a href="#" className="btn-link">Order #536584</a></td>
                                        <td>Scott S. Calabrese</td>
                                        <td><span className="text-muted"><i className="fa fa-clock-o"></i> Oct 19, 2014</span></td>
                                        <td>$45.58</td>
                                        <td className="text-center">
                                            <div className="label label-table label-warning">Unpaid</div>
                                        </td>
                                        <td className="text-center">-</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <hr/>
                            <div className="pull-right">
                                <ul className="pagination text-nowrap mar-no">
                                    <li className="page-pre disabled">
                                        <a href="#">&lt;</a>
                                    </li>
                                    <li className="page-number active">
                                        <span>1</span>
                                    </li>
                                    <li className="page-number">
                                        <a href="#">2</a>
                                    </li>
                                    <li className="page-number">
                                        <a href="#">3</a>
                                    </li>
                                    <li>
                                        <span>...</span>
                                    </li>
                                    <li className="page-number">
                                        <a href="#">9</a>
                                    </li>
                                    <li className="page-next">
                                        <a href="#">&gt;</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* =================================================== */}
                        {/* End Data Table */}

                    </div>



                </div>
                {/* =================================================== */}
                {/* End page content */}


            </div>
        )
    }
});
// end::dashboard[]

module.exports = Dashboard;
