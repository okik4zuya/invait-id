import React from "react";

export default function CloseButton({ onClose }) {

    return (
        <div
            className="position-fixed animate__animated animate__fadeInDown rounded-circle u-w-10 u-h-10 u-top-2 u-right-2 u-fs-28 d-flex justify-content-center align-items-center"
            style={{ background: "#e7e7e7", color: "#737373" }}
            onClick={onClose}>
            <i className="bx bx-x" />
        </div>
    )
}