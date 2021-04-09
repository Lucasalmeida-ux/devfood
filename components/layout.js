import Link from 'next/link'
import { FaUserCircle } from 'react-icons/fa'

export default function Layout(props) {
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

function Menu() {
  return(
    <nav className="float-right">
      <Link href="/receitas"><a className="text-white hover:text-yellow-100 font-semibold mx-3 text-sm">Receitas</a></Link>
      <Link href="/minhas-receitas"><a className="text-white hover:text-yellow-100 font-semibold mx-3 text-sm">Minhas Receitas</a></Link>
      <Link href="/add-receitas"><a className="text-white hover:text-yellow-100 font-semibold mx-3 text-sm">Adicionar Receita</a></Link>
    
      <div className="inline-block ml-5">
        <span className="text-white font-normal">Nome</span>
        {/* <img className="inline-block" src="people.png" /> */}
        <FaUserCircle  className="inline-block text-df-blue text-4xl mx-2" />
        <Link href="/"><a className="text-white hover:text-red-700 font-semibold text-sm">Sair</a></Link>

      </div>
    </nav>
  )
}