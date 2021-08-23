import Layout, { siteTitle } from '../components/layout'
import Head from 'next/head'
import Router from 'next/router'
import useSWR from 'swr';
import { useEffect } from "react"


export default function dashboard() {

    const fetcher = (url: string) => fetch(url).then((response) => response.json())

    const {data: user} = useSWR('/api/authed', fetcher)
    const {data: settings} = useSWR(user ? '/api/getUserSettings?id='+user.id : null, fetcher)


    useEffect(()=>{
        async function fetchData() {
            console.log("getting transaction data")
            var filteredTransactions: any = [];

            //loop through months since January 2020
            for (var month = new Date(2021,1,1); month < new Date();) {
        
                const body = { target: month, id: user.id }
                const res = await fetch(`http://localhost:3000/api/getTransactionsByMonth`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                })
                .then((r) => r.json())
                .then((data) => {
                    console.log(data)
                })
                var month = new Date(month.setMonth(month.getMonth()+1));
            }
        }
        if (settings){
            fetchData()
        }

    }, [settings])

    if (!user) return <h1>Loading User...</h1>;
    if (!settings) return <h1>Loading...</h1>;

    if (!user.email) {
        Router.push('/')
    }
    


    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <p>Welcome {user.name}!</p>
            <h1>Dashboard</h1>
            <h1> This month's balance change</h1>
            
            
            
        </Layout>
    )
  }

