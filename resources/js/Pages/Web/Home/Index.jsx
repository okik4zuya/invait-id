import React, { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect/dist/core';
import './index.css';
import { Splide } from '@splidejs/splide';
import '@splidejs/splide/css';
import '@splidejs/splide/css/core';
import WebLayout from '../../../Layouts/Web';

export default function HomeIndex() {



    //define feature contents
    const featureContents = [
        {
            title: "Undangan Unlimited",
            image: "",
            description: "Anda dapat menyebarkan undangan anda sebanyak-banyaknya. Tanpa batas."
        },
        {
            title: "Audio Latar",
            image: "",
            description: "Bangun suasana audience anda dengan audio latar belakang pilihan anda."
        },
        {
            title: "Tambah Kalendar",
            image: "",
            description: "Ingatkan acara anda kepada tamu undangan anda melalui agenda pada Google Calendar."
        },
        {
            title: "Countdown",
            image: "",
            description: "Hitung mundur dan nantikan detik-detik acara anda."
        },
        {
            title: "Maps",
            image: "",
            description: "Permudah tamu undangan anda untuk sampai ke tempat anda."
        },
        {
            title: "Gift",
            image: "",
            description: "Dapatkan hadiah dari tamu undangan anda melalui berbagai pembayaran cashless atau kirim hadiah."
        },
        {
            title: "Ucapan",
            image: "",
            description: "Dapatkan ucapan terbaik dari audience anda di momen terbaik anda."
        },
        {
            title: "RSVP",
            image: "",
            description: "Terima konfirmasi kehadiran tamu anda dengan mudah."
        },
        {
            title: "Galeri",
            image: "",
            description: "Bagikan momen terbaik anda melalui kumpulan foto pada undangan anda."
        },
        {
            title: "Video",
            image: "",
            description: "Bagikan video untuk meningkatkan impresi acara anda kepada audience."
        },
    ]

    useEffect(() => {
        new Typewriter('.typing-1', {
            strings: ['Undang siapa', 'Acara apa', 'Tinggal Invait'],
            autoStart: true,
            loop: true
        });
        var highlightSlider = new Splide('#highlight-slider', {
            width: '100%',
            height: '100%',
            autoplay: true,
            interval: 3500,
            type: 'loop',
            arrows: false,
            pagination: false,
            pauseOnFocus: true,
            pauseOnHover: true
        });
        highlightSlider.mount();

    }, [])


    return (
        <WebLayout>
            <div className='main-display'>
                <div className='typing-text'>
                    <div className='typing'>
                        <div className='typing-1'></div>
                    </div>
                    <div className='saja'>AJA</div>
                </div>
                <div className='highlight__section'>
                    <div id="highlight-slider" className='splide'>
                        <div className='splide__track'>
                            <div className='section-title mb-5'>3 Keunggulan Kami</div>
                            <ul className='splide__list'>
                                <li className='splide__slide highlight '>
                                    <div className='highlight__title'>1-on-1 Service</div>
                                    <div className=''>Nikmati pelayanan <span className='color-ripe-lemon fw-bold'>personal dan ekslusif</span> dari tim kami. <br /> Sampaikan apa yang anda <span className='color-ripe-lemon fw-bold'>inginkan</span>, sisanya kami yang <span className='color-ripe-lemon fw-bold'>wujudkan</span>.</div>
                                </li>
                                <li className='splide__slide highlight '>
                                    <div className='highlight__title'>Banyak Tema</div>
                                    <div className=''>
                                        Lebih dari <span className='color-ripe-lemon fw-bold'>100</span> tema (dan terus bertambah). <br />
                                        Kategori tema meliputi<span className='color-ripe-lemon fw-bold'> pernikahan, syukuran, aqiqah, khitanan, acara keluarga, sekolah, kantor, dan lain sebagainya.</span>
                                    </div>
                                </li>
                                <li className='splide__slide highlight'>
                                    <div className='highlight__title'>Bayar dengan Dukungan</div>
                                    <div className=''>Kami sangat senang dengan <span className='color-ripe-lemon fw-bold'>dukungan</span> anda atas karya-karya kami.  Kami memberikan karya terbaik kami sebagai penghargaan atas <span className='color-ripe-lemon fw-bold'>apresiasi anda.</span></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='statistic-section'>
                <div className='section-title'>Invait dalam Angka</div>
                <div className='statistic__list'>
                    <div className='statistic__item'>
                        <div className='statistic__number'>100+</div>
                        <div className='statistic__label'>tema siap digunakan</div>
                    </div>
                    <div className='statistic__item'>
                        <div className='statistic__number'>1000+</div>
                        <div className='statistic__label'>undangan dibuat</div>
                    </div>
                    <div className='statistic__item'>
                        <div className='statistic__number'>500+</div>
                        <div className='statistic__label'>ucapan dikirimkan</div>
                    </div>

                </div>

            </div>
            <div className='feature-section mt-5'>
                <div className='section-title'>Fitur-fitur</div>
                <div className='feature-list'>
                    {featureContents.map((feature, key) => (
                        <div key={key} className='glass-card feature-item mb-4'>
                            <div className='glass-card__title'>{feature.title}</div>
                            <div className='glass-card__description'>{feature.description}</div>
                        </div>
                    ))}
                </div>

            </div>
        </WebLayout>
    )
}