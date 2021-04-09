import Head from 'next/head'
import Layout from '../components/layout'
import { useForm } from "react-hook-form";

export default function Receitas() {
  return (
    <>
    <Head>
        <title>Receitas - DEVfood</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title="Receitas" auth={false}>
        <div className="grid grid-cols-3 w-full">
            <div className="bg-white">
                <h3>Calabresa</h3>
            </div>
            <div className="bg-white">
                <h3>Calabresa</h3>
            </div>
            <div className="bg-white">
                <h3>Calabresa</h3>
            </div>
            <div className="bg-white">
                <h3>Calabresa</h3>
            </div>
            <div className="bg-white">
                <h3>Calabresa</h3>
            </div>
            
        </div>
      </Layout>
</>
  )
}
