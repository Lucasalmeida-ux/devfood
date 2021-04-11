import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { ConfirmDialog, IconButton } from '../components/confirm-dialog'
import Cookie from 'js-cookie'

export default function Layout(props) {
  const router = useRouter()

  const Toback = () => {
    if (props.toback) {
      return (
        <span className="cursor-pointer text-df-blue hover:text-df-oran" onClick={() => router.back()}><BiArrowBack className="inline-block" /> Voltar</span>
      )
    }
    return <span className="opacity-0">left</span>
  }

  const user = props.auth
  useEffect(() => {
    if (typeof user === 'undefined' || !user && router.asPath != '/') {
      router.push('/')
    }

  })
  const logOut = () => {
    Cookie.remove('user')
    router.push('/')
  }
  const Menu = () => {
    const [confirmOpen, setConfirmOpen] = useState(false);
    if (router.asPath != '/') {
      return (
        <nav className="float-right">
          <Link href="/receitas"><a className="text-white hover:text-yellow-100 font-semibold mx-3 text-sm">Receitas</a></Link>
          <Link href="/minhas-receitas"><a className="text-white hover:text-yellow-100 font-semibold mx-3 text-sm">Minhas Receitas</a></Link>
          <Link href="/add-receitas"><a className="text-white hover:text-yellow-100 font-semibold mx-3 text-sm">Adicionar Receita</a></Link>

          <div className="inline-block ml-5">
            <span className="text-white font-normal">{user.name}</span>
            <img src={user.image} width="30" height="30" className="inline-block rounded-full mx-2" />
            <IconButton className="float-right" aria-label="delete" onClick={() => setConfirmOpen(true)}>
              <a className="focus:outline-none text-white font-semibold text-sm">Sair</a>

            </IconButton>
            <ConfirmDialog
              title="Tem certeza que deseja Sair ?"
              open={confirmOpen}
              onClose={() => setConfirmOpen(false)}
              onConfirm={logOut}
            >
              Tem certeza que deseja Sair ?
                    </ConfirmDialog>
          </div>
        </nav>
      )
    }
    return ""
  }
  return (
    <>
      <div className="">
        <div className="w-10/12 mx-auto bg-gray-200 min-h-screen">
          <header className="bg-df-oran px-8 pt-4 pb-3 border-b-6 border-df-blue">
            <h1 className="text-2xl inline-block"><span className="text-white italic font-semibold">DEV</span><span className="text-df-blue">food</span></h1>
            <Menu />
          </header>
          <div className="flex justify-between bg-white border-t-6 border-gray-200 py-4 text-sm font-semibold text-df-oran">
            <Toback />
            <span>{props.title}</span>
            <span className="opacity-0">right</span>
          </div>
          <div className="page py-12 px-4 sm:px-6 lg:px-8">
            {props.children}
          </div>
        </div>
      </div>
    </>
  )
}