import React from 'react';
import './social-icons.css';
import { socialIcons  } from "@/data/data";


function SocialIcons() {
  return (
    <>   
    {socialIcons.map(icon => (
        <a href={icon.link} key={icon.id} target='_blank' className='mx-2'>
            <span className={icon.icon}></span>
        </a>
    ))}
    </>
  )
}

export default SocialIcons