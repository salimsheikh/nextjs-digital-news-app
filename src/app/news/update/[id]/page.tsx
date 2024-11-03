'use client'

import React, { useEffect, useState } from 'react'

// Type definition for route parameters (such as news item ID)
type Params = {
  id: string;
};

// Component props type definition with params as a promise
interface SinglePageProps {
  params: Promise<Params>;
}

// Main component to display a single news post and sidebar news items
export default function EditItem({ params }: SinglePageProps) {

  const initialState = {
    title: '',
    img: '',
    category: '',
    author: '',
    brief: '',
    validate: ''
  };

  // Extract the ID from the passed-in params using React.use
  const { id } = React.use(params); // Unwrap params with React.use

  const [text, setText] = useState(initialState);

  const getSingleNewsData = () => {
    fetch(`/api/news/${id}`)
      .then(res => res.json())
      .then(data => setText(data))
      .catch(e => console.log(e.message))
  }


  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value, validate: '' });
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Simple for validation
    if (text.title === "" || text.img === "" || text.category === "" || text.brief === "") {
      setText({ ...text, validate: 'incomplete' });
      return false;
    }

    setText({ ...text, validate: 'loading' });

    //Sending PUT request
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(text)
      });

      setText({ ...text, validate: 'loading' });

      const result = response.status;

      if (result === 200) {
        setText({ ...text, validate: 'success' });

        console.log('Success', result);
      }
    } catch (error) {
      setText({ ...text, validate: 'error' });

      console.log('Error', error);
    }
  }


  useEffect(() => {
    getSingleNewsData();
  }, []);

  return (
    <main id="main">
      <section className="create-post-content">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-10">
              <div className="row d-flex justify-content-between mt-5">
                <div className="col-lg-12">

                  <div className="row">
                    <div className="col-lg-12 text-center mb-5">
                      <h1 className="page-title">Edit News</h1>
                    </div>
                  </div>

                  <form className='row' onSubmit={handleFormSubmit}>
                    <div className="col-lg-6 mb-3">
                      <label htmlFor="">Title</label>
                      <input type="text" name='title' value={text.title} className="form-control" placeholder='Enter News Title' onChange={handleTextChange} maxLength={255} />
                    </div>
                    <div className="col-lg-6 mb-3">
                      <label htmlFor="">Image URL</label>
                      <input type="text" name='img' value={text.img} className="form-control" placeholder='Enter News Image URL' onChange={handleTextChange} maxLength={255} />
                    </div>

                    <div className="col-lg-6 mb-3">
                      <label htmlFor="">Category</label>
                      <input type="text" name='category' value={text.category} className="form-control" placeholder='Enter News Category' onChange={handleTextChange} maxLength={255} />
                    </div>

                    <div className="col-lg-6 mb-3">
                      <label htmlFor="">Author</label>
                      <input type="text" name='author' value={text.author} className="form-control" placeholder='Enter News Author' onChange={handleTextChange} maxLength={255} />
                    </div>

                    <div className="col-lg-12 mb-3">
                      <label htmlFor="brief">Brief</label>
                      <textarea name="brief" id="brief" cols={30} rows={10} className="form-control" onChange={handleTextChange} maxLength={500} placeholder='Enter News Brief' value={text.brief}></textarea>
                    </div>

                    <div className="mb-3">
                      {text.validate === 'loading' && (
                        <div className="loading">Sending News, Please Wait!</div>
                      )}

                      {text.validate === 'incomplete' && (
                        <div className="error-message">Please fill in all above details.</div>
                      )}

                      {text.validate === 'success' && (
                        <div className="sent-message">Your news was updated successfully. Thank you.</div>
                      )}

                      {text.validate === 'error' && (
                        <div className="error-message">Server Error, try again.</div>
                      )}

                    </div>

                    <div className="col-12 d-flex justify-content-center">
                      <button type='submit' className='btn btn-primary'>Update News</button>
                    </div>

                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
