'use client';
//src/app/login/page.tsx
import Link from 'next/link';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

// Importing AOS for animations
import AOS from 'aos';

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {

  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: 'ease-in-out', // Easing function
      once: false, // Whether animation should happen only once
      mirror: false, // Whether elements should animate in both directions
    });
  }, []);

   // State to manage form data
  const [form, setForm] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  // States for alert messages
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'danger' | null>(null);

   // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

   // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

     // Send POST request to login API
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form), // Send form data as JSON
    });

    const data = await response.json();   

     // Check if the response is successful
    if (response.ok) {
      setAlertMessage('User logged successfully!');
      setAlertType('success');
      setForm({ email: '', password: '' }); // Clear the form
    } else {
      setAlertMessage(data.error || 'Error loging user.');// Set error message
      setAlertType('danger');
    }
  };

  return (
    <main id="main">
      <section className="create-post-content">
        <div className="container" data-aos="fade-up">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-4">
              <div className="row d-flex justify-content-between mt-5">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 text-center mb-5">
                      <h1 className="page-title">Login</h1>
                    </div>
                  </div>
                  {/* Display Alert for success or error messages */}
                  {alertMessage && (
                    <div className={`alert alert-${alertType} mb-4`} role="alert">
                      {alertMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className='row'>
                    <div className="mb-3">
                      <label>Email</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="mb-3">
                      <label>Password</label>
                      <input type="password" name="password" value={form.password} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                      <button type="submit" className="btn btn-primary">Login</button>

                      <div>
                        Dont have an account? <Link href={`/register`}>Register</Link>
                      </div>
                    </div>
                  </form>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

  );
};

export default Login;
