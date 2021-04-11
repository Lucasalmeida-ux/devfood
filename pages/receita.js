import Head from 'next/head'
import Layout from '../components/layout'
import ParsedCookie from '../utils/parsed-cookie'

export default function Receita(props) {
  const user = props.user
  const receita = props.receita
  return (
    <>
      <Head>
        <title>{receita.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title={receita.title} auth={user} toback={true}>
          <div className="h-60 overflow-hidden relative rounded-t-md">
            <img src={receita.category.image} className="absolute bottom-0" />
            <h2 className="absolute bottom-1 left-2 text-white font-bold">
              {receita.category.name}
            </h2>
          </div>
          <div className="p-2 bg-white rounded-b-md">
            <h3 className="text-sm font-semibold text-df-oran">{receita.title}</h3>
            <p className="text-sm font-normal text-df-blue">{receita.description}</p>
          </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const query = context.query
  const user = ParsedCookie(context.req, context.res)
  const token = `token ${user.token}`

  //buscar receita

  const receita_res = await fetch(`https://receitas.devari.com.br/api/v1/recipe/${query.id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      method: 'GET'
    }
  )
  const receita = await receita_res.json()
  return {
    props: { user, receita },
  }
}