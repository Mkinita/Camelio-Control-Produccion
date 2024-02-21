import LayoutControlProduccionAdmin from "../layout/LayoutControlProduccionAdmin"
import Head from 'next/head'
import Image from 'next/image'


const index = () => {

  return (
    
    <LayoutControlProduccionAdmin pagina='Produccion'>
      <Head>
        <meta name="description" content="Camelio" />
        <link rel="icon" href="/img/Logo.png"/>
        <title>Camelio</title>
      </Head>
    </LayoutControlProduccionAdmin>
  )
}

export default index