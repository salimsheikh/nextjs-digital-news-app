import React from 'react'
import './style.css'
import PageTitle from '@/components/PageTitle'

export default function page() {
  return (
    <main id="main" className="posts">
      <div className="container">
        <div className="row">
          <PageTitle title='About' /> {/* Display page title */} 
        </div>
      </div>
    </main>
  )
}
