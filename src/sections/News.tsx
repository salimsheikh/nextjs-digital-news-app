'use client';

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import './news.css';

import { news } from '@/data/data'
import NewsItemOne from '@/components/NewsItemOne';

export default function News() {
    const router = useRouter();
    const [items, setItems] = useState<any | []>([]);

    const getItemsData = () => {
        fetch(`/api/newsitems`)
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(e => console.log("message: " + e.message));
    }

    useEffect(() => {
        // getItemsData();
        setItems(news)
    }, [items]);

    //getItemsData();
    return (
        <section id="news" className="posts">
            <div key="news-container" className="container" data-aos='fade-up'>
                {items && items.length > 0 && items.map((item: {
                    item: {
                        _id: string,
                        img: string,
                        category: string,
                        date: string,
                        title: string,
                        brief: string,
                        avatar: string,
                        author: string
                    }
                }) => (
                    <NewsItemOne key={item.id} large={false} item={item} />
                ))}
            </div>
        </section>
    );
};
