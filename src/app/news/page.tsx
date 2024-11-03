'use client'; // Enable client-side rendering for this component

import NewsItemOne from '@/components/NewsItemOne'; // Import NewsItemOne component for rendering individual news items
import PageTitle from '@/components/PageTitle'; // Import PageTitle component for displaying the section title
import Preloader from '@/components/Preloader'; // Import Preloader component to display a loading animation
import { NewsItemType } from '@/sections/News'; // Import NewsItemType for type consistency
import React, { useEffect, useState } from 'react'; // Import React, useEffect, and useState for component state and lifecycle handling

// Main functional component to render the news items page
export default function page() {
  // State to store fetched news items
  const [items, setItems] = useState([]);

  // Function to fetch news items from the API
  const getItemsData = () => {
    fetch(`/api/news/`) // Fetch request to retrieve news items
    .then(res => res.json()) // Parse JSON response
    .then(data => setItems(data)) // Update items state with fetched data
    .catch(e => console.log(e.message)); // Log any errors in the fetch request
  }

  // useEffect hook to fetch news items on component mount and when items change
  useEffect(() => {
    getItemsData();
  }, []);

  // Render page content
  return (
    <main id="main" className="posts">
      <div className="container">
        <div className="row">
          <PageTitle title='Latest News' /> {/* Display page title */}
          
          {/* Conditional rendering of news items or Preloader */}
          {items && items.length > 0 ? 
            items.map((item: NewsItemType) => (
              <div className="col-lg-3 col-md-6" key={item._id}> {/* Grid layout for each news item */}
                <NewsItemOne large={false} item={item} /> {/* Render individual news item */}
              </div>
            )) 
            : <Preloader /> // Display Preloader if items are not loaded yet
          }
        </div>
      </div>
    </main>
  );
}
