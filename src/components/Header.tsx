'use client'

import React, {useState} from 'react'

import './header.css';
import Nav from './Nav';
import SocialIcons from './SocialIcons';
import SearchForm from './SearchForm';


export default function Header() {

  const [open, setOpen] = useState(false);

  const handleFormOpen = (e: Event | any) => {

    e.preventDefault();
    setOpen(!open);

  }
  return (
    <header id="header" className='header d-flex align-items-center fixed-top'>
        <div className="container-fluid container-xl d-flex align-item-center justify-content-between">
            <a href="/" className='logo d-flex align-item-center'>
              {/* <img src="" alt="" /> */}
              <h1>DigitalNews</h1>
            </a>
            <Nav />
            <div className="position-relative">
              <SocialIcons />
              <a href="#" className="mx-2 js-search-open" onClick={handleFormOpen}>
                <span className="bi-search"></span>
              </a>
              <SearchForm active={open} formOpen={handleFormOpen} />
            </div>
        </div>
    </header>
  )
}
