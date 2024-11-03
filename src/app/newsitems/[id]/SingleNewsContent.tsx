import { NewsItemType } from '@/sections/News'
import React from 'react'

// Component to display the detailed content of a single news item
export default function SingleNewsContent({ item }: { item: NewsItemType }) {
    return (
        <div className="single-post">
             {/* Display metadata for the news post */}
            <div className="post-meta">
                {/* Category of the post */}
                <span className="date">{item.category}</span>
                 {/* Separator icon */}
                <span className="max-1">
                    <i className="bi bi-dot"></i>
                </span>
                 {/* Date formatted to 'en-US' style */}
                <span className="date">{new Date(item.date).toLocaleDateString('en-us')}</span>
            </div>
             {/* Main title of the news post */}
            <h1 className='mb-5'>{item.title}</h1>

            {/* Brief description with stylized first character */}
            <p>
                <span className="firstcharacter">
                    {/* Show only the first character of the brief if available */}
                    {item.brief && item.brief.charAt(0)}
                </span>
                 {/* Remaining content of the brief */}
                {item.brief && item.brief.substring(1)}
            </p>

             {/* Example placeholder text */}
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero temporibus repudiandae, inventore pariatur numquam cumque possimus exercitationem? Nihil tempore odit ab minus eveniet praesentium, similique blanditiis molestiae ut saepe perspiciatis officia nemo, eos quae cumque. Accusamus fugiat architecto rerum animi atque eveniet, quo, praesentium dignissimos
            </p>

            {/* Image with caption */}
            <figure className="my-4">
                {/* News image; preloading could be added if using Next.js's Image component */}
                {/* <Image src={`/${item.img}`} alt="" className='img-fluid' width={100} height={100} layout='responsive' priority /> */}
                <img src={`/${item.img}`} alt="" className='img-fluid' />
                <figcaption>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </figcaption>
            </figure>

             {/* Example placeholder paragraphs for content continuation */}
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero temporibus repudiandae, inventore pariatur numquam cumque possimus exercitationem? Nihil tempore odit ab minus eveniet praesentium, similique blanditiis molestiae ut saepe perspiciatis officia nemo, eos quae cumque. Accusamus fugiat architecto rerum animi atque eveniet, quo, praesentium dignissimos
            </p>

            {/* Additional placeholder paragraphs for extended content */}
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero temporibus repudiandae, inventore pariatur numquam cumque possimus exercitationem? Nihil tempore odit ab minus eveniet praesentium, similique blanditiis molestiae ut saepe perspiciatis officia nemo, eos quae cumque. Accusamus fugiat architecto rerum animi atque eveniet, quo, praesentium dignissimos
            </p>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero temporibus repudiandae, inventore pariatur numquam cumque possimus exercitationem? Nihil tempore odit ab minus eveniet praesentium, similique blanditiis molestiae ut saepe perspiciatis officia nemo, eos quae cumque. Accusamus fugiat architecto rerum animi atque eveniet, quo, praesentium dignissimos
            </p>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero temporibus repudiandae, inventore pariatur numquam cumque possimus exercitationem? Nihil tempore odit ab minus eveniet praesentium, similique blanditiis molestiae ut saepe perspiciatis officia nemo, eos quae cumque. Accusamus fugiat architecto rerum animi atque eveniet, quo, praesentium dignissimos
            </p>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero temporibus repudiandae, inventore pariatur numquam cumque possimus exercitationem? Nihil tempore odit ab minus eveniet praesentium, similique blanditiis molestiae ut saepe perspiciatis officia nemo, eos quae cumque. Accusamus fugiat architecto rerum animi atque eveniet, quo, praesentium dignissimos
            </p>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero temporibus repudiandae, inventore pariatur numquam cumque possimus exercitationem? Nihil tempore odit ab minus eveniet praesentium, similique blanditiis molestiae ut saepe perspiciatis officia nemo, eos quae cumque. Accusamus fugiat architecto rerum animi atque eveniet, quo, praesentium dignissimos
            </p>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero temporibus repudiandae, inventore pariatur numquam cumque possimus exercitationem? Nihil tempore odit ab minus eveniet praesentium, similique blanditiis molestiae ut saepe perspiciatis officia nemo, eos quae cumque. Accusamus fugiat architecto rerum animi atque eveniet, quo, praesentium dignissimos
            </p>
        </div>
    )
}
