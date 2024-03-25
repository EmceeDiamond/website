import { useContext } from "react"
import { AuthContext } from "../AppProvider"

function useAuth() {
  return (
    useContext(AuthContext)
  )
}

export default useAuth