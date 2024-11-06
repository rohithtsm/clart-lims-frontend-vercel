import React from 'react'
import CommonLayout from '../../component/shop/common-layout'
import clartHeadLogoA from "/assets/images/clart_wbldcl_logo.png";
import clartHeadLogoB from "/assets/images/wbldcl_logo.png";
import barcode from "/assets/images/barcode.jpg";

const OrderSlipDownload = () => {
  return (
    <CommonLayout>
        {/* main wrapper start */}
        <section className='container pt-4 pb-4 labReport'>
            <div>

            {/* head part start */}
            <article className='row reportHead'>
                <div className='col-md-3'>
                    <img src={clartHeadLogoA} alt="" />
                </div>
                <div className='col-md-5'>
                    <p className='mb-2'><b>Address: </b>Buddha Park, B 14, Block B, Kalyani - 741235</p>
                    <p className='mb-2'><b>Email Id: </b>clart@wbldc.in</p>
                    <p><b>Phone No.: </b>+91-33 2977 2506</p>
                </div>
                <div className='col-md-4'>
                    <img src={clartHeadLogoB} alt="" />
                </div>
            </article>
            <div className='reportHeadTag'>www.clart.in</div>
            {/* head part end */}

            {/* address part start */}
            <article className='addressRow'>
                <div className='row'>
                    <div className='col-md-3'>
                        <h3 className='mb-1 text-dark'><b>Mukesh Kumar</b></h3>
                        <h4 className='mb-1'>9051755538</h4>
                        <h4 className='mb-1'>Rocky</h4>
                        <h5 className='mb-0'>Alsatian | German Shepherd</h5>
                    </div>
                    <div className='col-md-5'>
                        <div className='midInfo'>
                            <h5 className='mb-0'><b>Sample Collected At</b></h5>
                            <p className='mb-2'>345 N.S.Road Kolkata - 700001</p>
                            <h5 className='mb-0'><i className='fa fa-calendar'></i> 22 Oct 2024 - 05:45 pm</h5>
                            <h5 className='mb-0'><i className='fa fa-user'></i> By Phlebotomist</h5>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <img src={barcode} alt="" style={{maxWidth:'180px'}} />
                        <p className='mt-1 mb-0'><b>Registered on 22.10.2024 - 02:00pm</b></p>
                        <p className='mb-0'>Collected On: 23.10.2024 - 07:00 am</p>
                        <p className='mb-0'>Reported On: 23.10.2024 - 07:00 pm</p>
                    </div>
                </div>
            </article>
            {/* address part end */}

            {/* test report details part start */}
            <article style={{borderBottom:'2px solid #f5f5f5'}}>
                <h4 className='pt-2 pb-2 fs-4' align="center">Complete Blood Count</h4>
            </article>
            <article>
                <div className='table-responsive'>
                    <table className='table mb-0'>
                        <tr align="left">
                            <th>Investigation</th>
                            <th>Result</th>
                            <th>&nbsp;</th>
                            <th>Reference Value</th>
                            <th>Unit</th>
                        </tr>
                        <tr>
                            <td><h4 className='mb-0 p-0'>Primary Sample Type:</h4></td>
                            <td><h4 className='mb-0 p-0'>Blood</h4></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td><h4 className='m-0 p-0'><b>HEMOGLOBIN</b></h4></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Hemoglobin (Hb)</td>
                            <td><span className='text-primary'>12.5</span></td>
                            <td><span className='text-primary'>Low</span></td>
                            <td><span>13.0-17.0</span></td>
                            <td>g/dL</td>
                        </tr>
                        <tr>
                            <td><h4 className='m-0 p-0'><b>RBC COUNT</b></h4></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Total RBC count</td>
                            <td>5.2</td>
                            <td>&nbsp;</td>
                            <td>4.5 - 5.5</td>
                            <td>mill/cumm</td>
                        </tr>
                        <tr>
                            <td><b>BLOOD INDICES</b></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Packed Cell Volume (PCV)</td>
                            <td><span className='text-danger'>57.5</span></td>
                            <td><span className='text-danger'>High</span></td>
                            <td>40-50</td>
                            <td>%</td>
                        </tr>
                        <tr>
                            <td><b>Mean Corpuscular Volume (MCV)</b><br /><small>Calculated</small></td>
                            <td>87.75</td>
                            <td>&nbsp;</td>
                            <td>83.101</td>
                            <td>FL</td>
                        </tr>
                        <tr>
                            <td><b>MCH</b><br className='m-0' /><small>Calculated</small></td>
                            <td>27.2</td>
                            <td>&nbsp;</td>
                            <td>27-32</td>
                            <td>pg</td>
                        </tr>
                        <tr>
                            <td>RDW</td>
                            <td>13.6</td>
                            <td>&nbsp;</td>
                            <td>11.6 - 14.0</td>
                            <td>%</td>
                        </tr>
                        <tr>
                            <td><b>WBC COUNT</b><br />Total WBC Count</td>
                            <td>9000</td>
                            <td>&nbsp;</td>
                            <td>4000 - 11000</td>
                            <td>CUMM</td>
                        </tr>
                        <tr>
                            <td colSpan={5}>
                                <h4 className='m-0 p-0 pt-2 pb-2'><b>Observation:</b> some text here</h4>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={5}>
                                <h4 className='m-0 p-0 pt-2 pb-2'><b>Instruction:</b> some text here</h4>
                            </td>
                        </tr>
                    </table>
                </div>
            </article>
            {/* test report details part end */}

            {/* footer part start */}
            <article className='mt-3 pt-3' style={{borderTop:'1px solid #f5f5f5',}}>
                <div className='row' style={{paddingTop:'70px'}}>
                    <div className='col'>
                        <h4><b>From Lab Technician</b></h4>
                        <h4>(DMLT,BMLT)</h4>
                    </div>
                    <div className='col'>
                        <h4><b>QC Name</b></h4>
                        <h4>Dr. Payal Shah</h4>
                    </div>
                    <div className='col'>
                        <h4><b>Approver Name</b></h4>
                        <h4>Dr. Vimal Shah</h4>
                    </div>
                </div>
            </article>
            <div className='reportHeadTag mt-3'>Visit www.lab.clart.in</div>
            {/* footer part end */}
            <p className='mt-2' align="right">Report Generated on 22 Oct 2024</p>
            </div>
        </section>
        {/* main wrapper end */}
    </CommonLayout>
  )
}

export default OrderSlipDownload