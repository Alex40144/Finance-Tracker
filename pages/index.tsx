import React, { useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Layout from '../components/layout'

export default function Main(){
  return (

    <Layout home>
        <h2>This is a work in progress, so you might lose all your data</h2>
        <h3>This website has no access to your real money, it just allows you to track expenses</h3>
        <form className="flex flex-row w-full justify-evenly text-center">
            <div className="text-center w-auto">
                <Link href="/Signup">
                    <input
                        className="text-3xl bg-blue font-bold flex m-5 px-4 py-8 flex-grow rounded-md cursor-pointer"
                        value="Sign up"
                        type="submit"
                    />
                </Link>
            </div>
            <div className="text-center w-auto">
                <Link href="/Login">
                    <input
                        className="text-3xl bg-blue font-bold flex m-5 px-4 py-8 flex-grow rounded-md cursor-pointer"
                        value="Log in"
                        type="submit"
                    />
                </Link>
            </div>
        </form>
      <p>This is a very basic Finance tracker</p>
    </Layout>
  )
}
