'use client';

import { initialNewsItemData, NewsItemType } from '@/sections/News';
import React, { useEffect, useState } from 'react'

import './style.css';
import SingleNewsContent from './SingleNewsContent';
import Preloader from '@/components/Preloader';
import SideNewsItem from '@/components/SideNewsItem';

// Type definition for route parameters (such as news item ID)
type Params = {
    id: string;
};

// Component props type definition with params as a promise
interface SinglePageProps {
    params: Promise<Params>;
}

// Main component to display a single news post and sidebar news items
export default function page({ params }: SinglePageProps) {

    // Extract the ID from the passed-in params using React.use
    const { id } = React.use(params); // Unwrap params with React.use

    // State to hold the single news item data
    const [item, setItem] = useState(initialNewsItemData);

    // State to hold a list of all news items
    const [items, setItems] = useState([]);

    // Initial tab data for Popular and Trending sections
    const tabsData = [
        { id: 1, name: 'Popular', active: true },
        { id: 2, name: 'Trending', active: false }
    ];

    // State to manage which tab is currently active
    const [tabs, setTabs] = useState(tabsData);

    // Function to toggle active state of tabs
    const handleTabActive = (id: number) => {
        setTabs(
            tabsData.map(tab => {
                tab.active = id === tab.id ? true : false;
                return tab;
            })
        );
    }

    // Function to fetch all news items from the API
    const getItemsData = () => {
        fetch(`/api/news/`)
            .then(res => res.json())
            .then(data => setItems(data)) // Sets the fetched news items to state
            .catch(e => console.log("message: " + e.message)); // Logs any errors
    };

    // Function to fetch a single news item based on the ID parameter
    const getSingleNewsData = () => {
        fetch(`/api/news/${id}`)
            .then(res => res.json())
            .then(data => setItem(data))
            .catch(e => console.log(e.message));
    }

    // useEffect to fetch single news item and all news items when component mounts or when the item state changes
    useEffect(() => {
        console.log("Calling use effect");
        getSingleNewsData();
        getItemsData();
    }, []); // Empty dependency array ensures this only runs once on mount

    return (
        <main id="main">
            <section className="single-post-content">
                <div className="container">
                    <div className="row">
                        {/* Main content area for the single news post */}
                        <div className="col-md-9 post-content">
                            {/* Display SingleNewsContent if the item is loaded; show Preloader otherwise */}
                            {item && item.title != '' ? <SingleNewsContent item={item} /> : <Preloader />}
                        </div>

                        {/* Sidebar section containing Popular and Trending tabs */}
                        <div className="col-md-3">
                            <div className="aside-block">

                                {/* Tab navigation for Popular and Trending sections */}
                                <ul className="nav nav-pills custom-tab-nav mb-4">
                                    {tabs.map(tab => (
                                        <li className="nav-item" key={tab.id}>
                                            <button className={`nav-link ${tab.active ? 'active' : ''}`} onClick={() => handleTabActive(tab.id)}>{tab.name}</button>
                                        </li>
                                    ))}
                                </ul>

                                {/* Tab content area */}
                                <div className="tab-content">
                                    {/* Content for the Popular tab */}
                                    <div className={`tab-pane fade ${tabs[0].active ? 'show active' : ''}`}>
                                        {items && items.length > 0 &&
                                            items.slice(0, 6).map((item: NewsItemType) => (
                                                <SideNewsItem key={item._id} item={item} />
                                            ))
                                        }
                                    </div>

                                    {/* Content for the Trending tab */}
                                    <div className={`tab-pane fade ${tabs[1].active ? 'show active' : ''}`}>
                                        {items && items.length > 0 &&
                                            // Filter items to only show those marked as trending
                                            items.filter((item: { trending: Boolean }) => item.trending)
                                                // Limit the list to the first 6 trending items
                                                .slice(0, 6)
                                                // Map through the trending items to render each one as a <SideNewsItem /> component
                                                .map((item: NewsItemType) => (
                                                    <SideNewsItem key={item._id} item={item} />
                                                ))
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="aside-block">
                                <h3 className="aside-title">Video</h3>
                                <div className="video-post">
                                    <a href="https://www.youtube.com/watch?v=vhvi_ehy65c" target='_blank' className='link-video'>
                                        <span className="bi-play-fill"></span>
                                        <img src="/assets/img/post-landscape-3.jpg" alt="" className="img-fluid" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
