import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import * as actions from '../storeProvider/actions';
import { useDispatch } from "react-redux";

export default function AddEmployee() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        provider_name: "",
        INN: "",
        contact_details: "",
        RF: ""
    })

    const dispatch = useDispatch();

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({...data, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {provider_name, INN, contact_details, RF} = data
        const res = await fetch("http://localhost:8000/add_providers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({provider_name, INN, contact_details, RF})
        })
        const body = await res.json()
        console.log(body)
        navigate("/add_product")
        dispatch(actions.addProvider({
            provider_name: data.provider_name,
            INN: data.INN,
            contact_details: data.contact_details, 
            RF: data.RF,
            status: "Active",
            rating: 0
          }));
    }

  return (
    <div>
        <div className="container-captha">
            <h1 className="text-center">Provide general information about the company</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="provider_name" className="form-lable">Name of the organization</label>
                    <input type="text" className="form-control" name="provider_name" id="provider_name" onChange={handleInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="INN" className="form-lable">Individual Tax-payer Number</label>
                    <input type="text" className="form-control" name="INN" id="INN" onChange={handleInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="contact_details" className="form-lable">Contact details</label>
                    <input type="text" className="form-control" name="contact_details" id="contact_details" onChange={handleInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="RF" className="form-lable">Are you from the Russian Federation?</label>
                    <input type="text" className="form-control" name="RF" list="RF" onChange={handleInput} />
                    <datalist id="RF">
                        <option value="Yes" className="form-control">Yes</option>
                        <option value="Not" className="form-control">Not</option>
                    </datalist>
                </div>
                <button id = "submit-button" type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>
    </div>
  )
}