import React, { useState } from "react"
import { useInvitationStore } from "../../../../store";
import CloseButton from "./CloseButton";

export default function Gift(props) {
    const { data, attributes } = props;

    //destructure zustand state
    const { setIsModalGiftShow } = useInvitationStore(state => state);


    return (
        <div
            className={`modal-gift_container animate__animated animate__fadeInUp`}
            style={{
                backgroundColor: "white",
                overflow: "auto"
            }}
        >
            <CloseButton onClose={() => setIsModalGiftShow(false)} />
            <div className="modal-gift_title">{data.data.title}</div>
            <div className="modal-gift_narasi">{data.data.narration}</div>
            <div className="gift-list_wrapper">
                {data.data.accounts.map((account, key) => (
                    <div
                        className="u-mb-4 rounded u-pt-4 u-pb-4 u-pl-4 u-pr-4 d-flex flex-column align-items-center"
                        style={{ background: "#e5e5e5" }}
                    >
                        <div className="u-fw-700 u-fs-22 u-font-base">{account.title}</div>
                        <img className="u-w-40" src={account.logo} alt={account.logo}/>
                        <div className="u-fw-700 u-fs-16 u-font-base">{account.name}</div>
                        {account.account && <div className="u-fs-16 u-font-base">{account.account}</div>}
                        {account.address && <div className="u-fs-16 u-font-base">{account.address}</div>}
                    </div>
                ))}
            </div>

        </div>
    )
}