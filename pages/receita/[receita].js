import { parseCookies } from "../../helpers"
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'

export default function Receita(props) {
    const router = useRouter()
    const { receita } = router.query
    console.log(receita)
return (
    <>
    <Head>
      <title> - DEVfood</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout title="Receitas" auth={props.data.user}>
        <h1></h1>
    </Layout>
    </>
)

}

export async function getStaticPaths({ req, res }) {
    const data = parseCookies(req)
  
    if (res) {
      if (Object.keys(data).length === 0 && data.constructor === Object) {
        res.writeHead(301, { Location: "/" })
        res.end()
      }
    }
    const token = `token ${JSON.parse(data.user).token}`
  
    //buscar receitas
    // GET - https://receitas.devari.com.br/api/v1/recipe
    const receitas_res = await fetch(`https://receitas.devari.com.br/api/v1/recipe`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        method: 'GET'
      }
    )
    const receitas = await receitas_res.json()
    return {
      data: { ...data, receitas },
    }
  }