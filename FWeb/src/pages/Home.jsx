//import AdminPage from "../components/Admin_Page";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {AdminPages} from "../components/Admn_Pages";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as actions from '../storeProvider/actions';

export default function Home() {
    const data = useSelector((state) => state.provider)
    const [dataHome, setData] = useState(null)
    const [dataStatus, setDataStatus] = useState("Active")
    const [dataRating, setDataRating] = useState({
        rating: ""
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        setData(data)
    }, [data]) 

    const Status = (status) =>{
        if (status === "Active"){
            return "Passive"
        }
        else{
            return "Active"
        }
    }

    const StatusName = (status) =>{
        if (status === "Active"){
            return "Reject"
        }
        else{
            return "Activate"
        }
    }

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDataRating({...dataRating, [name]: value});
    }

    const SaveRating = (item) =>{
        dispatch(actions.updateProvider({
            provider_id:item.provider_id, 
            provider_name: item.provider_name,
            INN: item.INN,
            contact_details: item.contact_details,
            RF: item.RF,
            status: item.status,
            rating: dataRating.rating}))
    }

    const [sortedField, setSortedField] = useState(null);
    const [sort, setSort] = useState(false)
    if (sortedField !== null) {
        if (sort === true)
            dataHome.sort((a, b) => {
            if (Number(a[sortedField]) < Number(b[sortedField])) {
                return -1;
            }
            if (Number(a[sortedField]) > Number(b[sortedField])) {
                return 1;
            }
            return 0;
            });
        else{
            dataHome.sort((a, b) => {
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
            {dataHome === null ? (
                <span>Loading...</span>
             ) : (
            <div className="container">
                <tr>
                            <th>
                                <button type="button" id="myButton"  onClick={() =>{setDataStatus("All")}}>All</button>
                            </th>
                            <th>
                                <button type="button" id="myButton" onClick={() =>{ setDataStatus("Active")}}>Active</button>
                            </th>
                            <th>
                                <button type="button" id="myButton" onClick={() =>{setDataStatus("Passive")}}>Passive</button>
                            </th>
                        </tr>
                <table className="table">
                    <thead>

                        <tr>
                            <th scope="col" className="el">                    
                                <button type="button" id="myButton" onClick={() => {setSortedField('provider_id'); setSort(!sort)}}>
                                #
                                </button></th>
                            <th scope="col" className="el">Name of the organization</th>
                            <th scope="col" className="el">Individual Tax-payer Number</th>
                            <th scope="col" className="el">Contact Details</th>
                            <th scope="col" className="el">Supplier from the Russian Federation</th>
                            <th scope="col" className="el">Status</th>
                            <th scope="col" className="el">                                
                                <button type="button" id="myButton" onClick={() => {setSortedField('rating'); setSort(!sort)}}>
                                    Rating
                                </button></th>
                            <th scope="col" className="el"></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {dataHome !== null && dataHome.map((item, index)=>{
                            if (item.status === dataStatus){
                                if (Number(item.rating) === 0){
                                    return  <tr key={index}>
                                            <th scope="row" className="el">{item.provider_id}</th>
                                            <td className="el">{item.provider_name}</td>
                                            <td className="el">{item.INN}</td>
                                            <td className="el">{item.contact_details}</td>
                                            <td className="el">{item.RF}</td>
                                            <td className="el">{item.status}</td>
                                            <td className="el"><input type="text" className="form-control" name="rating" id="rating" onChange={handleInput}/>
                                            
                                            <button type="button" id="myButtonProduct" onClick={() =>{SaveRating(item)}}>Save</button></td>
                                            <td className="el">
                                            <button type="button" onClick={() => navigate(`/update_provider/${item.provider_id}`)} id="myButton">Update</button>
                                            <button type="button" id="myButtonDel" onClick={() =>{ dispatch(actions.deleteProvider(item.provider_id)); dispatch(actions.deleteProductProvider(item.provider_id))}}>Delete</button>
                                            <button type="button" id="myButtonProduct" onClick={() => navigate(`/admin/get_provider/get_product/${item.provider_id}`)}>Product</button>
                                            <button type="button" id="myButtonUp" onClick={() => {dispatch(actions.updateProvider({
                                                    provider_id:item.provider_id, 
                                                    provider_name: item.provider_name,
                                                    INN: item.INN,
                                                    contact_details: item.contact_details,
                                                    RF: item.RF,
                                                    status: Status(item.status),
                                                    rating: item.rating}))}}> {StatusName(item.status)}</button></td>
                                           
                                        </tr>
                                        
                                    }
                                else{
                                    return  <tr key={index}>
                                        <th scope="row" className="el">{item.provider_id}</th>
                                        <td className="el">{item.provider_name}</td>
                                        <td className="el">{item.INN}</td>
                                        <td className="el">{item.contact_details}</td>
                                        <td className="el">{item.RF}</td>
                                        <td className="el">{item.status}</td>
                                        <td className="el">{item.rating}</td>
                                        <td className="el">
                                            <button type="button" onClick={() => navigate(`/update_provider/${item.provider_id}`)} id="myButton">Update</button>
                                            <button type="button" id="myButtonDel" onClick={() =>{ dispatch(actions.deleteProvider(item.provider_id)); dispatch(actions.deleteProductProvider(item.provider_id))}}>Delete</button>
                                            <button type="button" id="myButtonProduct" onClick={() => navigate(`/admin/get_provider/get_product/${item.provider_id}`)}>Product</button>
                                            <button type="button" id="myButtonUp" onClick={() => {dispatch(actions.updateProvider({
                                                provider_id:item.provider_id, 
                                                provider_name: item.provider_name,
                                                INN: item.INN,
                                                contact_details: item.contact_details,
                                                RF: item.RF,
                                                status: Status(item.status),
                                                rating: item.rating}))}}> {StatusName(item.status)}</button>
                                        </td>
                                    </tr>
                                }
                            }
                            if (dataStatus === "All"){
                                if (Number(item.rating) === 0){
                                    return  <tr key={index}>
                                            <th scope="row" className="el">{item.provider_id}</th>
                                            <td className="el">{item.provider_name}</td>
                                            <td className="el">{item.INN}</td>
                                            <td className="el">{item.contact_details}</td>
                                            <td className="el">{item.RF}</td>
                                            <td className="el">{item.status}</td>
                                            <td className="el"><input type="text" className="form-control" name="rating" id="rating" onChange={handleInput}/>
                                            <button type="button" id="myButtonProduct" onClick={() =>{SaveRating(item)}}>Save</button></td>
                                            <td className="el">
                                                <button type="button" onClick={() => navigate(`/update_provider/${item.provider_id}`)} id="myButton">Update</button>
                                                <button type="button" id="myButtonDel" onClick={() =>{ dispatch(actions.deleteProvider(item.provider_id)); dispatch(actions.deleteProductProvider(item.provider_id))}}>Delete</button>
                                                <button type="button" id="myButtonProduct" onClick={() => navigate(`/admin/get_provider/get_product/${item.provider_id}`)}>Product</button>
                                                <button type="button" id="myButtonUp" onClick={() => {dispatch(actions.updateProvider({
                                                    provider_id:item.provider_id, 
                                                    provider_name: item.provider_name,
                                                    INN: item.INN,
                                                    contact_details: item.contact_details,
                                                    RF: item.RF,
                                                    status: Status(item.status),
                                                    rating: item.rating}))}}> {StatusName(item.status)}</button>
                                            </td>
                                        </tr>
                                    }
                                else{
                                    return  <tr key={index}>
                                        <th scope="row" className="el">{item.provider_id}</th>
                                        <td className="el">{item.provider_name}</td>
                                        <td className="el">{item.INN}</td>
                                        <td className="el">{item.contact_details}</td>
                                        <td className="el">{item.RF}</td>
                                        <td className="el">{item.status}</td>
                                        <td className="el">{item.rating}</td>
                                        <td className="el">
                                            <button type="button" onClick={() => navigate(`/update_provider/${item.provider_id}`)} id="myButton">Update</button>
                                            <button type="button" id="myButtonDel" onClick={() =>{ dispatch(actions.deleteProvider(item.provider_id)); dispatch(actions.deleteProductProvider(item.provider_id))}}>Delete</button>
                                            <button type="button" id="myButtonProduct" onClick={() => navigate(`/admin/get_provider/get_product/${item.provider_id}`)}>Product</button>
                                            <button type="button" id="myButtonUp" onClick={() => {dispatch(actions.updateProvider({
                                                provider_id:item.provider_id, 
                                                provider_name: item.provider_name,
                                                INN: item.INN,
                                                contact_details: item.contact_details,
                                                RF: item.RF,
                                                status: Status(item.status),
                                                rating: item.rating}))}}> {StatusName(item.status)}</button>
                                        </td>
                                    </tr>
                                }
                            }                          
                        })}
                    </tbody>
                </table>
            </div>
            )}
        </div>
    )
}