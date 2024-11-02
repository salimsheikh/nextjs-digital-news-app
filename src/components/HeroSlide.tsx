import React from 'react';

export default function HeroSlide({ slide }: { slide: { bgImg: string, title: string, brief: string } }) {
  return (
    <a 
      href="" 
      className='img-bg d-flex align-items-end' 
      style={{ backgroundImage: `url(/${slide.bgImg})` }} // Sets background image from slide data
    >
      <div className="img-bg-inner">
        {/* Slide Title */}
        <h2>{slide.title}</h2> 
        
        {/* Slide Brief Description */}
        <p>{slide.brief}</p> 
      </div>
    </a>
  );
}
