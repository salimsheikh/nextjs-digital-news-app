'use client';

import NewsItemOne from '@/components/NewsItemOne';
import PageTitle from '@/components/PageTitle';
import Preloader from '@/components/Preloader';
import { NewsItemType } from '@/sections/News';
import React, { useEffect, useState } from 'react'

export default function page() {
  const [items, setItems] = useState([]);

  const getItemsData = () => {
    fetch(`/api/newsitems/`)
    .then(res => res.json())
    .then(data => setItems(data))
    .catch(e => console.log(e.message));
  }

  useEffect(() => {
    getItemsData();
  },[items]);

  return (
    <main id="main" className="posts">
      <div className="container">
        <div className="row">
          <PageTitle title='Latest News' />
          {items && items.length > 0 ?
          items.map((item: NewsItemType) => (
            <div className="col-lg-3 col-md-6" key={item._id}>
              <NewsItemOne large={false} item={item} />
            </div>
          )) : <Preloader />
          }
        </div>
      </div>
    </main>
  )
}
