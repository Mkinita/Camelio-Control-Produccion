import Head from "next/head";
import Image from "next/image";
import FooterPropduccion from "../components/FooterPropduccion";
import ModalProductos from "../components/ModalProductos";
import useCombustible from "../hooks/useCombustible";
import Modal from "react-modal"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function LayoutControlProduccion({ children, pagina }) {
  
  const {modal} = useCombustible()
  
  return (
    
    <>
      <Head>
        <title>Camalio - {pagina}</title>
        <meta name="description" content="Produccion" />
      </Head>

      <div className="md:flex">
            <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5 py-5 pb-2">
                <Image
                    className="m-auto"
                    width={300}
                    height={100}
                    src="/img/Logo.png"
                    alt="imagen logotipo"
                />    
                <div className="py-6 pb-0"><FooterPropduccion/></div>
            </aside>
            <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
                <div className="p-4">
                    {children}
                </div>
            </main>
      </div>

      {modal && (
        <Modal isOpen={modal} style={customStyles}>
          <ModalProductos />
        </Modal>
      )}
      
      <ToastContainer />

      
    </>
  );
}