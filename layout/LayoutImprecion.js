import Head from "next/head";
import SidebarImprecion from "../components/SidebarImprecion";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import ModalDespachos from "../components/ModalDespachos";
import useCombustible from "../hooks/useCombustible";
import Modal from "react-modal"
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

export default function AdminLayout({ children, pagina }) {

  const {modal} = useCombustible()
  return (
    <>
      <Head>
        <title>Control - {pagina}</title>
        <meta name="description" content="RestoApp" />
      </Head>

      <div className="">
            <aside className="">

                <SidebarImprecion/>
            </aside>

            

            <main className="">
                <div className="">
                    {children}
                </div>
            </main>
      </div>

      {modal && (
        <Modal isOpen={modal} style={customStyles}>
          <ModalDespachos/>
        </Modal>
      )}
      <ToastContainer />

      
    </>
  );
}