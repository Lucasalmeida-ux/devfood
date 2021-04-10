import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Layout(props) {
  const router = useRouter()
  const user = props.auth
  useEffect(() => {
    if(typeof user === 'undefined' || !user && router.asPath != '/') {
      router.push('/')
   }
  })
  const logOut = () => {
    setCookie("user", "", {
      path: "/",
      maxAge: 3600, // Expires after 1hr
      sameSite: true,
    })
    router.push('/')
  }
  const Menu = () => {
    if(router.asPath != '/') {
    return(
      <nav className="float-right">
      <Link href="/receitas"><a className="text-white hover:text-yellow-100 font-semibold mx-3 text-sm">Receitas</a></Link>
      <Link href="/minhas-receitas"><a className="text-white hover:text-yellow-100 font-semibold mx-3 text-sm">Minhas Receitas</a></Link>
      <Link href="/add-receitas"><a className="text-white hover:text-yellow-100 font-semibold mx-3 text-sm">Adicionar Receita</a></Link>
    
      <div className="inline-block ml-5">
        <span className="text-white font-normal">{user.name}</span>
        <img src={user.image} width="30" height="30" className="inline-block rounded-full mx-2" />
        <button onClick={logOut} className="focus:outline-none text-white hover:text-red-700 font-semibold text-sm">Sair</button>

      </div>
    </nav>
    )
  }
  return ""
  }
    return (
        <>
    <div className="">
        <div className="w-10/12 mx-auto bg-gray-200 h-screen">
        <header className="bg-df-oran px-8 pt-4 pb-3 border-b-6 border-df-blue">
          <h1 className="text-2xl inline-block"><span className="text-white italic font-semibold">DEV</span><span className="text-df-blue">food</span></h1>
        <Menu />
        </header>
        <h1 className="bg-white border-t-6 border-gray-200 py-4 text-center text-sm font-semibold text-df-oran">{props.title}</h1>
        <div className="page py-12 px-4 sm:px-6 lg:px-8">
          {props.children}
        </div>
      </div>
    </div>
        </>
    )
}