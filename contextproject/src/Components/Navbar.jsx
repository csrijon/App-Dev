import { useContext } from "react"
import Componenst from "../Components/Componenst"
import { counterContext } from "../../context/Context"

const Navbar = () => {
    const value = useContext(counterContext)
    return (
        <div>
            i am a navbar
            <Componenst />
            <button onClick={() => value.setCount((count) => count + 1)}  >click</button>
        </div>
    )
}

export default Navbar