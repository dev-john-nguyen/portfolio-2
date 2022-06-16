import { createContext } from "react";



export default createContext<{ isAuth: boolean }>({ isAuth: false })