import '../styles/globals.css'
import { CombustibleProvider } from '../context/CombustibleProvider'

export default function App({ Component, pageProps }) {
  return (
    <CombustibleProvider>
        <Component {...pageProps} />
    </CombustibleProvider>
  )
}
