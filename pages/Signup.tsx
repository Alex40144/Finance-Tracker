import React, { useState } from 'react'
import Router from 'next/router'
import cookie from 'js-cookie'
import Layout from '../components/layout'

export default function signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const body = { name, email, password }
        const res = await fetch(`http://localhost:3000/api/Users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            })
            .then((r) => r.json())
            .then((data) => {
            if (data && data.error) {
                setError(data.message);
            }
            if (data && data.token) {
                //set cookie
                cookie.set('token', data.token, {expires: 2});
                Router.push('/Dashboard');
            }
            else{
                console.error("Signup failed. Please contact Alex")
                console.log(data)
            }
        });
    };


    return (
        <Layout home>
        <div className="p-12 flex text-justify">
            <form
            onSubmit={submitData}>
            <h1>Sign up</h1>
            <input
                autoFocus
                onChange={e => setName(e.target.value)}
                placeholder="Name"
                type="text"
                value={name}
            />
            <input
                onChange={e => setEmail(e.target.value)}
                placeholder="Email address"
                type="text"
                value={email}
            />
            <input
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                value={password}
            />
            <p>{error}</p>
            <input
                disabled={!name || !email || !password}
                type="submit"
                value="Sign up"
            />
            <a className="ml-4" href="#" onClick={() => Router.push('/')}>
                or Cancel
            </a>
            </form>
        </div>
        </Layout>
    )
}