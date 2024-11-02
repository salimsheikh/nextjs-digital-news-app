'use client';

import { initialNewsItemData, NewsItemType } from '@/sections/News';
import React, { useEffect, useState } from 'react'

import './style.css';
import SingleNewsContent from './SingleNewsContent';
import Preloader from '@/components/Preloader';
import SideNewsItem from '@/components/SideNewsItem';


type Params = {
    id: string;
};

interface MyPageProps {
    params: Promise<Params>;
}

export default function page({ params }: MyPageProps) {

    // const id: string = params.id;
    const { id } = React.use(params); // Unwrap params with React.use

    const [item, setItem] = useState(initialNewsItemData);
    const [items, setItems] = useState([]);

    const tabsData = [
        { id: 1, name: 'Popular', active: true },
        { id: 2, name: 'Trending', active: false }
    ];

    const [tabs, setTabs] = useState(tabsData);

    const handleTabActive = (id: number) => {
        setTabs(
            tabsData.map(tab => {
                tab.active = id === tab.id ? true : false;
                return tab;
            })
        );
    }

    // Fetches all news items from the API
    const getItemsData = () => {
        fetch(`/api/newsitems`)
            .then(res => res.json())
            .then(data => setItems(data)) // Sets the fetched news items to state
            .catch(e => console.log("message: " + e.message)); // Logs any errors
    };

    const getSingleNewsData = () => {
        fetch(`/api/newsitems/${id}`)
            .then(res => res.json())
            .then(data => setItem(data))
            .catch(e => console.log(e.message));
    }

    useEffect(() => {
        getSingleNewsData();
        getItemsData();
    }, [item])

    return (
        <main id="main">
            <section className="single-post-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9 post-content">
                            {item && item.title != '' ? <SingleNewsContent item={item} /> : <Preloader />}
                        </div>
                        <div className="col-md-3">
                            <div className="aside-block">
                                <ul className="nav nav-pills custom-tab-nav mb-4">
                                    {tabs.map(tab => (
                                        <li className="nav-item" key={tab.id}>
                                            <button className={`nav-link ${tab.active ? 'active' : ''}`} onClick={() => handleTabActive(tab.id)}>{tab.name}</button>
                                        </li>
                                    ))}
                                </ul>
                                <div className="tab-content">
                                    <div className={`tab-pane fade ${tabs[0].active ? 'show active' : ''}`}>
                                        {items && items.length > 0 &&
                                            items.slice(0, 6).map((item: NewsItemType) => (
                                                <SideNewsItem key={item._id} item={item} />
                                            ))}
                                    </div>
                                    <div className={`tab-pane fade ${tabs[1].active ? 'show active' : ''}`}>
                                        {items && items.length > 0 &&
                                           // Filter items to only show those marked as trending
                                           items.filter((item: { trending: Boolean }) => item.trending)
                                           // Limit the list to the first 6 trending items
                                           .slice(0, 6)
                                           // Map through the trending items to render each one as a <TrendingNews /> component
                                           .map((item: NewsItemType) => (
                                                <SideNewsItem key={item._id} item={item} />
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
