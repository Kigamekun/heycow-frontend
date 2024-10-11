import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div id="app">
      <div id="sidebar">
        <div className="sidebar-wrapper active">
          <div className="sidebar-header position-relative">
            <div className="d-flex justify-content-between align-items-center">
              <div className="logo">
                <a href="index.html">

                </a>
              </div>
              <div className="theme-toggle d-flex gap-2  align-items-center mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--system-uicons"
                  width={20}
                  height={20}
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 21 21"
                >
                  <g
                    fill="none"
                    fillRule="evenodd"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      d="M10.5 14.5c2.219 0 4-1.763 4-3.982a4.003 4.003 0 0 0-4-4.018c-2.219 0-4 1.781-4 4c0 2.219 1.781 4 4 4zM4.136 4.136L5.55 5.55m9.9 9.9l1.414 1.414M1.5 10.5h2m14 0h2M4.135 16.863L5.55 15.45m9.899-9.9l1.414-1.415M10.5 19.5v-2m0-14v-2"
                      opacity=".3"
                    />
                    <g transform="translate(-210 -1)">
                      <path d="M220.5 2.5v2m6.5.5l-1.5 1.5" />
                      <circle cx="220.5" cy="11.5" r={4} />
                      <path d="m214 5l1.5 1.5m5 14v-2m6.5-.5l-1.5-1.5M214 18l1.5-1.5m-4-5h2m14 0h2"></path>
                    </g>
                  </g>
                </svg>
                <div className="form-check form-switch fs-6">
                  <input
                    className="form-check-input  me-0"
                    type="checkbox"
                    id="toggle-dark"
                    style={{ cursor: "pointer" }}
                  />
                  <label className="form-check-label" />
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--mdi"
                  width={20}
                  height={20}
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m17.75 4.09l-2.53 1.94l.91 3.06l-2.63-1.81l-2.63 1.81l.91-3.06l-2.53-1.94L12.44 4l1.06-3l1.06 3l3.19.09m3.5 6.91l-1.64 1.25l.59 1.98l-1.7-1.17l-1.7 1.17l.59-1.98L15.75 11l2.06-.05L18.5 9l.69 1.95l2.06.05m-2.28 4.95c.83-.08 1.72 1.1 1.19 1.85c-.32.45-.66.87-1.08 1.27C15.17 23 8.84 23 4.94 19.07c-3.91-3.9-3.91-10.24 0-14.14c.4-.4.82-.76 1.27-1.08c.75-.53 1.93.36 1.85 1.19c-.27 2.86.69 5.83 2.89 8.02a9.96 9.96 0 0 0 8.02 2.89m-1.64 2.02a12.08 12.08 0 0 1-7.8-3.47c-2.17-2.19-3.33-5-3.49-7.82c-2.81 3.14-2.7 7.96.31 10.98c3.02 3.01 7.84 3.12 10.98.31Z"
                  ></path>
                </svg>
              </div>
              <div className="sidebar-toggler  x">
                <a href="#" className="sidebar-hide d-xl-none d-block">
                  <i className="bi bi-x bi-middle" />
                </a>
              </div>
            </div>
          </div>
          <div className="sidebar-menu">
            <ul className="menu">
              <li className="sidebar-title">Menu</li>
              <li className="sidebar-item active ">
                <Link href="/" className="sidebar-link">
                  <i className="bi bi-grid-fill" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="sidebar-item  ">
                <Link className="sidebar-link" href="/about">
                  <i className="bi bi-grid-fill" />
                  <span>About</span>
                </Link>
              </li>


            </ul>
          </div>
        </div>
      </div>
      <div id="main">
        <header className="mb-3">
          <a href="#" className="burger-btn d-block d-xl-none">
            <i className="bi bi-justify fs-3" />
          </a>
        </header>
        <div className="page-heading">
          <h3>Profile Statistics</h3>
        </div>
        <div className="page-content">
          <section className="row">
            <div className="col-12 col-lg-9">
              <div className="row">
                <div className="col-6 col-lg-3 col-md-6">
                  <div className="card">
                    <div className="card-body px-4 py-4-5">
                      <div className="row">
                        <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                          <div className="stats-icon purple mb-2">
                            <i className="iconly-boldShow" />
                          </div>
                        </div>
                        <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                          <h6 className="text-muted font-semibold">
                            Profile Views
                          </h6>
                          <h6 className="font-extrabold mb-0">112.000</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-3 col-md-6">
                  <div className="card">
                    <div className="card-body px-4 py-4-5">
                      <div className="row">
                        <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                          <div className="stats-icon blue mb-2">
                            <i className="iconly-boldProfile" />
                          </div>
                        </div>
                        <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                          <h6 className="text-muted font-semibold">Followers</h6>
                          <h6 className="font-extrabold mb-0">183.000</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-3 col-md-6">
                  <div className="card">
                    <div className="card-body px-4 py-4-5">
                      <div className="row">
                        <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                          <div className="stats-icon green mb-2">
                            <i className="iconly-boldAdd-User" />
                          </div>
                        </div>
                        <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                          <h6 className="text-muted font-semibold">Following</h6>
                          <h6 className="font-extrabold mb-0">80.000</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-3 col-md-6">
                  <div className="card">
                    <div className="card-body px-4 py-4-5">
                      <div className="row">
                        <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                          <div className="stats-icon red mb-2">
                            <i className="iconly-boldBookmark" />
                          </div>
                        </div>
                        <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                          <h6 className="text-muted font-semibold">Saved Post</h6>
                          <h6 className="font-extrabold mb-0">112</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4>Profile Visit</h4>
                    </div>
                    <div className="card-body">
                      <div id="chart-profile-visit" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-xl-4">
                  <div className="card">
                    <div className="card-header">
                      <h4>Profile Visit</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-7">
                          <div className="d-flex align-items-center">
                            <svg
                              className="bi text-primary"
                              width={32}
                              height={32}
                              fill="blue"
                              style={{ width: 10 }}
                            >
                              <use xlinkHref="assets/static/images/bootstrap-icons.svg#circle-fill" />
                            </svg>
                            <h5 className="mb-0 ms-3">Europe</h5>
                          </div>
                        </div>
                        <div className="col-5">
                          <h5 className="mb-0 text-end">862</h5>
                        </div>
                        <div className="col-12">
                          <div id="chart-europe" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-7">
                          <div className="d-flex align-items-center">
                            <svg
                              className="bi text-success"
                              width={32}
                              height={32}
                              fill="blue"
                              style={{ width: 10 }}
                            >
                              <use xlinkHref="assets/static/images/bootstrap-icons.svg#circle-fill" />
                            </svg>
                            <h5 className="mb-0 ms-3">America</h5>
                          </div>
                        </div>
                        <div className="col-5">
                          <h5 className="mb-0 text-end">375</h5>
                        </div>
                        <div className="col-12">
                          <div id="chart-america" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-7">
                          <div className="d-flex align-items-center">
                            <svg
                              className="bi text-success"
                              width={32}
                              height={32}
                              fill="blue"
                              style={{ width: 10 }}
                            >
                              <use xlinkHref="assets/static/images/bootstrap-icons.svg#circle-fill" />
                            </svg>
                            <h5 className="mb-0 ms-3">India</h5>
                          </div>
                        </div>
                        <div className="col-5">
                          <h5 className="mb-0 text-end">625</h5>
                        </div>
                        <div className="col-12">
                          <div id="chart-india" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-7">
                          <div className="d-flex align-items-center">
                            <svg
                              className="bi text-danger"
                              width={32}
                              height={32}
                              fill="blue"
                              style={{ width: 10 }}
                            >
                              <use xlinkHref="assets/static/images/bootstrap-icons.svg#circle-fill" />
                            </svg>
                            <h5 className="mb-0 ms-3">Indonesia</h5>
                          </div>
                        </div>
                        <div className="col-5">
                          <h5 className="mb-0 text-end">1025</h5>
                        </div>
                        <div className="col-12">
                          <div id="chart-indonesia" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xl-8">
                  <div className="card">
                    <div className="card-header">
                      <h4>Latest Comments</h4>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover table-lg">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Comment</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="col-3">
                                <div className="d-flex align-items-center">
                                  <div className="avatar avatar-md">
                                    <img src="./assets/compiled/jpg/5.jpg" />
                                  </div>
                                  <p className="font-bold ms-3 mb-0">Si Cantik</p>
                                </div>
                              </td>
                              <td className="col-auto">
                                <p className=" mb-0">
                                  Congratulations on your graduation!
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td className="col-3">
                                <div className="d-flex align-items-center">
                                  <div className="avatar avatar-md">
                                    <img src="./assets/compiled/jpg/2.jpg" />
                                  </div>
                                  <p className="font-bold ms-3 mb-0">Si Ganteng</p>
                                </div>
                              </td>
                              <td className="col-auto">
                                <p className=" mb-0">
                                  Wow amazing design! Can you make another tutorial
                                  for this design?
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td className="col-3">
                                <div className="d-flex align-items-center">
                                  <div className="avatar avatar-md">
                                    <img src="./assets/compiled/jpg/8.jpg" />
                                  </div>
                                  <p className="font-bold ms-3 mb-0">
                                    Singh Eknoor
                                  </p>
                                </div>
                              </td>
                              <td className="col-auto">
                                <p className=" mb-0">
                                  What a stunning design! You are so talented and
                                  creative!
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td className="col-3">
                                <div className="d-flex align-items-center">
                                  <div className="avatar avatar-md">
                                    <img src="./assets/compiled/jpg/3.jpg" />
                                  </div>
                                  <p className="font-bold ms-3 mb-0">Rani Jhadav</p>
                                </div>
                              </td>
                              <td className="col-auto">
                                <p className=" mb-0">
                                  I love your design! It’s so beautiful and unique!
                                  How did you learn to do this?
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="card">
                <div className="card-body py-4 px-4">
                  <div className="d-flex align-items-center">
                    <div className="avatar avatar-xl">
                      <img src="./assets/compiled/jpg/1.jpg" alt="Face 1" />
                    </div>
                    <div className="ms-3 name">
                      <h5 className="font-bold">John Duck</h5>
                      <h6 className="text-muted mb-0">@johnducky</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <h4>Recent Messages</h4>
                </div>
                <div className="card-content pb-4">
                  <div className="recent-message d-flex px-4 py-3">
                    <div className="avatar avatar-lg">
                      <img src="./assets/compiled/jpg/4.jpg" />
                    </div>
                    <div className="name ms-4">
                      <h5 className="mb-1">Hank Schrader</h5>
                      <h6 className="text-muted mb-0">@johnducky</h6>
                    </div>
                  </div>
                  <div className="recent-message d-flex px-4 py-3">
                    <div className="avatar avatar-lg">
                      <img src="./assets/compiled/jpg/5.jpg" />
                    </div>
                    <div className="name ms-4">
                      <h5 className="mb-1">Dean Winchester</h5>
                      <h6 className="text-muted mb-0">@imdean</h6>
                    </div>
                  </div>
                  <div className="recent-message d-flex px-4 py-3">
                    <div className="avatar avatar-lg">
                      <img src="./assets/compiled/jpg/1.jpg" />
                    </div>
                    <div className="name ms-4">
                      <h5 className="mb-1">John Dodol</h5>
                      <h6 className="text-muted mb-0">@dodoljohn</h6>
                    </div>
                  </div>
                  <div className="px-4">
                    <button className="btn btn-block btn-xl btn-outline-primary font-bold mt-3">
                      Start Conversation
                    </button>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <h4>Visitors Profile</h4>
                </div>
                <div className="card-body">
                  <div id="chart-visitors-profile" />
                </div>
              </div>
            </div>
          </section>
        </div>
        <footer>
          <div className="footer clearfix mb-0 text-muted">
            <div className="float-start">
              <p>2023 © Mazer</p>
            </div>
            <div className="float-end">
              <p>
                Crafted with{" "}
                <span className="text-danger">
                  <i className="bi bi-heart-fill icon-mid" />
                </span>
                by <a href="https://saugi.me">Saugi</a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>

  );
}
