import React from 'react'; // Import React for component creation
import './pageTitle.css'; // Import CSS for styling the title

// Component to render a page or section title with a consistent style
export default function PageTitle({ title }: { title: string }) {
  return (
    // Render title text in an <h3> element, styled with the 'category-title' class
    <h3 className='category-title'>{title}</h3>
  );
}
