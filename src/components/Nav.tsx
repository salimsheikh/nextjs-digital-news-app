import React from 'react';
import {navs} from '@/data/data'
import './nav.css';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav id="nabbar" className='navbar'>
      <ul>
        {navs.map((nav)=>(
          <li key={nav.id}>
            <Link href={nav.link}>
              {nav.name === 'Home' ? <i className='bi bi-house-door-fill'></i> : nav.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
