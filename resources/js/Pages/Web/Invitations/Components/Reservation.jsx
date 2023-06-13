import React, { useState } from "react"
import { useInvitationStore } from "../../../../store";
import CloseButton from "./CloseButton";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { formatDistance } from 'date-fns'
import { id } from 'date-fns/locale'

export default function Reservation(props) {
    const { data, attributes } = props;
    const { invitation, errors } = usePage().props

    //define state
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const [numberPresent, setNumberPresent] = useState(0)
    const [isSending, setIsSending] = useState(false)
    const [isSent, setIsSent] = useState(false)
    //console.log({ name, message })

    //destructure zustand state
    const { setIsModalRsvpShow } = useInvitationStore(state => state);


    //define method
    const storeInvitationReservation = async (e) => {
        e.preventDefault();
        setIsSending(true);
        //sending data
        Inertia.post('/invitation-reservations', {
            //data
            name,
            confirmation,
            number_present: numberPresent,
            invitation_id: invitation.id
        },
            {
                onStart: () => setIsSending(true),
                onSuccess: () => {
                    setIsSending(false);
                    setIsSent(true);
                    setName('')
                    setConfirmation('')
                    
                }
            }
        );
        if (errors) {
            setIsSending(false);
            setIsSent(false);

        }
    }

    return (
        <div
            className={`modal-rsvp_container animate__animated animate__fadeInUp`}
            style={{
                backgroundColor: "white",
                overflow: "auto"
            }}
        >
            <CloseButton onClose={() => setIsModalRsvpShow(false)} />
            <div className="modal-rsvp_title">{data.data.title}</div>
            <div className="modal-rsvp_narasi">{data.data.narration}</div>
            <div className="form-rsvp_wrapper">
                <form className="form-rsvp" onSubmit={storeInvitationReservation}>
                    <input
                        className="form-control"
                        value={name}
                        placeholder="Nama"
                        onChange={e => setName(e.target.value)}

                    />
                    {errors.name && (
                        <div className="alert alert-danger">
                            {errors.name}
                        </div>
                    )}
                    <select className="form-select" value={confirmation} defaultValue="" onChange={(e) => setConfirmation(e.target.value)}>
                        <option value="">--Konfirmasi Kehadiran--</option>
                        <option value="Hadir">Hadir</option>
                        <option value="Tidak Hadir">Tidak Hadir</option>
                        <option value="Ragu-ragu">Ragu-ragu</option>
                    </select>
                    {errors.confirmation && (
                        <div className="alert alert-danger">
                            {errors.confirmation}
                        </div>
                    )}
                    {confirmation === "Hadir" &&
                        <input
                            className="form-control"
                            value={numberPresent}
                            placeholder="Jumlah yang hadir"
                            onChange={e => setNumberPresent(e.target.value)}
                        />
                    }
                    <button type="submit" className="btn-primary modal-rsvp_submit">{isSending ? "Mengirim..." : "Kirim"}</button>
                    {isSent && <div className="modal-rsvp_notification" style={{ color: "#737373" }}>Konfirmasi terkirim!</div>}
                </form>
            </div>

        </div>
    )
}