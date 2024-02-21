import Head from "next/head";
import Image from "next/image";
import FooterPalet from "../components/FooterPalet";
import ModalPalet from "../components/ModalPalet";
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
            <aside className="md:w-full xl:w-3/4 py-2 m-auto">
                <Image
                    className="m-auto"
                    width={200}
                    height={100}
                    src="/img/Logo.png"
                    alt="imagen logotipo"
                />    
                <div className="py-6 pb-0"><FooterPalet/></div>
            </aside>
            <main className="md:w-full xl:w-3/4 py-2 m-auto">
                <div className="p-4">
                    {children}
                </div>
            </main>
      </div>

      {modal && (
        <Modal isOpen={modal} style={customStyles}>
          <ModalPalet />
        </Modal>
      )}
      
      <ToastContainer />

      
    </>
  );
}