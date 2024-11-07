'use client'


import { useAuth } from "@/lib/hooks/auth"; // Hook untuk autentikasi




export default function Home() {
  const { user, logout } = useAuth({ middleware: 'admin' })


  return (
    <>
      <header className="mb-3">
        <a href="#" className="burger-btn d-block d-xl-none">
          <i className="bi bi-justify fs-3" />
        </a>
      </header>
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h3>Home</h3>
            
          </div>
        </div>
      </div>

    </>
    )
}




