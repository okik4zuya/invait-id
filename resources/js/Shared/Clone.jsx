//import react  
import React from "react";

//import inertia adapter
import { Inertia } from '@inertiajs/inertia';

//import Sweet Alert
import Swal from 'sweetalert2';

export default function Clone({ URL, id }) {

	//method clone
    const clone = async (id) => {

        //show sweet alert
        Swal.fire({
            title: 'Clone this record?',
            text: "You will clone this record to the database!",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, clone it!'
          }).then((result) => {
            if (result.isConfirmed) {

                //delete
                Inertia.post(`${URL}/${id}`, {
                    id
                })

                Swal.fire({
                    title: 'Success!',
                    text: 'Data cloned successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
          })
    }

    return (
    	<>
    		<button onClick={() => clone(id)} className="btn btn-success btn-sm" style={{ color: "white" }}><i className="fa fa-copy"></i></button>
    	</>
    )

}