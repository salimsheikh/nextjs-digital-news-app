import Link from 'next/link'; // Link component for navigation between pages
import React from 'react';
import './postItemOne.css';

// Type definition for News Item
import { NewsItemType } from '@/sections/News'; // Assuming NewsItemType is exported from a News.tsx file

// Component to render a single news item with layout variations
export default function NewsItemOne({ large, item }: {
    large: Boolean, // Determines if the item is displayed in large format
    item: NewsItemType // Consistent type for the news item data
}) {
  return (
    <div className={`post-entry-1 ${large ? 'lg' : ''}`}>
        {/* Link to individual news item page */}
        <Link href={`newsitems/${item._id}`}>
            <img src={`/${item.img}`} alt='' className='img-fluid' /> {/* News item image */}
        </Link>

        {/* Metadata section: category and date */}
        <div className="post-meta">
            <span className="date">{item.category}</span>
            <span className="mx-1">
                <i className="bi bi-dot"></i>{ ' '}
            </span>{ ' '}
            <span>{new Date(item.date).toLocaleDateString('en-US')}</span> {/* Format date */}
        </div>

        {/* Title of the news item */}
        <h2>
            <Link href={`newsitems/${item._id}`}>{item.title}</Link>
        </h2>

        {/* Conditional rendering for large format items */}
        {large ? (
            <>
                {/* Brief summary for large news items */}
                <p className="mb-4 d-block">{item.brief}</p>
                
                {/* Author details */}
                <div className="d-flex align-items-center author">
                    <div className="photo">
                        <img src={item.avatar} alt="" className='img-fluid' /> {/* Author's avatar */}
                    </div>
                    <div className="name">
                        <h3 className="m-0 p-0">{item.author}</h3> {/* Author's name */}
                    </div>
                </div>
            </>
        ) : null}
    </div>
  );
}
