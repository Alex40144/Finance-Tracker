import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import cookie from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
import router from 'next/router';

const name = 'Finance Tracker'
export const siteTitle = 'Finance Tracker'

function toggleSidebar() {
    if (document.getElementById("Sidebar").style.width == "0px") {
        document.getElementById("Sidebar").style.width = "350px";
        document.getElementById("main").style.marginLeft = "350px";
    }
    else {
        document.getElementById("Sidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    }
}


export default function Layout({
    children,
    home
  }: {
    children: React.ReactNode
    home?: boolean
  }) {
    return (
    <div id="main">
        <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
        />
        <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <header>
        <ToastContainer />                
        <div id="Sidebar"className="h-full w-0 fixed top-0 left-0 bg-black overflow-x-hidden pt-10 duration-500 z-10">
        <a href="/Dashboard" className="text-light p-8 block w-1/3 duration-300 hover:text-blue text-3xl">Dashboard</a>
            <a href="/RecurringTransactions" className="text-light p-8 block w-1/3 duration-300 hover:text-blue text-3xl">Recurring Transactions</a>
            <a href="/SingleTransactions" className="text-light p-8 block w-1/3 duration-300 hover:text-blue text-3xl">Single Transactions</a>
            <a href="/Settings" className="text-light p-8 block w-1/3 duration-300 hover:text-blue text-3xl">Settings</a>
        </div>
        <div className="flex flex-row bg-blue h-14 w-full">
            {home ? (
                <button disabled className="text-4xl text-white" onClick={toggleSidebar}>&#9776;</button>
            ) : (
                <button className="text-4xl text-white" onClick={toggleSidebar}>&#9776;</button>
            )}
            <Link href="/Dashboard">
            <a className="hover:underline text-white font-bold text-xl m-4">Finance Tracker</a>
            </Link>
            {home ? (
                <></>
            ):(
                <button className="text-white underline cursor-pointer"
                    onClick={() => {
                        cookie.remove('token');
                        router.push('/')
                    }}>
                    Logout
                </button>
            )}
        </div>
        
        </header>
        <div className="m-auto w-1/3 text-center">
            <main>{children}</main>
        </div>
    </div>
    )
}