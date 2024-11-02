import { NewsItemType } from '@/sections/News'
import { Span } from 'next/dist/trace'
import Link from 'next/link'
import React from 'react'

export default function SideNewsItem({item} : {item: NewsItemType}) {
  return (
    <div className="post-entry-1 border-bottom">
        <div className="post-meta">
            <span className="date">{item.category}</span>
            <span className="max-1">
                <i className="bi bi-dot"></i>
            </span>
            <span className="date">{ new Date(item.date).toLocaleDateString('en-us')}</span>
        </div>
        <h2 className="mb-2">
            <Link href={`/newsitems/${item._id}`}>{item.title}</Link>
        </h2>
        {item.author && <span className='author mb-3 d-block'>{item.author}</span>}
    </div>
  )
}
