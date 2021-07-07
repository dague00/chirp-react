import { AllChirps } from './components/AllChirps';
import { Row, Col, Container } from 'reactstrap';
import './css/bootstrap.min.css';
import './css/style.css';

function App() {
  return (
    <Container fluid className="flex main-container text-light">
      <Row>
        <Col xs="4" className="user-col">
          
        </Col>
        <Col xs="8" className="chirps-col">
          <div className="chirps-box">
            <AllChirps />
          </div>
        </Col>
      </Row>
      </Container>
    );
}

export default App;