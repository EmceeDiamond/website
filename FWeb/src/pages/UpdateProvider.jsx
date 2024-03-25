import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import * as actions from '../storeProvider/actions';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function UpdateProvider() {
    const navigate = useNavigate()
    const {provider_id} = useParams()
    const store = useSelector((state) => state.provider)
    const store_filter = store.filter((provider) => provider.provider_id === provider_id)
    const [data, setData] = useState([])
    const [dataUpdate, setDataUpdate] = useState({
        provider_name: "",
        INN: "",
        contact_details: "",
        RF: "",
        rating: ""
    })
    

    const  dispatch = useDispatch()

    useEffect(()=>{
        store_filter.map((item) => {
            setData(item)
            setDataUpdate(item)
        })
    }, [store])
    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        setDataUpdate({...dataUpdate, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(actions.updateProvider({
            provider_id: provider_id,
            provider_name: dataUpdate.provider_name,
            INN: dataUpdate.INN,
            contact_details: dataUpdate.contact_details,
            RF: dataUpdate.RF,
            status: dataUpdate.status,
            rating: dataUpdate.rating,
        }));
        navigate("/admin/get_provider")
    }

    return (
        <div>
            <Navbar/>
            <div className="container">
                <button type="button" id="myButton" className="myButtonBack" onClick={() =>{navigate("/admin/get_provider")}}>Back</button>
                <h1 className="text-center">Update Employee {data.provider_name}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="provider_name" className="form-lable">Name of the organization</label>
                        <input type="text" className="form-control" name="provider_name" id="provider_name"  onChange={handleInput} defaultValue={data.provider_name}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="INN" className="form-lable">Individual Tax-payer Number</label>
                        <input type="text" className="form-control" name="INN" id="INN" defaultValue={data.INN} onChange={handleInput} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contact_details" className="form-lable">Contact details</label>
                        <input type="text" className="form-control" name="contact_details" id="contact_details" onChange={handleInput}  defaultValue={data.contact_details}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="RF" className="form-lable">Supplier from the Russian Federation</label>
                        <input type="text" className="form-control" name="RF" id="RF" onChange={handleInput} defaultValue={data.RF}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="RF" className="form-lable">Rating</label>
                        <input type="text" className="form-control" name="rating" id="rating" onChange={handleInput} defaultValue={data.rating}/>
                    </div>
                    <button type="submit" className="btn btn-warning w-100">Submit</button>
                </form>
            </div>
        </div>
    )
}