import Head from 'next/head'
import Layout from '../components/layout'
import { useForm } from "react-hook-form";
import ParsedCookie from '../utils/parsed-cookie'

export default function AddReceitas(props) {
  const user = props.user
  const cat_receitas = props.cat_receitas
  const token = `token ${user.token}`
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const addReceitaSubmit = async (data, e) => {
    const new_receita = {...data, user: user.id}
    const req = await fetch(`https://receitas.devari.com.br/api/v1/recipe/`,
      {
        body: JSON.stringify(new_receita),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        method: 'POST'
      }
    )
    if (req.status == 201) {
     alert('receita criada com sucesso')
     e.target.reset();
    }
  }
  return (
    <>
      <Head>
        <title>Receitas - DEVfood</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title="Adicionar Receita" auth={user} toback={true}>
        <div className="max-w-2xl w-full mx-auto bg-white p-5 rounded-md">
          <form className="mt-8 space-y-2" onSubmit={handleSubmit(addReceitaSubmit)}>
            <input
              id="name_receita"
              name="title"
              type="text"
              required
              {...register("title", { required: true })}
              placeholder="Nome da receita"
              className="bg-gray-200 appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-offset-df-blue focus:border-gray-700 focus:z-10 sm:text-sm" />

            <select 
              {...register("category")}
              defaultValue="choice"
              className="bg-gray-200 appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-offset-df-blue focus:border-gray-700 focus:z-10 sm:text-sm" >
              <option disabled value="choice"> -- Escolha a categoria da receita -- </option>
              {cat_receitas.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            
            <label htmlFor="description" className="block text-sm text-df-oran font-bold">Descrição</label>
            <textarea
              id="description"
              name="description"
              required
              {...register("description", { required: true })}
              placeholder="descrição"
              className="bg-gray-200 appearance-none rounded-2xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-offset-df-blue focus:border-gray-700 focus:z-10 sm:text-sm" >
            </textarea>
            <button type="submit" className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-df-oran hover:bg-df-blue focus:outline-none mx-auto block">
              Criar Receita
                </button>
            {errors.exampleRequired && <span>Campo Obrigatório</span>}
          </form>
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ req, res }) {
  const user = ParsedCookie(req, res)
  const token = `token ${user.token}`
  const cat_receitas_res = await fetch(`https://receitas.devari.com.br/api/v1/category`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      method: 'GET'
    }
  )
  const cat_receitas = await cat_receitas_res.json()
  return {
    props: { user, cat_receitas },
  }
}