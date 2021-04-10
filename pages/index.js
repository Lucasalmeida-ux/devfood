import Head from 'next/head'
import Layout from '../components/layout'
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router'
import Cookie from 'js-cookie'

export default function Home() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const loginSubmit = async data => {
    const res = await fetch(`https://receitas.devari.com.br/authentication/`,
        {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'  
            },
            method: 'POST'
        }
    )
    const user = await res.json()
    if (res.status == 200) {
      Cookie.set('user', JSON.stringify(user), 1 /24)
        router.push('/receitas')
    }
}
  return (
    <>
    <Head>
        <title>DEVfood</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title="Entre em sua conta" auth={false}>
      <div className="max-w-md w-full mx-auto bg-white p-5 rounded-md">
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(loginSubmit)}>
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="username" className="px-2 mb-2 block text-sm text-gray-800">Username</label>
                  <input 
                    id="username" 
                    name="username" 
                    type="text" 
                    required
                    {...register("username", { required: true })}
                    placeholder="exemplo@exemplo.com"
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-offset-df-blue focus:border-gray-700 focus:z-10 sm:text-sm"/> 
                </div>
                <div>
                  <label htmlFor="password" className="px-2 my-2 block text-sm text-gray-800">Senha</label>
                  <input 
                    id="password" 
                    name="password" 
                    required
                    type="password" 
                    autoComplete="current-password" 
                    {...register("password", { required: true })}
                    placeholder="*******"
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-df-blue focus:border-gray-700 focus:z-10 sm:text-sm" /> 
                </div>
              </div>

              <div className="flex flex-row-reverse">
                <button type="submit" className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-df-oran hover:bg-df-blue focus:outline-none">
                  Entrar
                </button>
                {errors.exampleRequired && <span>Campo Obrigatório</span>}
              </div>
            </form>
            
          </div>
      </Layout>
</>
  )
}
