import Layout, { siteTitle } from '../components/layout'
import Head from 'next/head'
import React, { useState } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import Table from '../components/table'
import { useEffect } from "react"
import { toast } from 'react-toastify';


export default function dashboard() {
    const [title, setTitle] = useState('')
    const [value, setValue] = useState('')
    const [frequency , setFrequency] = useState('')
    const [date , setDate] = useState('')
    const [category, setCategory] = useState('')

    const fetcher = (url: string) => fetch(url).then((response) => response.json())

    const {data: user} = useSWR('/api/authed', fetcher)
    var {data: transactions} = useSWR(user ? '/api/getTransactionsByType?id='+user.id+"&recurring=true" : null, fetcher)
    const {data: settings, revalidate: getTransactions} = useSWR(transactions ? '/api/getUserSettings?id='+user.id : null, fetcher)

    useEffect(()=>{
        if (settings){
            var select = document.getElementById("categories") as HTMLSelectElement;
            if (!select){
                return
            }
            var index: any
            for(index in settings.Categories) {
                select.options[select.options.length] = new Option(settings.Categories[index], settings.Categories[index])
            }
        }
    }, [settings])

    if (!settings) return <h1>Loading...</h1>;


    if (!user.email) {
        Router.push('/')
    }
    if (transactions.length == 0){
        transactions = [{
            title: '1',
            value: 2,
            frequency: '3',
            category: '4'
          }]
    }

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const body = { title, value, frequency, category, user, date }
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
            toast("transaction added", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            getTransactions()
        });
    };

    
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <h1>Transactions</h1>
            <Table data={transactions}/>
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

                <input
                    onChange={e => setDate(e.target.value)}
                    type="date"
                    id="date"
                    value={date}
                />

                <select
                    onChange={e => setFrequency(e.target.value)}
                    placeholder="frequency"
                    value={frequency}
                >

                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                </select>

                <select
                    id="categories"
                    onChange={e => setCategory(e.target.value)}
                    placeholder="category"
                    value={category}
                />

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

