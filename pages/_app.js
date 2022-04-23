import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Image from 'next/image'
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Navbar from 'react-bootstrap/Navbar'
import { Container } from 'react-bootstrap';



function MyApp({ Component, pageProps }) {
  return (
    
    <div className={styles.container}>
      <Navbar bg='white' sticky='top' variant="light">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="/BF-Logo.jpeg"
                width="400"
                height="80"
                className="d-inline-block align-top"
              />{' '}
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
          Welcome to Bexar-Dash!
        </h1>

        <p className={styles.description}>
          Visualize polling data in Bexar County!
        </p>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Browse Issues
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/">Home</Dropdown.Item>
            <Dropdown.Item href="/issues/localgovernment">Local Government</Dropdown.Item>
            <Dropdown.Item href="/issues/electedofficials">Elected Officials</Dropdown.Item>
            <Dropdown.Item href="/issues/poll7">Poll 7</Dropdown.Item>
            {/* <Dropdown.Item href="/issues/homelessness">Homelessness</Dropdown.Item> */}
            <Dropdown.Item href="/issues/crime">Crime</Dropdown.Item>
            {/* <Dropdown.Item href="/issues/direction">Policy Direction</Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
        <br></br>
        <Button href="/issues/poll7">NEW - Poll 7 Results!</Button>

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
