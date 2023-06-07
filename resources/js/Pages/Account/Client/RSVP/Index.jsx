import React from 'react'
import LayoutAccount from '../../../../Layouts/Account'
import { usePage } from '@inertiajs/inertia-react'
import Pagination from '../../../../Shared/Pagination';

export default function ClientRSVPIndex() {
    //destructure invitation from usePage
    const { rsvp } = usePage().props;

    console.log(usePage())
    return (
        <LayoutAccount>
            <div className="row mt-2 mb-4">
                <div className="col-12">
                    <div className="card border-0 rounded">
                        <div className="card-header">
                            <span className="font-weight-bold"><i className="fa fa-check-circle"></i> RSVP</span>
                        </div>
                        {/* <div className='rsvp-summary col-12 row-md-12 p-3 justify-content-center text-center'>
                            <div className='card border-0 rounded col-12 col-md-3 p-3 justify-content-center align-items-center' style={{ background: "yellow" }}>
                                <div>Jumlah Hadir</div>
                                <div>{rsvp.data.filter(item=>item.confirmation === "Hadir").length}</div>
                            </div>
                            <div className='card border-0 rounded col-md-3 col-12 justify-content-center align-items-center' style={{ background: "yellow" }}>
                                <div>Jumlah Tidak Hadir</div>
                                <div>{rsvp.data.filter(item=>item.confirmation === "Tidak Hadir").length}</div>
                            </div>
                            <div className='card border-0 rounded col-12 col-md-3 p-3 justify-content-center align-items-center' style={{ background: "yellow" }}>
                                <div>Jumlah Konfirmasi</div>
                                <div>{rsvp.data.length}</div>
                            </div>
                        </div> */}
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-rsvp table-bordered table-striped table-hovered">
                                    <thead>
                                        <tr>
                                            <th scope="col" style={{ width: '5%' }}>No.</th>
                                            <th scope="col" style={{ width: '300px' }}>Nama</th>
                                            <th scope="col" style={{ width: '200px' }}>Konfirmasi</th>
                                            <th scope="col" style={{ width: '300px' }}>Jumlah Hadir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rsvp.data.map((item, index) => (
                                            <tr key={index}>
                                                <td className="text-center">{++index + (rsvp.current_page - 1) * rsvp.per_page}</td>
                                                <td>{item.name}</td>
                                                <td>{item.confirmation}</td>
                                                <td>{item.number_present}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination links={rsvp.links} align={'end'} />

                        </div>
                    </div>
                </div>
            </div>
        </LayoutAccount>
    )
}