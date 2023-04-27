import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function PublicUI() {
  return (
    <div>
        <nav>

        </nav>

        <Outlet/>
        <Footer />
    </div>
  )
}
