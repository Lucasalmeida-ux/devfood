import Head from 'next/head'
import Layout from '../components/layout'
import Link from 'next/link'

export default function Receitas(props) {
  // const props_receitas = props.data.receitas
  console.log(props)
  const Receitas = () => {
    return (
      <>
        {props.receitas.map((receita) => {
          return (
            <div key={receita.id}>

            
            <Link href={`/receita/${receita.id}`}>
                <div className="cursor-pointer m-4 rounded-md bg-white transition-shadow hover:shadow-md">
                  <div className="h-28 overflow-hidden relative rounded-t-md">
                    <img src={receita.category.image} className="absolute bottom-0" />
                    <h2 className="absolute bottom-1 left-2 text-white font-bold">
                      {receita.category.name}
                    </h2>
                  </div>
                  <div className="p-2">
                    <h3 className="text-sm font-semibold text-df-oran">{receita.title}</h3>
                    <p className="text-sm font-normal text-df-blue">{receita.description}</p>
                    <div className="flex flex-row-reverse">
                    <a className="text-df-oran text-sm hover:underline">Ver Receita</a>
                    </div>
                  </div>
                </div>
            </Link>
            </div>
          )
        })}
      </>
    )
  }
  return (
    <>
      <Head>
        <title>Receitas - DEVfood</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title="Receitas" auth={props.cookie}>
        <div className="grid grid-cols-3 w-full">
          {/* <div className="bg-white">
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
            </div> */}
          <Receitas />

        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps ({ req, res }) {
  // const data = parseCookies(req)

  // if (res) {
  //   if (Object.keys(data).length === 0 && data.constructor === Object) {
  //     res.writeHead(301, { Location: "/" })
  //     res.end()
  //   }
  // }
  const cookie = JSON.parse(req.cookies.user)
  const token = `token ${cookie.token}`

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
    props: { cookie, receitas, token},
  }
}