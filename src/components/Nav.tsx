import React, { useEffect, useState } from 'react';
import './nav.css';
import Link from 'next/link';

// Imports navigation links data
import { navs } from '@/data/data';
import { useAuth } from '@/hooks/useAuth';


export default function Nav() {  
  return (
    <nav id="nabbar" className='navbar'>
      <ul>
        {/* Maps over navs array to create each navigation link */}
        {navs.map((nav) => (
          <li key={nav.id}> {/* Ensures unique key for each nav item */}
            <Link href={nav.link}>
              {/* Conditionally renders an icon for the 'Home' link, otherwise displays the nav name */}
              {nav.name === 'Home' ? <i className='bi bi-house-door-fill'></i> : nav.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
