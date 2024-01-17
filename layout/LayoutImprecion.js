import Head from "next/head";
import SidebarImprecion from "../components/SidebarImprecion";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({ children, pagina }) {
  return (
    <>
      <Head>
        <title>Control - {pagina}</title>
        <meta name="description" content="RestoApp" />
      </Head>

      <div className="md:flex">
            <aside className="mx-20">

                <SidebarImprecion/>
            </aside>

            

            <main className="mx-20">
                <div className="">
                    {children}
                </div>
            </main>
      </div>
      <ToastContainer />

      
    </>
  );
}