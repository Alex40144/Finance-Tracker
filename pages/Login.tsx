import React, { useState } from 'react'
import Router from 'next/router'
import cookie from 'js-cookie'
import Layout from '../components/layout'
import useSWR from 'swr';
import { toast } from 'react-toastify';


export default function login() {
    const {data, revalidate} = useSWR('/api/authed', async function(args) {
        const res = await fetch(args);
        return res.json();
    });
    if (data) {
        if (data.email) {
            Router.push("/Dashboard");
        }
        if (data.error){
            toast(data.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const body = { email, password }
        const res = await fetch(`http://localhost:3000/api/auth`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        .then((r) => r.json())
        .then((data) => {
            if (data && data.error) {
                setError(data.message);
                //alert(data.message)
            }
            if (data && data.token) {
                //set cookie
                cookie.set('token', data.token, {expires: 2});
                Router.push("/Dashboard");
            }
            else{
                console.error("no token with login request")
                console.log(data)
            }
        });
    };


    return (
        <Layout home>
            <div className="p-12 -flex text-justify">
                <form onSubmit={submitData}>
                    <h1>Login</h1>
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
                        disabled={!email || !password}
                        type="submit"
                        value="Login"
                    />
                    <a className="ml-4" href="#" onClick={() => Router.push('/FinanceTracker')}>
                        or Cancel
                    </a>
                </form>
          </div>
        </Layout>
    )
}