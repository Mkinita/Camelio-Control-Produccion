import Head from "next/head";
import Image from "next/image";
import FooterInformes from "../components/FooterInformes";
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
        <title>Camelio - {pagina}</title>
        <meta name="description" content="Produccion" />
      </Head>

      <div className="">
            
            <main className="md:w-full xl:w-3/4 py-2 m-auto">
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