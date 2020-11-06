import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class TicketForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {type: undefined};
    }

    componentDidMount() {
        this.props.getNumberOfCustomers(1);
    }

    updateField = (name, value) => {
        this.setState({[name]: value});

        //Conversione da requestName a idRequest
        let id = undefined;
        for(let type of this.props.requestTypes) {
            if(type.requestName === value) {
                id = type.idRequest;
            }
        }
        this.props.getNumberOfCustomers(id);
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        //Se si clicca su take a ticket senza aver selezionato una scelta, viene preso in automatico la prima opzione (quella visualizzata)
        let selectedType = undefined;
        if(this.state.type === undefined) {
            selectedType = this.props.defaultType.requestName;
        } else {
            selectedType = this.state.type;
        }
        let id = undefined;
        for(let type of this.props.requestTypes) {
            if(type.requestName === selectedType) {
                id = type.idRequest;
            }
        }
        this.props.createNewTicket(id);
    }

    render() {
        return(
            <>
            <Container fluid>
                <Row>
                    <Col>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="my-3" controlId="formTicket">
                            <Form.Label>Type of request</Form.Label>
                            <Form.Control as="select" name="type" onChange={(ev) => this.updateField(ev.target.name, ev.target.value)}>
                                {this.props.requestTypes.map((type) => <option key={type.idRequest}>{type.requestName}</option>)}
                            </Form.Control>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Take a ticket
                            </Button>
                        </Form>
                    </Col>

                    <Col>
                        <Alert className="my-5" variant='primary'>{this.props.numberOfCustomers} customers are waiting for this service.</Alert>
                    </Col>
                </Row>
                
                {this.props.ticket === undefined ? null : <Alert variant='primary'> Your ticket number: <b>{this.props.ticket.ticketNumber}</b></Alert>}
            </Container>
            </>
        )
    }
}

export default TicketForm