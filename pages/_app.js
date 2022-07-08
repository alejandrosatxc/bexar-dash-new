import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Image from 'next/image'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import { Container } from 'react-bootstrap';
import SideNav from  '../components/SideNav';
function MyApp({ Component, pageProps }) {
  const openNav = (e) =>{
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main-app-container").style.marginLeft = "250px";
}
  
  return (<div>
    <SideNav />
    <div id = "main-app-container" className={styles.container}>
      {/* <Navbar className={styles.nav} sticky='top'>
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
      </Navbar> */}
      <Head>
        <title>Bexar Dash</title>
        <meta name="description" content="Bexar Facts' Data Dashboard!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
      <Button className = {styles.navBtn} onClick={(e)=>{openNav()}}>OpenNav</Button>
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
