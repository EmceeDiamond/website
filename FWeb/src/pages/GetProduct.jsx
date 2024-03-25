import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {AdminPages} from "../components/Admn_Pages";
import { useDispatch } from "react-redux";
import * as actions from '../storeProvider/actions';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function GetProduct() {
    const data = useSelector((state) => state.product)
    const [dataProduct, setDataProduct] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        setDataProduct(data)
    }, [data])

    const [sortedField, setSortedField] = useState(null);
    const [sort, setSort] = useState(false)
    if (sortedField !== null) {
        if (sort === true)
            dataProduct.sort((a, b) => {
            if (Number(a[sortedField]) < Number(b[sortedField])) {
                return -1;
            }
            if (Number(a[sortedField]) > Number(b[sortedField])) {
                return 1;
            }
            return 0;
            });
        else{
            dataProduct.sort((a, b) => {
                if (Number(a[sortedField]) > Number(b[sortedField])) {
                    return -1;
                }
                if (Number(a[sortedField]) < Number(b[sortedField])) {
                    return 1;
                }
                return 0;
                });
        }
    }
    return (
        <div>
            <AdminPages />
            {dataProduct === null ? (
                <span>Loading...</span>
             ) : (
            <div className="container">
                
                <table className="table" id="ToBeApplied">
                    <thead>
                        <tr>
                            
                            <th className="el">
                                <button type="button" id="myButton" onClick={() => {setSortedField('element_id'); setSort(!sort)}}>
                                #
                                </button>
                            </th > 
                            <th scope="col" className="el">Supplier Id</th>
                            <th scope="col" className="el">Name</th>
                            <th scope="col" className="el">Quantity</th>
                            <th className="el">
                                <button type="button" id="myButton" onClick={() => {setSortedField('price'); setSort(!sort)}}>
                                Price, USD
                                </button>
                            </th>
                            <th scope="col" className="el">Amount, USD</th>
                            <th scope="col" className="el">Delivery time</th>
                            <th scope="col" className="el"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataProduct.map((item, index)=> (
                            <tr key={index}>
                                <th scope="row" className="el">{item.element_id}</th>
                                <td className="el">{item.provider_id}</td>
                                <td className="el">{item.element_name}</td>
                                <td className="el">{item.quantity}</td>
                                <td className="el"> {item.price}</td>
                                <td className="el">{item.amount}</td>
                                <td className="el">{item.deadline}</td>
                                <td className="el">
                                    <button type="button" onClick={() => navigate(`/update_product/${item.element_id}`)} id="myButton">Update</button>
                                    <button type="button" id="myButtonDel" onClick={() => dispatch(actions.deleteProduct(item.element_id))}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             )}
        </div>
      )
    }