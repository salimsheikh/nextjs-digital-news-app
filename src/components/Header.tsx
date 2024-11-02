'use client'

import React, { useState } from 'react'

import './header.css';
import Nav from './Nav';
import SocialIcons from './SocialIcons';
import SearchForm from './SearchForm';


export default function Header() {

   // State to manage search form visibility
  const [open, setOpen] = useState(false);

  // State to manage mobile navigation menu toggle
  const [on, setOn] = useState(false);

  // Handles toggling the search form visibility
  const handleFormOpen = (e: Event | any) => {
    e.preventDefault();
    setOpen(!open);
  }

  // Handles toggling the mobile navigation menu
  const handleToggleMenu = () => {
    setOn(!on);// Toggles the mobile menu icon (open/close)
    let body:  HTMLElement | any = document.querySelector('body');
    body.classList.toggle('mobile-nav-active');// Adds/removes class to control body style during mobile nav active state
  }

  return (
    <header id="header" className='header d-flex align-items-center fixed-top'>
      <div className="container-fluid container-xl d-flex align-item-center justify-content-between">
         {/* Logo Section */}
        <a href="/" className='logo d-flex align-item-center'>

          {/* Placeholder for Logo Image */}
          {/* <img src="" alt="" /> */}
          <h1>DigitalNews</h1>
        </a>

        {/* Navigation Links */}
        <Nav />

        {/* Social Icons, Search, and Mobile Menu Toggle */}
        <div className="position-relative">

          {/* Renders social media icons */}
          <SocialIcons />

           {/* Search Icon - Opens search form on click */}
          <a href="#" className="mx-2 js-search-open" onClick={handleFormOpen}>
            <span className="bi-search"></span>
          </a>

          {/* Mobile Menu Toggle Icon */}
          {on ? (
            <i className="bi bi-x mobile-nav-toggle" onClick={handleToggleMenu}></i>
          ) : (
            <i className="bi bi-list mobile-nav-toggle" onClick={handleToggleMenu}></i>
          )}

          {/* Search Form Component - Controlled by 'open' state */}
          <SearchForm active={open} formOpen={handleFormOpen} />
          
        </div>
      </div>
    </header>
  )
}
