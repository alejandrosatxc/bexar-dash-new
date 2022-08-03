import '../styles/globals.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Image from 'next/image'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import { Container } from 'react-bootstrap';
import SideNav from '../components/SideNav';
import MobileNav from '../components/MobileNav';
import NavBJ from '../components/NavBJ';
import Script from 'next/script';
function MyApp({ Component, pageProps }) {


  return (
    <div>
    
      <div id="main-app-container" className={styles.container}>
        <Head>
          <title>Bexar Dash</title>
          <meta name="description" content="Bexar Facts' Data Dashboard!" />
          <link rel="icon" href="/favicon.ico" />
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossOrigin="anonymous" />

        </Head>
        <NavBJ />
        <main className={styles.main}>

          {/* <Button id ="openBtn" className = {styles.navBtn} onClick={(e)=>{openNav()}}>OpenNav</Button> */}
          <h1 className={styles.title}>
            Welcome to Bexar-Dash
          </h1>

          <div className={styles.description}>
            A data dashboard by&nbsp;
            <Image src="/bf-1.png" alt="Vercel Logo" width={164} height={32} />
            ,&nbsp;visualizing Bexar Facts polling data
          </div>


          <div className={styles.menuButtons}>
            <Button className={styles.poll7} variant='poll7' href="/polls/7">NEW - Poll 7 Results!</Button>
            <Button className={styles.localgov} variant='localgov' href="/issues/localgovernment">Local Government</Button>
            <Button className={styles.electedofc} variant='electedofc' href="/issues/electedofficials">Elected Officials</Button>
          </div>
          <p className={styles.disclaimer}>This dashboard is currently formatted for viewing on desktop or laptop only. We will make it mobile friendly overtime.</p>
          <Component {...pageProps} />
        </main>
        <footer className={styles.footer}>
          <a
            href="https://bexarfacts.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
              <Image src="/bf-1.png" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </footer>
      </div>
    </div>
  )
}

export default MyApp
