'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import Image from 'next/image';
import {heycow} from '@/images/hey_cow.svg'
import Link from 'next/link';
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/react";
import '../public/assets_lp/vendor/bootstrap/css/bootstrap.min.css';
import { iphone2 } from '@/public/assets_lp/img/phone2.png'
import Hero from '@/components/Hero';

// Import Favicons



import Aos from 'aos';
// main css
import '@/public/assets_lp/css/main.css';

// Import css dan animation
import  '@/public/assets_lp/vendor/bootstrap/css/bootstrap.min.css';
import '@/public/assets_lp/vendor/bootstrap-icons/bootstrap-icons.css';
import '@/public/assets_lp/vendor/aos/aos.css';
import '@/public/assets_lp/vendor/swiper/swiper-bundle.min.css';
import '@/public/assets_lp/vendor/glightbox/css/glightbox.min.css';
// import favicon1 from '@/public/assets_lp/img/favicomatic/favicon-1.png';
import favicon2 from '@/public/assets_lp/img/favicomatic/favicon-2.png';
import favicon3 from '@/public/assets_lp/img/favicomatic/favicon-3.png';
import favicon4 from '@/public/assets_lp/img/favicomatic/favicon-4.png';
import favicon5 from '@/public/assets_lp/img/favicomatic/favicon-5.png';
import favicon6 from '@/public/assets_lp/img/favicomatic/favicon-6.png';
import appleTouchIcon1 from '@/public/assets_lp/img/favicomatic/apple-touch-icon-1.png';
import appleTouchIcon2 from '@/public/assets_lp/img/favicomatic/apple-touch-icon-2.png';
import appleTouchIcon3 from '@/public/assets_lp/img/favicomatic/apple-touch-icon-3.png';
import appleTouchIcon4 from '@/public/assets_lp/img/favicomatic/apple-touch-icon-4.png';
import appleTouchIcon5 from '@/public/assets_lp/img/favicomatic/apple-touch-icon-5.png';
import appleTouchIcon6 from '@/public/assets_lp/img/favicomatic/apple-touch-icon-6.png';
import appleTouchIcon7 from '@/public/assets_lp/img/favicomatic/apple-touch-icon-7.png';
import appleTouchIcon8 from '@/public/assets_lp/img/favicomatic/apple-touch-icon-8.png';
import mstile1 from '@/public/assets_lp/img/favicomatic/mstile-1.png';
import mstile2 from '@/public/assets_lp/img/favicomatic/mstile-2.png';
import mstile3 from '@/public/assets_lp/img/favicomatic/mstile-3.png';
import mstile4 from '@/public/assets_lp/img/favicomatic/mstile-4.png';
import mstile5 from '@/public/assets_lp/img/favicomatic/mstile-5.png';
import 'aos/dist/aos.css';
// import { Button } from 'bootstrap';
// import { Button } from '@/public/assets_lp/vendor/bootstrap/js/bootstrap';
export default function Home() {
  return (
    <>
      <Head>
        <link href='aos/dist/aos.css' rel='stylesheet' />
        <link href="/assets_lp/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/assets_lp/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
        {/* <link href="/assets_lp/vendor/aos/aos.css" rel="stylesheet" /> */}
        <link href="/assets_lp/vendor/swiper/swiper-bundle.min.css" rel="stylesheet" />
        <link href="/assets_lp/vendor/glightbox/css/glightbox.min.css" rel="stylesheet" />
      </Head>
      <header id="header" class="header d-flex align-items-center fixed-top">
        <div class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">

          <a href="/" class="logo d-flex align-items-center">
            <img src="public/assets_lp/img/logosapi.png" alt="" />
            <h1 class="sitename">HeyCow </h1>
          </a>

          <nav id="navmenu" class="navmenu">
            <ul>
              <li><a href="#hero" class="active">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
            <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

          <a href="/login" class="btn btn-light">Login</a>

        </div>
      </header>
      {/* <!-- Hero Section --> */}
    <section id="hero" class="hero section dark-background">
      <div class="container">
        <div class="row gy-4">
          <div class="col-lg-4 order-lg-last hero-img" >
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
    
    {/* about */}
    <section id="about" class="about section">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row align-items-center gy-5">

          {/* <!-- Image on the Left --> */}
          <div class="col-xl-6">
            <img src="assets_lp/img/sapi_3.jpg" alt="Cow Image" class="img-fluid rounded" />
          </div>

          {/* <!-- Content on the Right --> */}
          <div class="col-xl-6 content">
            {/* <!-- <h3>About Us</h3> --> */}
            <h2>About HeyCow.com</h2>
            <p>Aplikasi HeyCow! menyediakan layanan manajemen ternak sapi yang mencakup pengelolaan ternak, integrasi perangkat IoT, dan pemantauan kesehatan ternak. Aplikasi ini dirancang untuk para peternak yang meminjamkan sapi mereka kepada HeyCow! untuk digembalakan dan dirawat.
            Dengan bantuan teknologi, peternak dapat memantau kondisi kesehatan sapi dan mendapatkan solusi manajemen ternak yang lebih efektif.</p>
            <a href="#" class="read-more"><span>Read More</span><i class="bi bi-arrow-right"></i></a>
          </div>

        </div>
      </div>

    </section>
    
    {/* <!-- Featured Section --> */}
      <section id="featured" class="featured section">

        {/* <!-- Section Title --> */}
        <div class="container section-title" data-aos="fade-up">
          <h2>OUR SERVICES</h2>
          <p>Kami menyediakan layanan yang dirancang khusus untuk memenuhi kebutuhan Anda</p>
        </div>
        {/* <!-- End Section Title --> */}

        <div class="container">

          <div class="row gy-4" data-aos="fade-up" data-aos-delay="100">

            <div class="col-md-4">
              <div class="card">
                <div class="img">
                  <img src="assets_lp/img/cattle-vector 1.svg" alt="" class="img-fluid" />
                </div>
                <h2 class="title">Ngangon - Management Livestock Cattle</h2>
                <p>
                  Manage your cattle, so you can manage and monitor them remotely.
                </p>
              </div>
            </div>
            {/* <!-- End Card Item --> */}

            <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <div class="card">
                <div class="img">
                  <img src="assets_lp/img/Mobile - monitor 1.svg" alt="" class="img-fluid"/>
                </div>
                <h2 class="title">Health Monitoring</h2>
                <p>
                  Providing a feature to monitor your cattle’s health through the mobile app.
                </p>
              </div>
            </div>
            {/* <!-- End Card Item --> */}

            <div class="col-md-4" data-aos="fade-up" data-aos-delay="300">
              <div class="card">
                <div class="img">
                  <img src="assets_lp/img/community 2.svg" alt="" class="img-fluid" />
                </div>
                <h2 class="title">Community</h2>
                <p>
                  A community forum for those who want to ask questions.
                </p>
              </div>
            </div>
            {/* <!-- End Card Item --> */}

          </div>

        </div>

      </section>  
    </>
  );
}
