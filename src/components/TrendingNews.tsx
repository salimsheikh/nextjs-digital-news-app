import React from 'react'; // Import React for component creation
import './trending.css'; // Import CSS for trending news styling

// Importing NewsItemType type definition for type consistency
import { NewsItemType } from '@/sections/News'; // Assuming NewsItemType is exported from the News.tsx file
import Link from 'next/link'; // Import Link for internal routing

// Component to render a single trending news item
export default function TrendingNews({ item, index }: {
    item: NewsItemType, // Type definition for the news item data
    index: number // Index for numbering each trending news item
}) {
    return (
        <li>
            {/* Link each trending item to its detailed page based on the item’s ID */}
            <Link href={`/news/${item._id}`}>
                {/* Display index as item ranking, incremented by 1 for 1-based numbering */}
                <span className='number'>{index + 1}</span> 
                
                {/* Render the title of the news item */}
                <h3>{item.title}</h3>

                {/* Display the author’s name below the title */}
                <span className="author">{item.author}</span>
            </Link>
        </li>
    );
}
