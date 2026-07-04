import { useContext } from "react"
import { counterContext } from "../../context/Context"

const Componenst = () => {

     const value = useContext(counterContext)

    return (
        <div>{value.count}</div>
    )
}

export default Componenst