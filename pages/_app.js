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
      <style type="text/css">
        {`
        .nav-light {
          background-color: #ffffff;
        }
        `}
      </style>
      <Navbar bg='white' variant='light' sticky='top'>
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

        <style type="text/css">
        {`
        .btn-localgovernment {
          background-color: #C46300;
          color: white;
          margin: 10px;
        }

         .btn-electedofficials {
          background-color: #E9A822;
          color: white;
          margin: 10px;
        }

        .btn-poll7 {
          background-color: #4274C8;
          color: white;
          margin: 10px;
        }

        
        `}
      </style>
        <div className={styles.menuButtons}>
          <Button variant="poll7" href="/issues/poll7">NEW - Poll 7 Results!</Button>
          <Button variant="localgovernment" href="/issues/localgovernment">Local Government</Button>
          <Button variant="electedofficials" href="/issues/electedofficials">Elected Officials</Button>
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
