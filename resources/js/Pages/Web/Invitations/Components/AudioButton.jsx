import React, { useEffect } from 'react'
import { useInvitationStore } from '../../../../store';

export function AudioButton({ src }) {
    //destructure global state from zustand
    const { isAudioPlay, setIsAudioPlay } = useInvitationStore(state => state)

    useEffect(() => {
        var audio = document.getElementById("audioFile");
        isAudioPlay ? audio.play() : audio.pause();
    }, [isAudioPlay]);

    return (
        <div
            className="play-button"
            onClick={() => setIsAudioPlay(!isAudioPlay)}
        >
            <audio id="audioFile" loop={true}>
                <source src={src} type="audio/mpeg" />
            </audio>
            <i className={`bx ${isAudioPlay ? "bx-pause" : "bx-play"}`} />
        </div>
    );
}
