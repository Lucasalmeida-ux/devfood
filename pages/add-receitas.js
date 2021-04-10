import Head from 'next/head'
import Layout from '../components/layout'
import { parseCookies } from "../helpers"

export default function Receitas(props) {
  return (
    <>
    <Head>
        <title>Receitas - DEVfood</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title="Adicionar Receita" auth={props.data.user}>
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

Receitas.getInitialProps = async ({ req, res }) => {
    const data = parseCookies(req)
    
    if (res) {
        if (Object.keys(data).length === 0 && data.constructor === Object) {
          res.writeHead(301, { Location: "/" })
          res.end()
        }
      }
      return {
        data: {...data, isLoggedIn : true},
      }
  }