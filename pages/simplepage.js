import Head from 'next/head'
import Layout from '../components/layout'
import { ConfirmDialog, IconButton } from '../components/confirm-dialog'
import { useState } from 'react';

export default function Receitas(props) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const deletePost = () => console.log("post deletado")
    return (
        <>
            <Head>
                <title>Receitas - DEVfood</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout title="simple page" auth={props.cookie}>
                <div>
                    <IconButton aria-label="delete" onClick={() => setConfirmOpen(true)}>
                        Abrir diálogo
                    </IconButton>
                    <ConfirmDialog
                        title="Delete Post?"
                        open={confirmOpen}
                        onClose={() => setConfirmOpen(false)}
                        onConfirm={deletePost}
                    >
                        Are you sure you want to delete this post?
                    </ConfirmDialog>
                </div>
            </Layout>
        </>
    )
}



export async function getServerSideProps({ req, res }) {
    const cookie = JSON.parse(req.cookies.user)
    const token = `token ${cookie.token}`

    //buscar receitas

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
        props: { cookie, receitas, token },
    }
}