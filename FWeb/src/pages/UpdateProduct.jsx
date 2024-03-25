import { useEffect, useState } from "react";
import * as actions from '../storeProvider/actions';
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function UpdateProduct() {
    const navigate = useNavigate()
    const {element_id} = useParams()
    const store = useSelector((state) => state.product)
    const store_filter = store.filter((product) => product.element_id === element_id)
    const [data, setData] = useState([])
    const [dataUpdate, setDataUpdate] = useState({
        provider_id:"",
        element_name: "",
        quantity: "",
        price: "",
        amount: "",
        deadline: "",
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

        dataUpdate.amount = String(Number(dataUpdate.price) * 500)
        dispatch(actions.updateProduct({
            provider_id: dataUpdate.provider_id,
            element_id: element_id,
            element_name: dataUpdate.element_name,
            quantity:500,
            price: dataUpdate.price,
            amount: dataUpdate.amount,
            deadline: dataUpdate.deadline,
        }));
        navigate("/admin/get_product")
    }

    return (
        <div>
            <Navbar/>
            <div className="container">
                <button type="button" id="myButton" className="myButtonBack" onClick={() =>{navigate("/admin/get_product")}}>Back</button>
                <h1 className="text-center">Update Employee {data.element_name}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="element_name" className="form-lable">Name</label>
                        <input type="text" className="form-control" name="element_name" id="element_name"  onChange={handleInput} defaultValue={data.element_name}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-lable">Price</label>
                        <input type="text" className="form-control" name="price" id="price" defaultValue={data.price} onChange={handleInput} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="deadline" className="form-lable">Deadline</label>
                        <input type="text" className="form-control" name="deadline" id="deadline" onChange={handleInput}  defaultValue={data.deadline}/>
                    </div>

                    <button type="submit" className="btn btn-warning w-100">Submit</button>
                </form>
            </div>
        </div>
    )
}