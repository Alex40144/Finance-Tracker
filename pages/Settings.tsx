import Layout, { siteTitle } from '../components/FTlayout'
import Head from 'next/head'
import React, { useState } from 'react'
import Router from 'next/router'
import useSWR, { mutate } from 'swr'
import cookie from 'js-cookie'
import Table from '../components/table'
import { toast } from 'react-toastify';
import next from 'next'


export default function dashboard() {
    var [category, setCategory] = useState('')


    const fetcher = (url: string) => fetch(url).then((response) => response.json())

    const {data: user} = useSWR('/api/authed', fetcher)
    var {data, error, revalidate} = useSWR(user ? '/api/getUserSettings?id='+user.id : null, fetcher)
    if (!user) return <h1>Loading...</h1>;

    let loggedIn = false;
    if (user.email) {
        loggedIn = true;
    } else {
        Router.push('/')
    }
    
    if (!data) return <h1>Loading...</h1>;

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        data.Categories.push(category)
        const body = {
            "settings":data,
            "id":user.id
        }
        const res = await fetch(`http://localhost:3000/api/updateUserSettings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data && data.error) {
                alert(data.message)
            }
        });
        toast("added new category", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
        setCategory("")
    };

    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <h1>Settings</h1>
            <div id="categories">
                <Table data={data}/>
            </div>
            <div className="p-12 -flex text-justify">
                <form
                onSubmit={submitData}>
                <h1>Add category</h1>
                <input
                    onChange={e => setCategory(e.target.value)}
                    placeholder="category"
                    type="text"
                    value={category}
                />
                <input
                    disabled={!category}
                    type="submit"
                    value="Save"
                />
                </form>
            </div>
            <button className="text-blue underline cursor-pointer"
                onClick={() => {
                cookie.remove('token');
                revalidate();
                }}>
                Logout
            </button>
            
        </Layout>
    )
  }

