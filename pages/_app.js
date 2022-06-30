import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Image from 'next/image'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import { Container } from 'react-bootstrap';

function MyApp({ Component, pageProps }) {
  return (
    
    <div className={styles.container}>
      <Navbar className={styles.nav} sticky='top'>
          <Container>
            <Navbar.Brand>
            <a
            href="https://bexarfacts.org"
            target="_blank"
            rel="noopener noreferrer"
          >
              <Image
                alt=""
                src="/BF-Logo.jpeg"
                width={330}
                height={80}
                className="d-inline-block align-top"
              />
              </a>
            </Navbar.Brand>
          </Container>
      </Navbar>
      <Head>
        <title>Bexar Dash</title>
        <meta name="description" content="Bexar Facts' Data Dashboard!" />
        <link rel="icon" href="/favicon.ico" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-5XVXBB3RLW"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());
          gtag('config', 'G-5XVXBB3RLW');
        </script>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Bexar-Dash
        </h1>
        <div className={styles.description}>
          A data dashboard by&nbsp;
          <Image src="/bf-1.png" alt="Vercel Logo" width={164} height={32} />
          ,&nbsp;visualizing Bexar Facts polling data
        </div>

      
        <div className={styles.menuButtons}>
          <Button className={styles.poll7} variant='poll7' href="/issues/poll7">NEW - Poll 7 Results!</Button>
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
  )
}

export default MyApp
