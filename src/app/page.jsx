'use client'
import { heycow } from '@/images/hey_cow.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import '../styles/globals.css';
export default function Home() {
  return (
    <>
      <header>
        <Image src={heycow}/>
        <title>HeyCow!</title>
        <meta name="description" content="HeyCow! Landing Page" />
        <link rel="icon" href={heycow} />
        {/* You can link any external CSS or JS libraries here */}
      </header>

      
      {/* Navbar Section */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container header">
          <a className="navbar-brand" href="/login">HeyCow! (Kalo mau login disini aja)</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="ml-auto navbar-nav">
              <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
              <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
              <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="d-flex align-items-center dark-background">
        <div className="container text-center">
          <h1>Welcome to HeyCow!</h1>
          <h2>Managing your livestock has never been easier.</h2>
          <a href="#about" className="btn-get-started scrollto">Get Started</a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <img src="/assets_lp/img/about.jpg" className="img-fluid" alt="About" />
            </div>
            <div className="pt-4 col-lg-6 pt-lg-0">
              <h3>About HeyCow!</h3>
              <p>HeyCow! is an app designed to simplify cattle management through technology and IoT.</p>
              <ul>
                <li><i className="bi bi-check"></i> Cattle health monitoring.</li>
                <li><i className="bi bi-check"></i> Grazing management services.</li>
                <li><i className="bi bi-check"></i> IoT device integration for efficiency.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services section-bg">
        <div className="container">
          <div className="section-title">
            <h2>Services</h2>
            <p>Our services are designed to make cattle farming easier and more efficient.</p>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="icon-box">
                <div className="icon"><i className="bi bi-bullseye"></i></div>
                <h4><a href="">Cattle Tracking</a></h4>
                <p>Track your cattle in real-time with our advanced IoT solutions.</p>
              </div>
            </div>
            <div className="mt-4 col-lg-4 col-md-6 mt-md-0">
              <div className="icon-box">
                <div className="icon"><i className="bi bi-heart-pulse"></i></div>
                <h4><a href="">Health Monitoring</a></h4>
                <p>Monitor the health and activity levels of your cattle to ensure well-being.</p>
              </div>
            </div>
            <div className="mt-4 col-lg-4 col-md-6 mt-lg-0">
              <div className="icon-box">
                <div className="icon"><i className="bi bi-box"></i></div>
                <h4><a href="">Grazing Services</a></h4>
                <p>Let HeyCow! handle grazing management to optimize productivity.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-title">
            <h2>Contact</h2>
            <p>Contact us to get started with HeyCow!</p>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="info">
                <div className="address">
                  <i className="bi bi-geo-alt"></i>
                  <h4>Location:</h4>
                  <p>123 HeyCow Street, Cattle Town, Indonesia</p>
                </div>
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
