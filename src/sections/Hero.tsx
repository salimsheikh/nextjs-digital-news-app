'use client'

import React, {useEffect} from 'react'

import { heroSlides} from '@/data/data';
import './hero.css';

//import ASO
import AOS  from 'aos';

//Import Swiper React Components
import {Swiper, SwiperSlide} from 'swiper/react';

//Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

//import  required modules
import { Autoplay, Pagination, Navigation} from 'swiper/modules';

export default function Hero() {
  useEffect(() =>{
    AOS.init({
      duration:1000,
      easing: 'ease-in-out',
      once: false,
      mirror: false,
    });
  },[]);

  return (
    <section id="hero-slider" className="hero-slider">
      <div className="container-md" data-aos="fade-in">
        <div className="row">
          <div className="col-12">
            <Swiper>
              {heroSlides.map(slide => (
                <SwiperSlide key={slide.id}>
                  {/* include customized hero template */}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  )
}
