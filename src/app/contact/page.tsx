import PageTitle from '@/components/PageTitle'
import React from 'react'
import './style.css'

export default function page() {
  return (
    <main id="main" className="posts">
      <div className="container">
        <div className="row">
          <PageTitle title='Contact' /> {/* Display page title */} 
        </div>
      </div>
    </main>
  )
}
