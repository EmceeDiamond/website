import { useState} from "react";
//import {AuthContext} from "../AppProvider"
import {useNavigate, useLocation} from 'react-router-dom';
import useAuth from "../hooks/useAuth";


export default function Authorization(){
    const { isAuthenticated, setAuth } = useAuth(); // используем контекст для получения значений isAuthenticated и setAuth
    const navigate = useNavigate(); // используем хук useNavigate для навигации по маршрутам
    const location = useLocation(); // используем хук useLocation для получения текущего маршрута
    const from = location.state?.from?.pathname || "/";
    
    const [data, setData] = useState({
        login: "",
        password: ""
    })
    const Login = "Login"
    const Password = "password"

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({...data, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (data.login === Login && data.password === Password){
            console.log("yes")
            setAuth(true); // устанавливаем флаг isAuthenticated в true
            navigate(from, { replace: true });
            console.log(isAuthenticated )
        }
        else {
            alert('Incorrect');
        }
    }

    return(
        <div>
        <div className="container-captha">
            <h1 className="text-center">Authorization</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="login" className="form-lable">Login</label>
                    <input type="text" className="form-control" name="login" id="login" onChange={handleInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-lable">Password</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={handleInput} />
                </div>
                <button id = "submit-button" type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>
    </div>
  )
}