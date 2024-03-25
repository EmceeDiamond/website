import { NavLink } from 'react-router-dom'
import useAuth from "../hooks/useAuth";
import { useSelector } from 'react-redux';
import { initialState } from '../storeProvider/store';
import { provider_state } from '../storeProvider/reducerProvider';

export function AdminPages() {
  const { setAuth } = useAuth();
  const data_Product = useSelector((state) => state.product)
  const data_Provider = useSelector((state) => state.provider)
  var difference_Product = data_Product.filter(x => initialState.product.indexOf(x) === -1);
  var difference_Provider = data_Provider.filter(x => initialState.provider.indexOf(x) === -1);
  //console.log(data_Provider)
  //console.log(provider_state)
  //console.log(difference_Provider)
  var delete_Product = initialState.product.filter(({ element_id: id1 }) => !data_Product.some(({ element_id: id2 }) => id2 === id1));
  var delete_Provider = initialState.provider.filter(({provider_id: id1}) => !data_Provider.some(({provider_id: id2}) => id2 === id1));
  const handleSubmit = async() => {
    setAuth(false)
    if (difference_Product.length > 0){
      const res_Product = await fetch(`http://localhost:8000/product/update_products`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(difference_Product)
      })
      console.log(res_Product.json())
    }

    if (difference_Provider.length > 0){
      const res_Provider = await fetch(`http://localhost:8000/provider/update_providers`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(difference_Provider)
      })
      console.log(res_Provider.json())
    }

    if (delete_Product.length > 0){
      const res = await fetch(`http://localhost:8000/delete_products`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(delete_Product)
      })
      console.log(res.json())
    }

    if (delete_Provider.length > 0){
      const res = await fetch(`http://localhost:8000/delete_providers`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(delete_Provider)
      })
      console.log(res.json())
    }
    

  }
    return (
      <div>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div style={{ margin: "10px" }}>
            <NavLink to="/admin/get_product" style={({ isActive }) => ({
                                color: isActive
                                    ? "green"
                                    : "black",
                            })}>Product</NavLink>
          </div>
          <div style={{ margin: "10px" }}>
            <NavLink to="/admin/get_provider" style={({ isActive }) => ({
                                color: isActive
                                    ? "green"
                                    : "black",
                            })}>Supplier</NavLink>
          </div>
          <div style={{ margin: "10px" }} className="topnav-right">
            <NavLink to="/" style={({ isActive }) => ({
                                color: isActive
                                    ? "green"
                                    : "black",
                            })} onClick={handleSubmit}>Log Out</NavLink>
          </div> 
        </nav>

      </div>
    )
  }