'use client'

import Aos from "aos"

export default function Hero() {
    return(
        <>
            <section id="hero" class="hero section dark-background">
                <div class="container">
                    <div class="row gy-4">
                        <div class="col-lg-4 order-lg-last hero-img" data-aos="zoom-out">
                            <img src="assets_lp/img/phone2.png" alt="Phone 1" class="phone-1" />
                            <img src="assets_lp/img/phone1.png" alt="Phone 2" class="phone-2" />
                        </div>
                        <div class="col-lg-8 d-flex flex-column justify-content-center align-items text-center text-md-start" data-aos="fade-up">
                            <h2>Ngangonkan Sapi Mu Sekarang Juga!</h2>
                            <p>Aplikasi HeyCow berfungsi untuk memonitoring kesehatan, gejala, dan penyakit pada
                            sapi secara real-time yang terintegrasi dengan IoT yang dapat mendeteksi suhu tubuh,
                            dan parameterlainnya.
                            </p>
                            <div class="d-flex mt-4 justify-content-center justify-content-md-start">
                                <a href="#" class="download-btn"><i class="bi bi-google-play"></i> <span>Google Play</span></a>
                                <a href="#" class="download-btn"><i class="bi bi-apple"></i> <span>App Store</span></a>
                            </div>
                        </div>
                    </div>
                </div>

            </section>   
        </>
    )
}