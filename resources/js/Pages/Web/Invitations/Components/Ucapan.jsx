import React, { useState } from "react"
import { useInvitationStore } from "../../../../store";
import CloseButton from "./CloseButton";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { formatDistance } from 'date-fns'
import {id} from 'date-fns/locale'

export default function Ucapan(props) {
    const { data, attributes, messages } = props;
    const { invitation } = usePage().props



    //define state
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [isSent, setIsSent] = useState(false)

    //destructure zustand state
    const { setIsModalUcapanShow } = useInvitationStore(state => state);

    //format date to ... time ago
    const formattedDate = (date) => {
        return formatDistance(Date.parse(date), Date.now(), {addSuffix: true, locale: id})

    }

    //define method
    const storeInvitationMessage = async (e) => {
        e.preventDefault();
        setIsSending(true);

        //sending data
        Inertia.post('/invitation-messages', {
            //data
            name,
            message,
            invitation_id: invitation.id
        },
            {
                onStart: () => setIsSending(true),
                onSuccess: () => {
                    setIsSending(false);
                    setIsSent(true);
                    setMessage('');
                    setName('');
                }
            }
        );
    }

    return (
        <div
            className={`modal-ucapan_container animate__animated animate__fadeInUp`}
            style={{
                backgroundColor: "white",
                overflow: "auto"
            }}
        >
            <CloseButton onClose={() => setIsModalUcapanShow(false)} />
            <div className="modal-ucapan_title">{data.data.title}</div>
            <div className="modal-ucapan_narasi">{data.data.narration}</div>
            <div className="form-ucapan_wrapper">
                <form className="form-ucapan" onSubmit={storeInvitationMessage}>
                    <input
                        className="form-control"
                        value={name}
                        placeholder="Nama"
                        onChange={e => setName(e.target.value)}

                    />
                    <textarea
                        className="form-control"
                        value={message}
                        placeholder="Pesan"
                        onChange={e => setMessage(e.target.value)}

                    />
                    <button type="submit" className="btn-primary modal-ucapan_submit">{isSending ? "Mengirim..." : "Kirim"}</button>
                    {isSent && <div className="modal-ucapan_notification" style={{ color:"#737373" }}>Pesan terkirim!</div>}
                </form>
            </div>
            <div className="message_wrapper">
                {messages.map((item, key) => (
                    <div key={key} className="message">
                        <div className="message__date">{formattedDate(item.created_at)}</div>
                        <div className="message__name">{item.name}</div>
                        <div className="message__message">{item.message}</div>
                    </div>
                ))}
            </div>

        </div>
    )
}