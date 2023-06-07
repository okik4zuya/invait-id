import React, { useEffect, useRef, useState } from "react";

export default function Countdown(props) {
    const { attributes } = props;
    const { date } = props.data;
    const [timer, setTimer] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    let interval = useRef();

    const startTimer = () => {
        const countdownDate = new Date(date).getTime();
        interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                //stop timer
                clearInterval(interval.current);
            } else {
                setTimer({
                    days,
                    hours,
                    minutes,
                    seconds,
                });
            }
        }, 1000);
    };

    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(interval.current);
        };
    }, [timer]);
    return (
        <div {...attributes} className={`countdown-container ${attributes.className}`}>
            <CountdownCard tick={timer.days} label="Hari" />
            <CountdownCard tick={timer.hours} label="Jam" />
            <CountdownCard tick={timer.minutes} label="Menit" />
            <CountdownCard tick={timer.seconds} label="Detik" />
        </div>
    );
}

export function CountdownCard(props) {
    const { tick, label } = props;
    return (
        <div className="countdown-card" >
            <div className="countdown-card__tick" >
                {tick < 10 ? "0" : ""}
                {tick}
            </div>
            <div className="countdown-card__label" >
                {label}
            </div>
        </div>
    );
}