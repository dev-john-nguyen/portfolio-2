import { FC, useEffect, useState } from "react"
import { auth } from "../../creds/firebase"
import AuthContext from "./AuthContext"

type Props = {
    children: any
}

const AuthProvider: FC<Props> = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setIsAuth(true)
            } else {
                setIsAuth(false)
            }
        })
    }, [])

    return (
        <AuthContext.Provider value={{ isAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;