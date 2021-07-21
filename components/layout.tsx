import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/layout.module.css'
import Link from 'next/link'

const name = 'Alex Pegg'
export const siteTitle = 'Alex Pegg'

export default function Layout({
    children,
    home
  }: {
    children: React.ReactNode
    home?: boolean
  }) {
    return (
    <div className={styles.container}>
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
        <header className={styles.header}>
        {home ? (
            <>
            <Image
                priority
                src="/images/profile.png"
                height={144}
                width={144}
                alt={name}
            />
            <h1 className="text-6xl text-blue font-bold p-6">{name}</h1>
            </>
        ) : (
            <>
            <Link href="/">
                <a>
                <Image
                    priority
                    src="/images/profile.png"
                    height={108}
                    width={108}
                    alt={name}
                />
                </a>
            </Link>
            <Link href="/">
            <a className="hover:underline text-blue font-bold text-3xl m-8">{name}</a>
            </Link>
            </>
        )}
        </header>
        <main>{children}</main>
        {!home && (
        <div className="my-3 text-blue hover:underline">
            <Link href="/">
            <a>← Back to home</a>
            </Link>
        </div>
        )}
    </div>
    )
}