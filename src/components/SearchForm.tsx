'use client';

import React from 'react';
import './searchForm.css';

export default function SearchForm({ active, formOpen }: { active: boolean, formOpen: object | any }) {
  return (
    <div className={`search-form-wrap js-search-form-wrap ${active ? 'active' : ''}`}>
      {/* Search Form Container - conditional class 'active' is applied based on 'active' prop */}
      <form className="search-form">
        <span className='icon bi-search'></span> {/* Search Icon */}
        
        {/* Search Input Field */}
        <input 
          type="text" 
          className="form-control" 
          placeholder='Search' // Placeholder text for the input
        />

        {/* Close Button */}
        <button className='btn js-search-close' onClick={formOpen}>
          <span className="bi-x"></span> {/* Close Icon */}
        </button>
      </form>
    </div>
  )
}
