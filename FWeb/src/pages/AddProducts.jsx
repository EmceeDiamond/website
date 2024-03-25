import { Product } from "./Product"
import { HeadlinesProduct } from "./Headlines_Product"
import { useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux";
import { initialState } from "../storeProvider/store";

export default function AddProducts() {
    const navigate = useNavigate()
    const data = useSelector((state) => state.product)

    var difference = data.filter(x => initialState.product.indexOf(x) === -1);
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch("http://localhost:8000/add_products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(difference)
        })
        const body = await res.json([])
        console.log(body)
        navigate("/thanks")
    }
    return(
    <div>
        <div className="container">
            <h1 className="text-center">Specify the products</h1> 
            <form onSubmit={handleSubmit}>
                <HeadlinesProduct />
                {Array.apply(0, Array(94)).map(function (x, i) {
                return <Product key={i} />;
            })}
                <button id = "submit-button-form" type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>
    </div>
    )

}