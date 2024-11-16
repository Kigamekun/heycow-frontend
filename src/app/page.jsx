'use client'
import { heycow } from '@/images/hey_cow.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import '../styles/globals.css';
import Image from 'next/image';
import {heycow} from '@/images/hey_cow.svg'
import Link from 'next/link';
import '../public/assets_lp/vendor/bootstrap/css/bootstrap.min.css';
import { iphone2 } from '@/public/assets_lp/img/phone2.png'
// import { Button } from 'bootstrap';
// import { Button } from '@/public/assets_lp/vendor/bootstrap/js/bootstrap';
export default function Home() {
  return (
    <>
      {/* Head Section */}
      <Head>
        <title>HeyCow</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <link rel="icon" href="/assets_lp/img/favicomatic/favicon-1.png" />
        <link rel="apple-touch-icon" href="/assets_lp/img/favicomatic/apple-touch-icon-1.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link href="/assets_lp/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/assets_lp/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
        <link href="/assets_lp/css/main.css" rel="stylesheet" />
      </Head>

      {/* Body */}
      <body className="index-page">
        {/* Header */}
        <header id="header" className="header d-flex align-items-center fixed-top">
          <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
            <Link href="/" className="logo d-flex align-items-center">
                <Image src="/public/assets_lp/img/logosapi.png" alt="Logo" width={50} height={50} />
                <h1 className="sitename">HeyCow</h1>
            </Link>

            <nav id="navmenu" className="navmenu">
              <ul>
                <li>
                  <Link href="#hero" className='active'>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#about">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#contact">
                    Contact
                  </Link>
                </li>
              </ul>
              <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>

            <Link href="/login" >
              <button className="btn btn-light">Login</button>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <main className="main">
          <section id="hero" className="hero section dark-background">
            <div className="container">
              <div className="row gy-4">
                <div className="col-lg-4 order-lg-last hero-img">
                  <img
                    src="/public/assets_lp/img/phone2.png"
                    alt="Phone 1"
                    width={300}
                    height={600}
                    className="phone-1"
                  />
                  <img
                    src="/assets_lp/img/phone1.png"
                    alt="Phone 2"
                    width={300}
                    height={600}
                    className="phone-2"
                  />
                </div>
                <div className="text-center col-lg-8 d-flex flex-column justify-content-center align-items-center text-md-start">
                  <h2>Ngangonkan Sapi Mu Sekarang Juga!</h2>
                  <p>
                    Aplikasi HeyCow berfungsi untuk memonitoring kesehatan, gejala, dan penyakit
                    pada sapi secara real-time yang terintegrasi dengan IoT yang dapat mendeteksi
                    suhu tubuh, dan parameter lainnya.
                  </p>
                  <div className="mt-4 d-flex justify-content-center justify-content-md-start">
                    <a href="#" className="download-btn">
                      <i className="bi bi-google-play"></i> <span>Google Play</span>
                    </a>
                    <a href="#" className="download-btn">
                      <i className="bi bi-apple"></i> <span>App Store</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="about section">
            <div className="container">
              <div className="row align-items-center gy-5">
                <div className="col-xl-6">
                  <Image
                    src="/assets_lp/img/sapi_3.jpg"
                    alt="Cow Image"
                    width={600}
                    height={400}
                    className="rounded img-fluid"
                  />
                </div>
                <div className="col-xl-6 content">
                  <h2>About HeyCow.com</h2>
                  <p>
                    Aplikasi HeyCow! menyediakan layanan manajemen ternak sapi yang mencakup
                    pengelolaan ternak, integrasi perangkat IoT, dan pemantauan kesehatan ternak.
                  </p>
                  <a href="#" className="read-more">
                    <span>Read More</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Add other sections here */}
        </main>
      </body>
                <div className="email">
                  <i className="bi bi-envelope"></i>
                  <h4>Email:</h4>
                  <p>info@heycow.com</p>
                </div>
                <div className="phone">
                  <i className="bi bi-phone"></i>
                  <h4>Call:</h4>
                  <p>+62 1234 5678 90</p>
                </div>
              </div>
            </div>
            <div className="mt-5 col-lg-8 mt-lg-0">
              <form action="forms/contact.php" method="post" role="form" className="php-email-form">
                <div className="row">
                  <div className="col-md-6 form-group">
                    <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                  </div>
                  <div className="col-md-6 form-group">
                    <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
                  </div>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
                </div>
                <div className="form-group">
                  <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
                </div>
                <div className="text-center">
                  <button type="submit">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
