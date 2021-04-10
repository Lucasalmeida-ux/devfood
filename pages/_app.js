import Router from 'next/router'
import NProgress from 'nprogress'

import 'tailwindcss/tailwind.css'
import '../style/global.css'
import '../style/nprogress.css'

Router.events.on('routeChangeStart', (url) => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  
  )
}

export default MyApp
