import {
  useState,
  useEffect,
  createContext,
  type ReactNode,
  type Dispatch,
  type SetStateAction
} from 'react'
import { Global } from '../helper/Global'
import axios from 'axios'
import { type UserSchema } from './UserSchema'

export interface AuthContextValue {
  auth: typeof UserSchema
  setAuth: Dispatch<SetStateAction<typeof UserSchema>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  title: string
  setTitle: Dispatch<SetStateAction<string>>
  loadingComponents: boolean
  setLoadingComponents: Dispatch<SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextValue | null >(null)

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [auth, setAuth] = useState<typeof UserSchema>({ id: '', name: '', email: '', idRol: null })
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [loadingComponents, setLoadingComponents] = useState(false)

  useEffect(() => {
    authUser()
  }, [])

  const authUser = async (): Promise<false | undefined> => {
    // SACAR DATOS DEL USUARIO IDENTIFICADO DEL LOCALSTORAGE
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    // COMPROBRAR SI TENGO EL TOKEN Y EL USER
    if (!token || !user) {
      setLoading(false)
      return false
    }

    const respuesta = await axios.get(`${Global.url}/user-profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    // SETEAR LOS DATOS
    setAuth(respuesta.data.user)
    setLoading(false)
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        setLoading,
        title,
        setTitle,
        loadingComponents,
        setLoadingComponents
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
