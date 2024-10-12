'use client'

export default function Home() {
  return (
    <>
<>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>HeyCow</title>
  <meta name="description" content="" />
  <meta name="keywords" content="" />
  <link href="assets_lp/img/favicomatic/favicon-1.png" rel="icon" />
  <link href="assets_lp/img/favicomatic/favicon-2.png" rel="icon" />
  <link href="assets_lp/img/favicomatic/favicon-3.png" rel="icon" />
  <link href="assets_lp/img/favicomatic/favicon-4.png" rel="icon" />
  <link href="assets_lp/img/favicomatic/favicon-5.png" rel="icon" />
  <link href="assets_lp/img/favicomatic/favicon-6.png" rel="icon" />
  <link
    href="assets_lp/img/favicomatic/apple-touch-icon-1.png"
    rel="apple-touch-icon"
  />
  <link
    href="assets_lp/img/favicomatic/apple-touch-icon-2.png"
    rel="apple-touch-icon"
  />
  <link
    href="assets_lp/img/favicomatic/apple-touch-icon-3.png"
    rel="apple-touch-icon"
  />
  <link
    href="assets_lp/img/favicomatic/apple-touch-icon-4.png"
    rel="apple-touch-icon"
  />
  <link
    href="assets_lp/img/favicomatic/apple-touch-icon-5.png"
    rel="apple-touch-icon"
  />
  <link
    href="assets_lp/img/favicomatic/apple-touch-icon-6.png"
    rel="apple-touch-icon"
  />
  <link
    href="assets_lp/img/favicomatic/apple-touch-icon-7.png"
    rel="apple-touch-icon"
  />
  <link
    href="assets_lp/img/favicomatic/apple-touch-icon-8.png"
    rel="apple-touch-icon"
  />
  <link href="assets_lp/img/favicomatic/mstile-1.png" rel="apple-touch-icon" />
  <link href="assets_lp/img/favicomatic/mstile-2.png" rel="apple-touch-icon" />
  <link href="assets_lp/img/favicomatic/mstile-3.png" rel="apple-touch-icon" />
  <link href="assets_lp/img/favicomatic/mstile-4.png" rel="apple-touch-icon" />
  <link href="assets_lp/img/favicomatic/mstile-5.png" rel="apple-touch-icon" />
  <link href="https://fonts.googleapis.com" rel="preconnect" />
  <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    rel="stylesheet"
  />
  <link
    href="assets_lp/vendor/bootstrap/css/bootstrap.min.css"
    rel="stylesheet"
  />
  <link
    href="assets_lp/vendor/bootstrap-icons/bootstrap-icons.css"
    rel="stylesheet"
  />
  <link href="assets_lp/vendor/aos/aos.css" rel="stylesheet" />
  <link href="assets_lp/vendor/swiper/swiper-bundle.min.css" rel="stylesheet" />
  <link
    href="assets_lp/vendor/glightbox/css/glightbox.min.css"
    rel="stylesheet"
  />
  <link href="{{ asset('assets_lp/css/main.css') }}" rel="stylesheet" />
  <header id="header" className="header d-flex align-items-center fixed-top">
    <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
      <a href="index.html" className="logo d-flex align-items-center">
        <img src="assets_lp/img/logosapi.png" alt="" />
        <h1 className="sitename">HeyCow </h1>
      </a>
      <nav id="navmenu" className="navmenu">
        <ul>
          <li>
            <a href="#hero" className="active">
              Home
            </a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <i className="mobile-nav-toggle d-xl-none bi bi-list" />
      </nav>
      <a href="{{route('login')}}" className="btn btn-light">
        Login
      </a>
    </div>
  </header>
  <main className="main">
    <section id="hero" className="hero section dark-background">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4 order-lg-last hero-img" data-aos="zoom-out">
            <img
              src="assets_lp/img/phone2.png"
              alt="Phone 1"
              className="phone-1"
            />
            <img
              src="assets_lp/img/phone1.png"
              alt="Phone 2"
              className="phone-2"
            />
          </div>
          <div
            className="text-center col-lg-8 d-flex flex-column justify-content-center align-items text-md-start"
            data-aos="fade-up"
          >
            <h2>Ngangonkan Sapi Mu Sekarang Juga!</h2>
            <p>
              Aplikasi HeyCow berfungsi untuk memonitoring kesehatan, gejala,
              dan penyakit pada sapi secara real-time yang terintegrasi dengan
              IoT yang dapat mendeteksi suhu tubuh, dan parameterlainnya.
            </p>
            <div className="mt-4 d-flex justify-content-center justify-content-md-start">
              <a href="#" className="download-btn">
                <i className="bi bi-google-play" /> <span>Google Play</span>
              </a>
              <a href="#" className="download-btn">
                <i className="bi bi-apple" /> <span>App Store</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="about" className="about section">
      <div className="container" data-aos="fade-up" data-aos-delay={100}>
        <div className="row align-items-center gy-5">
          <div className="col-xl-6">
            <img
              src="assets_lp/img/sapi_3.jpg"
              alt="Cow Image"
              className="rounded img-fluid"
            />
          </div>
          <div className="col-xl-6 content">
            About Us --&gt;
            <h2>About HeyCow.com</h2>
            <p>
              Aplikasi HeyCow! menyediakan layanan manajemen ternak sapi yang
              mencakup pengelolaan ternak, integrasi perangkat IoT, dan
              pemantauan kesehatan ternak. Aplikasi ini dirancang untuk para
              peternak yang meminjamkan sapi mereka kepada HeyCow! untuk
              digembalakan dan dirawat. Dengan bantuan teknologi, peternak dapat
              memantau kondisi kesehatan sapi dan mendapatkan solusi manajemen
              ternak yang lebih efektif.
            </p>
            <a href="#" className="read-more">
              <span>Read More</span>
              <i className="bi bi-arrow-right" />
            </a>
          </div>
        </div>
      </div>
    </section>
    <section id="featured" className="featured section">
      <div className="container section-title" data-aos="fade-up">
        <h2>OUR SERVICES</h2>
        <p>
          Kami menyediakan layanan yang dirancang khusus untuk memenuhi
          kebutuhan Anda
        </p>
      </div>
      <div className="container">
        <div className="row gy-4" data-aos="fade-up" data-aos-delay={100}>
          <div className="col-md-4">
            <div className="card">
              <div className="img">
                <img
                  src="assets_lp/img/cattle-vector 1.svg"
                  alt=""
                  className="img-fluid"
                />
              </div>
              <h2 className="title">Ngangon - Management Livestock Cattle</h2>
              <p>
                Manage your cattle, so you can manage and monitor them remotely.
              </p>
            </div>
          </div>
          <div className="col-md-4" data-aos="fade-up" data-aos-delay={200}>
            <div className="card">
              <div className="img">
                <img
                  src="assets_lp/img/Mobile - monitor 1.svg"
                  alt=""
                  className="img-fluid"
                />
              </div>
              <h2 className="title">Health Monitoring</h2>
              <p>
                Providing a feature to monitor your cattle’s health through the
                mobile app.
              </p>
            </div>
          </div>
          <div className="col-md-4" data-aos="fade-up" data-aos-delay={300}>
            <div className="card">
              <div className="img">
                <img
                  src="assets_lp/img/community 2.svg"
                  alt=""
                  className="img-fluid"
                />
              </div>
              <h2 className="title">Community</h2>
              <p>A community forum for those who want to ask questions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="featured" className="featured section">
      <div className="container section-title" data-aos="fade-up">
        <h2>OUR PRODUCT</h2>
        <p>
          Kami menyediakan produk berbasis teknologi canggih yang dirancang
          untuk meningkatkan efisiensi dan produktivitas Anda
        </p>
      </div>
      <div className="container">
        <div className="row gy-4" data-aos="fade-up" data-aos-delay={100}>
          <div className="col-md-4">
            <div className="card">
              <div className="img">
                <img
                  src="assets_lp/img/iot 1.svg"
                  alt=""
                  className="img-fluid"
                />
              </div>
              <h2 className="title">Internet Of Things | Ear Tag</h2>
              <p>
                Helping farmers obtain real-time and concrete data from their
                cows.
              </p>
            </div>
          </div>
          <div className="col-md-4" data-aos="fade-up" data-aos-delay={200}>
            <div className="card">
              <div className="img">
                <img
                  src="assets_lp/img/mobile-app 1.svg"
                  alt=""
                  className="img-fluid"
                />
              </div>
              <h2 className="title">Mobile Application HeyCow</h2>
              <p>
                A mobile app provided for cattle farmers with flexible
                functionality.
              </p>
            </div>
          </div>
          <div className="col-md-4" data-aos="fade-up" data-aos-delay={300}>
            <div className="card">
              <div className="img">
                <img
                  src="assets_lp/img/desktop.svg"
                  alt=""
                  className="img-fluid"
                />
              </div>
              <h2 className="title">Desktop | Website</h2>
              <p>
                A desktop and website platform for administrators to manage the
                database or storage of cattle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div className="banner">
      <div className="text-section">
        <h1>HeyCow</h1>
        <p>
          A cattle farm management app using Internet Of Things for real-time
          data updates, available on Google Playstore.
        </p>
        <a href="#" className="download-button">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Download on Google Play"
          />
          Download Now!
        </a>
      </div>
      <div className="image-section">
        <img src="assets_lp/img/banner-img.png" alt="HeyCow App Screenshots" />
      </div>
    </div>
    <section id="docum" className="docum section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Documentation</h2>
        <p>Ini adalah dokumentasi resmi dari HeyCow.</p>
      </div>
      <div className="container" data-aos="zoom-in" data-aos-delay={100}>
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="docum-item">
              <div className="icon">
                <img src="assets_lp/img/sapi_1.jpg" alt="Free Plan Image" />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="docum-item featured">
              <div className="icon">
                <img src="assets_lp/img/sapi_2.jpg" alt="Business Plan Image" />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="docum-item">
              <div className="icon">
                <img
                  src="assets_lp/img/sapi_3.jpg"
                  alt="Developer Plan Image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="faq" className="faq section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Frequently Asked Questions</h2>
        <p>Pertanyaan yang Sering Kami Dengar.</p>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10" data-aos="fade-up" data-aos-delay={100}>
            <div className="faq-container">
              <div className="faq-item faq-active">
                <h3>Sistem aplikasinya seperti apa sihh?</h3>
                <div className="faq-content">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Unde omnis molestiae voluptatem ad, culpa veritatis amet
                    suscipit eos eum, nesciunt minus ipsum! Maxime blanditiis
                    possimus sapiente iste eveniet. Natus, earum!
                  </p>
                </div>
                <i className="faq-toggle bi bi-chevron-right" />
              </div>
              <div className="faq-item">
                <h3>Kenapa aplikasi ini perlu saya gunakan?</h3>
                <div className="faq-content">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Veritatis dolore repellat dolorum rerum, architecto ab, vero
                    nulla id adipisci perferendis sit atque reprehenderit eaque
                    mollitia cupiditate quo repellendus labore cum?
                  </p>
                </div>
                <i className="faq-toggle bi bi-chevron-right" />
              </div>
              <div className="faq-item">
                <h3>Apakah aplikasi ini memiliki keunggulan?</h3>
                <div className="faq-content">
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Sapiente rem dolore provident vel quibusdam soluta saepe
                    odio dolores explicabo, maxime placeat nostrum quos
                    excepturi ducimus modi velit natus nihil ad.
                  </p>
                </div>
                <i className="faq-toggle bi bi-chevron-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="contact" className="contact section">
      <div className="container section-title">
        <h2>Contact Us</h2>
      </div>
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-6">
            <form
              action="forms/contact.php"
              method="post"
              className="php-email-form"
            >
              <div className="row gy-4">
                <div className="col-md-12">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Nama"
                    required=""
                  />
                </div>
                <div className="col-md-12">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    required=""
                  />
                </div>
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    placeholder="No. Telepon"
                    required=""
                  />
                </div>
                <div className="col-md-12">
                  <textarea
                    className="form-control"
                    name="message"
                    rows={6}
                    placeholder="Komentar"
                    required=""
                    defaultValue={""}
                  />
                </div>
                <div className="text-center col-md-12">
                  <button type="submit" className="btn-submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-6">
            <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15853.851300654514!2d106.78809035541991!3d-6.589250499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5d2e602b501%3A0x25a12f0f97fac4ee!2sSchool%20of%20Vocational%20Studies%20-%20IPB%20University!5e0!3m2!1sen!2sid!4v1726549637387!5m2!1sen!2sid"
                className="iframe-map"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <div className="container">
    <h3 className="sitename">HeyCow.com</h3>
    <p>Kami menyediakan jasa pengangonan</p>{" "}
    <p>sapi ternak anda. Kontak kami untuk</p> <p>tahu lebih dalam!</p>
    <div className="social-links d-flex justify-content-start">
      <a href="">
        <i className="bi bi-instagram" />
      </a>
      <a href="">
        <i className="bi bi-linkedin" />
      </a>
    </div>
    <hr />
    <div className="container">
      <div className="copyright">
        <strong className="px-1 sitename">
          © 2024 HeyCow | Bogor | Jawa Barat | Indonesia
        </strong>
      </div>
    </div>
  </div>
  --&gt;
  <footer id="footer" className="footer dark-background">
    <div className="container">
      <div className="footer-columns">
        <div className="footer-column">
          <h3 className="sitename">HeyCow.com</h3>
          <p>
            Kami menyediakan jasa pengangonan sapi ternak anda. Kontak kami
            untuk tahu lebih dalam!
          </p>
          <div className="social-links">
            <a href="">
              <i className="bi bi-instagram" />
            </a>
            <a href="">
              <i className="bi bi-google-play" />
            </a>
          </div>
        </div>
        <div className="footer-column">
          <h3>Our Services</h3>
          <ul>
            <li>Ngangon - Livestock Cattle</li>
            <li>Health Monitor Cattle</li>
            <li>Cattle Management</li>
            <li>Best Services</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Got Question?</h3>
          <p>+628126436745</p>
          <p>STAKUP</p>
          <p>
            Jl. Kumbang No.13, Baranangsiang, IPB University - Kota Bogor -
            Bogor, Jawa Barat
          </p>
        </div>
      </div>
      <hr />
      <div className="container">
        <div className="copyright">
          <strong className="px-1 sitename">
            © 2024 HeyCow | Bogor | Jawa Barat | Indonesia
          </strong>
        </div>
      </div>
    </div>
  </footer>
  <a
    href="#"
    id="scroll-top"
    className="scroll-top d-flex align-items-center justify-content-center"
  >
    <i className="bi bi-arrow-up-short" />
  </a>
  <div id="preloader" />
</>

    </>


  )
}




