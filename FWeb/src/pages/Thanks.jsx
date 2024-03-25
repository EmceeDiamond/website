import { NavLink } from "react-router-dom"

export default function Thanks(){
    const handleSubmit = () => {
        //window.location.reload();
        window.location.replace('http://localhost:3000/ ');
    }
    
    return(
        <div>
            <nav>
                <NavLink to="/" style={({ isActive }) => ({
                                color: isActive
                                    ? "green"
                                    : "black",
                            })} onClick={handleSubmit}>To the main page</NavLink>
            </nav>

            <h1>Thank you for leaving a request</h1>
        </div>
    )
}