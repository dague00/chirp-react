import { MainComponent } from './components/MainComponent';
import { Row, Col, Container } from 'reactstrap';
import './css/bootstrap.min.css';
import './css/style.css';
import { config } from "dotenv";
config();

function App() {
  return (
    <Container fluid className="flex main-container text-light">
      <Row>
        <Col xs="4" className="user-col">
          
        </Col>
        <Col xs="8" className="main-component-col">
          <div className="main-component-box">
            <MainComponent />
          </div>
        </Col>
      </Row>
      </Container>
    );
}

export default App;