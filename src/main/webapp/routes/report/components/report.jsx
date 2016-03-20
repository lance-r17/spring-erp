import React from 'react';

export default class Report extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="content-container">

                {/* Page Title */}
                <div id="page-title">
                    <h1 className="page-header text-overflow">Report Design</h1>
                </div>
                {/* End page Title */}

                {/* Page content */}
                <div id="page-content">
                    <div className="panel">

                        <div className="panel-body">
                            <div className="invoice">
                                <div>
                                    <div className="pull-left">
                                        <address>
                                            <strong>Apple Enterprise Sales</strong>
                                            <br />
                                            <abbr title="Phone">P:</abbr> (877) 412-7753.
                                            <br />
                                        </address>
                                    </div>
                                    <div className="pull-right sm-m-t-20">
                                        <h2 className="text-uppercase">Invoice</h2>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                                <br />
                                <br />
                                <div className="container-sm-height">
                                    <div className="row-sm-height">
                                        <div className="col-md-9 col-sm-height">
                                            <p className="small no-margin">Invoice to</p>
                                            <h5 className="semi-bold m-t-0">Darren Forthway</h5>
                                            <address>
                                                <strong>Twitter, Inc.</strong><br />
                                                795 Folsom Ave, Suite 600<br />
                                                San Francisco, CA 94107<br />
                                                <abbr title="Phone">P:</abbr> (123) 456-7890
                                            </address>
                                        </div>
                                        <div className="col-md-3 col-sm-height col-bottom">
                                            <br />
                                            <div>
                                                <div className="pull-left text-bold text-uppercase">Invoice No :</div>
                                                <div className="pull-right">0047</div>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div>
                                                <div className="pull-left text-bold text-uppercase">Invoice date :</div>
                                                <div className="pull-right">29/09/14</div>
                                                <div className="clearfix"></div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="table-responsive" style={{marginTop: 50}}>
                                    <table className="table table-hover table-vcenter">
                                        <thead>
                                        <tr>
                                            <th className="">Task Description</th>
                                            <th className="text-center">Rate</th>
                                            <th className="text-center">Hours</th>
                                            <th className="text-right">Total</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="">
                                                    <p className="text-dark">Character Illustration</p>
                                                    <p className="small text-muted">
                                                        Character Design projects from the latest top online portfolios on Behance.
                                                    </p>
                                                </td>
                                                <td className="text-center">$65.00</td>
                                                <td className="text-center">84</td>
                                                <td className="text-right">$5,376.00</td>
                                            </tr>
                                            <tr>
                                                <td className="">
                                                    <p className="text-dark">Cross Heart Charity Branding</p>
                                                    <p className="small text-muted">
                                                        Attempt to attach higher credibility to a new product by associating it with a well established company name
                                                    </p>
                                                </td>
                                                <td className="text-center">$89.00</td>
                                                <td className="text-center">100</td>
                                                <td className="text-right">$8,900.00</td>
                                            </tr>
                                            <tr>
                                                <td className="">
                                                    <p className="text-dark">iOs App</p>
                                                    <p className="small text-muted">
                                                        A video game franchise Inspired primarily by a sketch of stylized wingless - Including Branding / Graphics / Motion Picture &amp; Videos
                                                    </p>
                                                </td>
                                                <td className="text-center">$100.00</td>
                                                <td className="text-center">500</td>
                                                <td className="text-right">$50,000.00</td>
                                            </tr>
                                        </tbody>

                                        <tfoot>
                                            <tr>
                                                <td className="text-right" colSpan="3">Subtotal</td>
                                                <td className="text-right">$64,276.00</td>
                                            </tr>
                                            <tr>
                                                <td className="text-right" colSpan="3">Discount (10%)</td>
                                                <td className="text-right">-$6,428.00</td>
                                            </tr>
                                            <tr>
                                                <td className="text-right" colSpan="3">Sum</td>
                                                <td className="text-right">$57,848.00</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                <hr />
                                <p className="small hint-text">Services will be invoiced in accordance with the Service Description. You must pay all undisputed invoices in full within 30 days of the invoice date, unless otherwise specified under the Special Terms and Conditions. All payments must reference the invoice number. Unless otherwise specified, all invoices shall be paid in the currency of the invoice</p>
                                <p className="small hint-text">Insight retains the right to decline to extend credit and to require that the applicable purchase price be paid prior to performance of Services based on changes in insight's credit policies or your financial condition and/or payment record. Insight reserves the right to charge interest of 1.5% per month or the maximum allowable by applicable law, whichever is less, for any undisputed past due invoices. You are responsible for all costs of collection, including reasonable attorneys' fees, for any payment default on undisputed invoices. In addition, Insight may terminate all further work if payment is not received in a timely manner.</p>
                                <br />
                                <hr />
                                <div>
                                    <span className="m-l-70 text-black sm-pull-right">+34 346 4546 445</span>
                                    <span className="m-l-40 text-black sm-pull-right">support@revox.io</span>
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