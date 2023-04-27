import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer>
        <p>Copyright {new Date().getFullYear()} Tour Iceland</p>
        <a>Terms & Conditions</a>
    </footer>
  )
}
