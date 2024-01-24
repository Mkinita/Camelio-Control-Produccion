import LayoutControlProduccion from "../layout/LayoutControlProduccion"
import Head from 'next/head'
import Image from 'next/image'


const index = () => {

  return (
    
    <LayoutControlProduccion pagina='Produccion'>
      <Head>
        <meta name="description" content="Camelio" />
        <link rel="icon" href="/img/Logo.png"/>
        <title>Camalio</title>
      </Head>
    </LayoutControlProduccion>
  )
}

export default index