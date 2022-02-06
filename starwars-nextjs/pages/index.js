import Head from 'next/head';
import cx from 'classnames';

export default function Home() {
    return (
        <>
            <Head>
                <title>Star Wars Characters | StarWars.com</title>
            </Head>
            <div className='mx-auto max-w-screen-xl min-h-screen bg-slate-300'>

            </div>
        </>
    )
}

export async function getStaticProps (context) {
    console.log('context', context);
    return {
        props: {}
    };
}