// libs
import cx from 'classnames';

// Services
import StarwarsService from '../services/StarwarsService';

// components
import Head from 'next/head';
import Characters from '../components/Characters';

export default function Home({ characters = [] }) {
    return (
        <>
            <Head>
                <title>Star Wars Characters | StarWars.com</title>
            </Head>
            <div className='mx-auto max-w-screen-xl min-h-screen bg-stone-900'>
                <Characters characters={characters}/>
            </div>
        </>
    )
}

export async function getServerSideProps (context) {
    const [ characters ] = await Promise.all([
        StarwarsService.read(context.req, 'starwars.characters', {})
    ]);

    return {
        props: {
            characters
        }
    };
}