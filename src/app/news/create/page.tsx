'use client';

import React, { useState, useEffect } from 'react'

// import AOS
import AOS from 'aos';

export default function CreateItem() {

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: false,
            mirror: false,
        });
    }, []);

    const initialState = {
        title: '',
        img: '',
        category: '',
        author: '',
        brief: '',
        validate: ''
    };

    const [text, setText] = useState(initialState);

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

        //Sending POST request

        try {
            const response = await fetch(`/api/news/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(text)
            });

            setText({ ...text, validate: 'loading' });

            const result = response.status;

            if (result === 201) {
                setText({ ...text, validate: 'success' });

                console.log('Success', result);
            }
        } catch (error) {
            setText({ ...text, validate: 'error' });

            console.log('Error', error);
        }
    }



    return (
        <main id="main">
            <section className="create-post-content">
                <div className="container" data-aos="fade-up">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-10">
                            <div className="row d-flex justify-content-between mt-5">
                                <div className="col-lg-12">

                                    <div className="row">
                                        <div className="col-lg-12 text-center mb-5">
                                            <h1 className="page-title">Create New News</h1>
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
                                            <textarea name="brief" id="brief" cols={30} rows={10} className="form-control" onChange={handleTextChange} maxLength={255} placeholder='Enter News Brief' value={text.brief}></textarea>
                                        </div>

                                        <div className="mb-3">
                                            {text.validate === 'loading' && (
                                                <div className="loading">Sending News, Please Wait!</div>
                                            )}

                                            {text.validate === 'incomplete' && (
                                                <div className="error-message">Please fill in all above details.</div>
                                            )}

                                            {text.validate === 'success' && (
                                                <div className="sent-message">Your news was submited successfully. Thank you.</div>
                                            )}

                                            {text.validate === 'error' && (
                                                <div className="error-message">Server Error, try again.</div>
                                            )}

                                        </div>

                                        <div className="col-12 d-flex justify-content-center">
                                            <button type='submit' className='btn btn-primary'>Create News</button>
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
