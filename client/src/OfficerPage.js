import React from 'react';
import { Alert, Container, Row, Col, Dropdown, Button, Modal } from 'react-bootstrap'
import API from './API';

class OfficerPage extends React.Component {
    constructor(props){
        super(props);
        
        this.state = { 
            counterId: 1, 
            counterList: [],
            ticketNumber: -1,         //current ticket that the officer is serving
            showModal: false
        };
    }

    render(){
        return <>
            <Container fluid>
                <Row>
                    <Col className='col-3'>
                        <Alert variant='info'>You are serving at counter: {this.state.counterId}</Alert>
                    </Col>

                    <Col className='col-2'>
                        <Dropdown className='mt-2'>
                            <Dropdown.Toggle variant='danger'>Change counter:</Dropdown.Toggle>

                            <Dropdown.Menu>
                                {this.state.counterList.map( (c) => {return this.createDropdownItem(c)} )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>

                <Row>
                    <Col className='col-3'>
                        { (this.state.ticketNumber !== -1) && (<Alert variant='info'>You are serving ticket number: {this.state.ticketNumber}</Alert>)}
                        { (this.state.ticketNumber === -1) && (<Alert variant='warning'>You have no customer to serve</Alert>)}
                    </Col>

                    <Col className='col-2'>
                        <Button className='mt-2' variant='success' onClick={this.updateTicketNumber}>Call next customer</Button>
                    </Col>
                </Row>
                
                <Modal show={this.state.showModal} animation={false}>
                	<Modal.Header>
                		<Alert variant='success'>No new customers to serve!</Alert>
                	</Modal.Header>
                	
                	<Modal.Footer>
                		<Button onClick={() => {this.setState({ showModal: false });}}>Close</Button>
                	</Modal.Footer>
                </Modal>
                
            </Container>
        </>
    }

    componentDidMount = () => {
        this.updateCounterList();
    }

    updateCounterList = () => {
        //this should get the counter list from the server

        API.getAllCounters()
        .then((res) => {
            /*
            res is an array of objects with also the request types for each counter

            so here you can also have information about which requests you can serve
            */
           
            var allCountersIds = res.map(c => c.idCounter);
            var counters_unique = [...new Set(allCountersIds)];
            this.setState({ counterList : counters_unique });
        })
        .catch((err) => {
            console.log('error in getting list of counters from server:');
            console.log(err);
        })
    }

    createDropdownItem = (counterId) => {
        return <Dropdown.Item key={counterId} onClick={() => {this.changeCurrentCounter(counterId)}}>
            {counterId}
        </Dropdown.Item>
    }

    changeCurrentCounter = (counterId) => {
        this.setState({ counterId: counterId });
    }

    updateTicketNumber = () => {
        /*
        - this shuld get the next ticket number to serve from the server
        - to access the current counter number, use this.state.counterId
        - to indicate that there is no new customer to serve, set newTicketNumber = -1
        */

        /*
        if(this.state.ticketNumber !== -1){
            API.putTicketServed(this.state.ticketNumber);
        }
        */

        API.getTicketToBeServed(this.state.counterId, this.state.ticketNumber)
        .then((res) => {
        	if(res === -2){
        		console.log('error in update (from server, in /getTicketToBeServed)');
        	}
            else if (res !== 0){
                var newTicketNumber = res.ticketToTake;
                this.setState({ ticketNumber: newTicketNumber });
            }
            else{ //if res === 0 there is no new ticket to serve
                this.setState({ ticketNumber: -1, showModal: true });
                API.putCounterReady(this.state.counterId);
            }
        })
        .catch((err) => {
            console.log('error in API.getTicketToBeServed');
            console.log(err);
        });        
    }
}

export default OfficerPage;
