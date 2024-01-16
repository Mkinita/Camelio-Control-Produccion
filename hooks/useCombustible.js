import {useContext } from "react";
import CombustibleContext from "../context/CombustibleProvider";


const useCombustible = () => {
    return useContext(CombustibleContext)
}

export default useCombustible