import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import * as actions from '../storeProvider/actions';
import { useDispatch, useSelector } from 'react-redux';
import { initialState } from '../storeProvider/store';

export const Product = () => {
const store = useSelector((state) => state.provider)
var difference = store.filter(x => initialState.provider.indexOf(x) === -1);
const [dataStore, setDataStore] = useState([])
const [data, setData] = useState({
    element_name: "",
    price: "",
    deadline: "",
})

useEffect(() => {
    difference.map((item) => setDataStore(item))
})
console.log(dataStore)
console.log(store)

const dispatch = useDispatch();

const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({...data, [name]: value});
}

const handleSubmit = async (e) => {
    e.preventDefault()
    const amount_ctr = String(Number(data.price)*500);
    if (data.element_name !== "" && data.price !== "" && data.deadline !== ""){
        dispatch(actions.addProduct({
            provider_id: dataStore.provider_id,
            element_name: data.element_name,
            quantity:500,
            price: data.price,
            amount: amount_ctr,
            deadline: data.deadline,
        }));
    }
    
}

return (
    <div onBlur={handleSubmit}>
        <div className="container" >
            <form>
                <Row>
                    <Col>
                    <div className="mb-3">
                        <input type="text" className="form-control" name="element_name" id="element_name" onChange={handleInput} />
                    </div>
                    </Col>
                    <Col>
                    <div className="mb-3">
                        <input type="number" step={0.01} className="form-control" name="price" id="price" onChange={handleInput}/>
                    </div>
                    </Col>
                    <Col>
                    <div className="mb-3">
                        <input type="text" className="form-control" name="deadline" id="deadline" onChange={handleInput} />
                    </div>
                    </Col>
                </Row>
            </form>
        </div>
    </div>
  )
}