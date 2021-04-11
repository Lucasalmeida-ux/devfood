import Head from 'next/head'
import Layout from '../components/layout'
import Link from 'next/link'
import { FaPlus, FaEdit } from 'react-icons/fa'
import ParsedCookie from '../utils/parsed-cookie'

export default function Receitas(props) {
  const user = props.user
  const receitas = props.receitas.slice(0).reverse()
  const Receitas = () => {
    return (
      <>
        {receitas.map((receita) => {
          return (
            <div key={receita.id}>

            
            <Link href={`/receita?id=${receita.id}`}>
                <div className="cursor-pointer m-4 rounded-md bg-white transition-shadow hover:shadow-md">
                  <div className="h-28 overflow-hidden relative rounded-t-md">
                    <img src={receita.category.image} className="absolute bottom-0" />
                    <h2 className="absolute bottom-1 left-2 text-white font-bold">
                      {receita.category.name}
                    </h2>
                  </div>
                  <div className="p-2">
                    <h3 className="text-sm font-semibold text-df-oran">{receita.title}</h3>
                    <p className="text-sm font-normal text-df-blue line-clamp-3">{receita.description}</p>
                    <div className="flex flex-row-reverse">
                    <Link href={`/edit-receita?id=${receita.id}`}><a className="text-df-oran text-sm hover:text-df-blue"><FaEdit className="inline-block" />Editar</a></Link>
                    </div>
                  </div>
                </div>
            </Link>
            </div>
          )
        })}
        <Link href="/add-receitas">
        <div className="text-center text-df-oran hover:text-df-blue h-40 cursor-pointer m-4 rounded-md bg-white transition-shadow hover:shadow-md">
          <FaPlus className="text-5xl inline-block mt-10" /><br />
          <span>Adicionar Receita</span>
        </div>
        </Link>
      </>
    )
  }
  return (
    <>
      <Head>
        <title>Receitas - DEVfood</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title="Minhas receitas" auth={user}>
      <div className="grid grid-cols-3 w-full">
        <Receitas />
      </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps ({ req, res }) {
  const user = ParsedCookie(req, res)
  const token = `token ${user.token}`
  const receitas_res = await fetch(`https://receitas.devari.com.br/api/v1/recipe?user=${user.id}`,
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
    props: { receitas, user},
  }
}