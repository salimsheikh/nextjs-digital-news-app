import React from 'react'
import './trending.css';

// Type definition for News Item
import { NewsItemType } from '@/sections/News'; // Assuming NewsItemType is exported from a News.tsx file
import Link from 'next/link';

export default function TrendingNews({ item, index }: {
    item: NewsItemType // Consistent type for the news item data
    index: number
}) {
    return (
        <li>
            <Link href={`/newsitem/${item._id}`}>
                <span className='number'>{index + 1}</span>
                <h3>{item.title}</h3>
                <span className="author">{item.author}</span>
            </Link>
        </li>
    );
}
