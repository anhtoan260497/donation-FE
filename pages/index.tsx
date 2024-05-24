import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Donation from '../components/Donation/Donation'
import { ToastComponent } from '../components/Toast/Toast'
import { HiCheck } from "react-icons/hi";
import Conversion from '../components/Conversion/Conversion'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Donation | by anhtoan260497</title>
        <meta name="Donation | by anhtoan260497" content="Donation | by anhtoan260497" />
        <link rel="icon" href="🤠" />
      </Head>

      <Donation />
    </div>
  )
}

export default Home
