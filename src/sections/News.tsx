'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './news.css';

import NewsItemOne from '@/components/NewsItemOne';

// Type definition for a News item
export type NewsItemType = {
    _id: string;
    img: string;
    category: string;
    date: string;
    title: string;
    brief: string;
    avatar: string;
    author: string;
};

// Main News component - fetches and displays a list of news items
export default function News() {
    const router = useRouter(); // Initializes router for navigation
    const [items, setItems] = useState<any | []>([]); // State for storing fetched news items
    const [item, setItem] = useState<null | NewsItemType>(null); // State for storing a single featured news item

    // Fetches all news items from the API
    const getItemsData = () => {
        fetch(`/api/newsitems`)
            .then(res => res.json())
            .then(data => setItems(data)) // Sets the fetched news items to state
            .catch(e => console.log("message: " + e.message)); // Logs any errors
    };

    // Fetches a single news item by ID and sets it to the `item` state
    const getSingleNewsItemData = (id: string) => {
        fetch(`/api/newsitems/${id}`)
            .then(res => {
                if (res.status == 404) { // Checks if item is not found
                    router.push('/not-found'); // Redirects to a 'not-found' page if the item is missing
                }
                return res.json();
            })
            .then(data => setItem(data)) // Sets the fetched news item to state
            .catch(e => console.log(e.message)); // Logs any errors
    };

    // useEffect to fetch data when the component mounts
    useEffect(() => {
        getItemsData(); // Fetches all news items
        getSingleNewsItemData('672636112d6724d9fb7b445c'); // Fetches a single featured news item by ID
    }, []);

    return (
        <section id="news" className="posts">
            <div key="news-container" className="container" data-aos='fade-up'>
                <div className="row g-5">
                    {/* Left column displaying a large featured news item */}
                    <div className="col-lg-4">
                        {/* Displays the single featured item if available */}
                        {item && <NewsItemOne large={true} item={item} />}
                    </div>

                    {/* Right column displaying a grid of smaller news items */}
                    <div className="col-lg-8">
                        <div className="row g-5">
                            <div className="col-lg-4 border-start custom-border">
                                {/* Maps through news items array and displays each item */}
                                {/* Smaller news items */ }
                                {items && items.length > 0 && items.map((item: NewsItemType) => (
                                    <NewsItemOne key={item._id} large={false} item={item} /> 
                                ))}
                            </div>
                            <div className="col-lg-4"></div>
                            <div className="col-lg-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
