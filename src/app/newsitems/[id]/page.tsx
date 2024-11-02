'use client';

import { initialNewsItemData } from '@/sections/News';
import React, { useEffect, useState } from 'react'

import './style.css';
import Image from 'next/image';

export default function page({ params }: { params: { id: string } }) {

    const id: string = params.id;

    const [item, setItem] = useState(initialNewsItemData);
    const [loading, setLoading] = useState(true);

    const getSingleNewsData = () => {
        fetch(`/api/newsitems/${id}`)
            .then(res => res.json())
            .then(data => setItem(data))
            .catch(e => console.log(e.message));
    }

    useEffect(() => {
        getSingleNewsData();
    }, [item])

    return (
        <main id="main">
            <section className="single-post-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9 post-content">
                            <div className="single-post">
                                <div className="post-meta">
                                    <span className="date">{item.category}</span>
                                    <span className="max-1">
                                        <i className="bi bi-dot"></i>
                                    </span>
                                    <span className="date">{new Date(item.date).toLocaleDateString('en-us')}</span>
                                </div>
                                <h1 className='mb-5'>{item.title}</h1>
                                <p>
                                    <span className="firstcharacter">
                                        {item.brief && item.brief.charAt(0)}
                                    </span>
                                    {item.brief && item.brief.substring(1)}
                                </p>

                                <p>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero temporibus repudiandae, inventore pariatur numquam cumque possimus exercitationem? Nihil tempore odit ab minus eveniet praesentium, similique blanditiis molestiae ut saepe perspiciatis officia nemo, eos quae cumque. Accusamus fugiat architecto rerum animi atque eveniet, quo, praesentium dignissimos
                                </p>

                                <figure className="my-4">
                                    <Image src={`/${item.img}`} alt="" className='img-fluid' width={100} height={100} layout='responsive' priority />
                                    {/* <img src={`/${item.img}`} alt="" className='img-fluid' /> */}
                                    <figcaption>
                                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                    </figcaption>
                                </figure>


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
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero temporibus repudiandae, inventore pariatur numquam cumque possimus exercitationem? Nihil tempore odit ab minus eveniet praesentium, similique blanditiis molestiae ut saepe perspiciatis officia nemo, eos quae cumque. Accusamus fugiat architecto rerum animi atque eveniet, quo, praesentium dignissimos
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
