import React from 'react';
import './social-icons.css';

// Imports array of social icon data
import { socialIcons  } from "@/data/data";

function SocialIcons() {
  return (
    <>
      {/* Maps over socialIcons array to render each icon as a link */}
      {socialIcons.map(icon => (
        <a 
          href={icon.link} 
          key={icon.id} 
          target='_blank' 
          rel="noopener noreferrer" // Adds security for external links
          className='mx-2' // Adds margin spacing between icons
        >
          {/* Renders the icon using its CSS class */}
          <span className={icon.icon}></span> 
        </a>
      ))}
    </>
  )
}

export default SocialIcons