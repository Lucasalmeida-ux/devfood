import Head from 'next/head'
import Layout from '../components/layout'
import { useForm } from "react-hook-form";
import { RiDeleteBinLine } from 'react-icons/ri'
import { ConfirmDialog, IconButton } from '../components/confirm-dialog'
import { useState } from 'react';
import { useRouter } from 'next/router'
import ParsedCookie from '../utils/parsed-cookie'

export default function EditReceitas(props) {
    const user = props.user
    const router = useRouter()
    const [confirmOpen, setConfirmOpen] = useState(false);
    const cat_receitas = props.cat_receitas
    const token = `token ${user.token}`
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const receita = props.receita

    const editReceitaSubmit = async (data, e) => {
        const put_receita = { ...data, user: user.id }
        const req = await fetch(`https://receitas.devari.com.br/api/v1/recipe/${receita.id}/`,
            {
                body: JSON.stringify(put_receita),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                method: 'PUT'
            }
        )
        if (req.status == 200) {
            alert('receita atualizada com sucesso')
            e.target.reset();
            router.push('/minhas-receitas')
        }
    }
    const deleteReceita = async () => {
        const req = await fetch(`https://receitas.devari.com.br/api/v1/recipe/${receita.id}/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                method: 'DELETE'
            }
        )
        if (req.status == 204) {
            router.push('/minhas-receitas')
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
                    <IconButton className="float-right" aria-label="delete" onClick={() => setConfirmOpen(true)}>
                        <RiDeleteBinLine className="inline-block" />
                    </IconButton>
                    <ConfirmDialog
                        title="Deletar Receita?"
                        open={confirmOpen}
                        onClose={() => setConfirmOpen(false)}
                        onConfirm={deleteReceita}
                    >
                        Tem certeza que deseja excluir ?
                    </ConfirmDialog>
                    <form className="mt-10 space-y-2" onSubmit={handleSubmit(editReceitaSubmit)}>
                        <input
                            id="name_receita"
                            name="title"
                            type="text"
                            defaultValue={receita.title}
                            required
                            {...register("title", { required: true })}
                            placeholder="Nome da receita"
                            className="bg-gray-200 appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-offset-df-blue focus:border-gray-700 focus:z-10 sm:text-sm" />

                        <select
                            {...register("category")}
                            defaultValue={receita.category.id}
                            className="bg-gray-200 appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-offset-df-blue focus:border-gray-700 focus:z-10 sm:text-sm" >
                            {/* <option disabled value="choice"> -- Escolha a categoria da receita -- </option> */}
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
                            defaultValue={receita.description}
                            required
                            {...register("description", { required: true })}
                            placeholder="descrição"
                            className="bg-gray-200 appearance-none rounded-2xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-offset-df-blue focus:border-gray-700 focus:z-10 sm:text-sm" >
                        </textarea>
                        <button type="submit" className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-df-oran hover:bg-df-blue focus:outline-none mx-auto block">
                            Atualizar Receita
                </button>
                        {errors.exampleRequired && <span>Campo Obrigatório</span>}
                    </form>
                </div>
            </Layout>
        </>
    )
}

export async function getServerSideProps(context) {
    const user = ParsedCookie(context.req, context.res)
    const token = `token ${user.token}`
    const query = context.query

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
        props: { user, cat_receitas, receita },
    }
}