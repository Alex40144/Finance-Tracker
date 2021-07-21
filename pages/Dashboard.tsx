import Layout, { siteTitle } from '../components/FTlayout'
import Head from 'next/head'
import Router from 'next/router'
import useSWR from 'swr';
import Link from 'next/link'
import Table from '../components/table'


export default function dashboard() {
    const fetcher = (url: string) => fetch(url).then((response) => response.json())

    const {data: user, revalidate} = useSWR('/api/authed', fetcher)
    const {data, error} = useSWR(user ? '/api/getTransactions?id='+user.id : null, fetcher)
    if (!user) return <h1>Loading User...</h1>;

    if (!user.email) {
        Router.push('/FinanceTracker')
    }
    
    if (!data) return <h1>Loading Data...</h1>;

    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <p>Welcome {user.email}!</p>
            <h1>Dashboard</h1>
            <p>Someone make this look nice</p>
            <Table data={data}/>
            
            
        </Layout>
    )
  }

