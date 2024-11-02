'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './news.css';

import NewsItemOne from '@/components/NewsItemOne';

export default function News() {
    const router = useRouter();   
    const [item, setItem] = useState<null | {
        _id: string;
        img: string;
        category: string;
        date: string;
        title: string;
        brief: string;
        avatar: string;
        author: string;
    }>(null);

    const getSingleNewsItemData = (id: string) => {
        fetch(`/api/newsitems/${id}`)
            .then(res => {
                if (res.status === 404) {
                    router.push('/not-found');
                }
                return res.json();
            })
            .then(data => setItem(data))
            .catch(e => console.log(e.message));
    };

    useEffect(() => {        
        getSingleNewsItemData('672636112d6724d9fb7b445c');
    }, []);

    return (
        <section id="news" className="posts">
            <div key="news-container" className="container" data-aos='fade-up'>
                <div className="row g-5">
                    <div className="col-lg-4">
                        {item && <NewsItemOne large={true} item={item} />}
                    </div>
                    <div className="col-lg-8">
                        <div className="row g-5">
                            <div className="col-lg-4 border-start custom-border"></div>
                            <div className="col-lg-4"></div>
                            <div className="col-lg-4"></div>
                        </div>
                    </div>
                </div>                
            </div>
        </section>
    );
};
