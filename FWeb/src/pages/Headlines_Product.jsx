import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const HeadlinesProduct = () => {

return (
    <div>
        <div className="container">
                <Row>
                    <Col>
                    <div className="mb-3">
                        <label className="form-lable" htmlFor="element_name">Name</label>
                    </div>
                    </Col>
                    <Col>
                    <div className="mb-3">
                        <label className="form-lable" htmlFor="price">Price, USD</label>
                    </div>
                    </Col>
                    <Col>
                    <div className="mb-3">
                        <label className="form-lable" htmlFor="deadline">Delivery time</label>
                    </div>
                    </Col>
                </Row>
        </div>
    </div>
  )
}