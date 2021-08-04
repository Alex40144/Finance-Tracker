import Layout, { siteTitle } from '../components/FTlayout'
import Head from 'next/head'
import React, { useState } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import cookie from 'js-cookie'
import Table from '../components/table'


export default function dashboard() {
    const [title, setTitle] = useState('')
    const [value, setValue] = useState('')
    const [frequency , setFrequency] = useState('')
    const [category, setCategory] = useState('')


    const fetcher = (url: string) => fetch(url).then((response) => response.json())

    const {data: user, revalidate} = useSWR('/api/authed', fetcher)
    const {data, error} = useSWR(user ? '/api/getTransactions?id='+user.id : null, fetcher)
    const {settings} = useSWR(user ? '/api/getUserSettings?id='+user.id : null, fetcher)
    if (!user) return <h1>Loading...</h1>;
    if (!data) return <h1>Loading Data...</h1>;
    if (!settings) return <h1>Loading Settings...</h1>;

    let loggedIn = false;
    if (user.email) {
        loggedIn = true;
    } else {
        Router.push('/')
    }
    
    if (!data) return <h1>Loading...</h1>;
    console.log(data)

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const body = { title, value, frequency, category, user }
        const res = await fetch(`http://localhost:3000/api/createTransaction`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
        .then((r) => r.json())
        .then((data) => {
        if (data && data.error) {
            alert(data.message)
        }
            //check that it worked
        });
    };

    console.log(settings)
    var select = document.getElementById("categories");
    for(index in settings.Categories) {
        select.options[select.options.length] = new Option(settings.Categories[index], index);
    }

    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <h1>Transactions</h1>
            <Table data={data}/>

            
            <div className="p-12 -flex text-justify">
                <form
                onSubmit={submitData}>
                <h1>Add transaction</h1>
                <input
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Name of Transaction"
                    type="text"
                    value={title}
                />
                <input
                    onChange={e => setValue(e.target.value)}
                    placeholder="value"
                    type="number"
                    value={value}
                />
                <select
                    onChange={e => setFrequency(e.target.value)}
                    placeholder="frequency"
                    type="text"
                    value={frequency}
                >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                </select>
                <p>this needs to be a drop down of the categories the user has made</p>
                <select
                    id="categories"
                    onChange={e => setCategory(e.target.value)}
                    placeholder="category"
                    type="text"
                    value={category}
                >

                </select>
                <input
                    disabled={!title || !value || !frequency || !category || title == category}
                    type="submit"
                    value="Save"
                />
                </form>
            </div>
        </Layout>
    )
  }

