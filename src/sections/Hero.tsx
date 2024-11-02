'use client'

import React, { useEffect } from 'react';

import { heroSlides } from '@/data/data'; // Imports hero slide data
import './hero.css';

// Import AOS (Animate On Scroll)
import AOS from 'aos';

// Import Swiper React Components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required Swiper modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import HeroSlide from '@/components/HeroSlide';

export default function Hero() {
  // Initializes AOS for scroll animations
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: 'ease-in-out', // Easing effect
      once: false, // Animation will occur every time the element is scrolled into view
      mirror: false, // Animation will not trigger on scroll up
    });
  }, []);

  return (
    <section id="hero-slider" className="hero-slider">
      <div className="container-md" data-aos="fade-in"> {/* AOS fade-in effect */}
        <div className="row">
          <div className="col-12">
            {/* Swiper Carousel */}
            <Swiper
              slidesPerView={'auto'}
              speed={2500} // Carousel transition speed
              autoplay={{
                delay: 300, // Delay between autoplay transitions
                disableOnInteraction: false, // Continues autoplay after user interaction
              }}
              pagination={{
                el: '.swiper-pagination', // Target element for pagination
                type: 'bullets',
                clickable: true, // Allows bullet pagination to be clickable
              }}
              navigation={{
                nextEl: '.custom-swiper-button-next', // Custom next button element
                prevEl: '.custom-swiper-button-prev', // Custom prev button element
              }}
              modules={[Autoplay, Pagination, Navigation]} // Swiper modules for autoplay, pagination, and navigation
              loop={true} // Enables continuous loop mode
              className='sliderFeaturePosts'
            >
              {/* Maps over heroSlides array to render each slide */}
              {heroSlides.map(slide => (
                <SwiperSlide key={slide.id}>
                  {/* Renders each slide using the HeroSlide component */}
                  <HeroSlide slide={slide} />
                </SwiperSlide>
              ))}

              {/* Custom Swiper Navigation Buttons */}
              <div className="custom-swiper-button-next">
                <span className="bi bi-chevron-right"></span>
              </div>
              <div className="custom-swiper-button-prev">
                <span className="bi bi-chevron-left"></span>
              </div>
              <div className="swiper-pagination"></div> {/* Swiper pagination bullets */}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}