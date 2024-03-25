import { useContext } from "react";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import {AuthContext} from "../AppProvider"
import Admin from "./Admin";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute() {
    const { isAuthenticated } = useAuth(); // используем контекст для получения значения isAuthenticated
    const location = useLocation(); // получаем текущий маршрут с помощью хука useLocation()
  
    return (
      // если пользователь авторизован, то рендерим дочерние элементы текущего маршрута, используя компонент Outlet
      isAuthenticated === true ? (
        <Outlet />
      ) : (
        // если пользователь не авторизован, то перенаправляем его на маршрут /login с помощью компонента Navigate
        // свойство replace указывает, что текущий маршрут будет заменен на новый, чтобы пользователь не мог вернуться обратно, используя кнопку "назад" в браузере.
        <Navigate to="/login" state={{ from: location }} replace />
        //<Admin/>
      )
    );
  };