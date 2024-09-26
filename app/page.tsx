'use client';

import { FormEvent, useState } from "react";
import { login } from "./requests/login";

export default function Login() {

  const [ name, setName ] = useState<string>('');
  const [ email, setEmail ] = useState<string>('');
  const [ status, setStatus ] = useState<string>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');

    // TODO: Add error UI and success redirect
    const response = await login({ name, email });
    if (response.ok) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  }

  return (
    <div className="container">
      <h1>Let's find you a dog!</h1>
      <p>To get started, please enter your name and your email address below.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Your name</label><br />
          <input 
            type="text" 
            required={true}
            disabled={status === 'loading'}
            id="name" 
            name="name" 
            value={name} 
            onChange={e => setName(e.currentTarget.value)}
           />
        </div>
        <div>
          <label htmlFor="email">Your email address</label><br />
          <input 
            type="email" 
            required={true}
            disabled={status === 'loading'}
            id="email" 
            name="email" 
            value={email} 
            onChange={e => setEmail(e.currentTarget.value)} 
          />
        </div>
        <button type="submit">{status === "loading" ? "Submitting..." : "Enter"}</button>
        {status === 'error' ? <p>Something went wrong. Please try again.</p> : ''}
      </form>
    </div>
  );
}
