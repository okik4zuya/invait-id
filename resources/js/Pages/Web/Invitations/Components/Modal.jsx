import React from "react"

export default function Modal({ isShow, onClose, children, position }) {
    return (
        <>
            {isShow && (
                <div
                    className="modal__container"
                >
                    <div className="modal__backdrop" onClick={onClose} ></div>
                    <div className="modal__children" > {children} </div>
                </div>
            )}
        </>
    );
}