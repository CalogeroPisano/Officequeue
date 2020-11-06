import React from 'react';
import API from './API';
import TopBar from './TopBar';
import TicketForm from './TicketForm';
import OfficerPage from './OfficerPage';
import LoginForm from './LoginForm';
import ServingTickets from './ServingTickets';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,           
      requestTypes: [],
      servingTickets: [],
      ticket: undefined,
      numberOfCustomers: undefined,
    };
  }

  componentDidMount() {
    this.getRequestTypes();
  }

  refreshServingTickets = setInterval (() => {this.getServingTickets()}, 10000);

  getRequestTypes = () => {
    API.getRequestTypes().then((types) => { 
      this.setState({requestTypes: types}); 
      this.getServingTickets();
    });
  }
  
  getServingTickets = () => {
    API.getServingTickets().then((tickets) => {
      const servingTickets = {};
      for(const req of this.state.requestTypes) {
        const found = tickets.find(t => t.idRequest == req.idRequest);
        if(found === undefined) {
          servingTickets[req.idRequest] = {
            ticketNumber: '-',
            counterId: '-', 
          };
        } else {
          servingTickets[req.idRequest] = {
            ticketNumber: found.ticketNumber,
            counterId: found.idCounter, 
          };
        }
      }
      this.setState({servingTickets: servingTickets}) 
    });
  }


  createNewTicket = (type) => {
    API.createNewTicket(type).then((ticket) => {
      this.setState({ticket: ticket});
      this.getNumberOfCustomers(type);
    })
      .catch((e) => {
        console.log("Error in get a new ticket: " + e);
      });
  }

  getNumberOfCustomers = (type) => {
    API.getNumberOfCustomers(type).then((n) => {this.setState({numberOfCustomers: n})});
  }

  setLoggedIn = (name) => {
    this.setState({loggedin: true});
  }

  logout = () =>{
    this.setState({loggedin: false});
    API.logout()
    .then(() => {
    	console.log('logout success');
    })
    .catch(() => {
    	console.log('error during logout');
    });
  }

  render(props) {
    return (
      <Router>
        <TopBar loggedin = {this.state.loggedin} logout={this.logout} ></TopBar>
        <Switch>
          <Route path="/login">
            <Row className="height-100">
              <Col sm={4}></Col>
              <Col sm={4} className="below-nav my-2">
                <LoginForm setLoggedIn={this.setLoggedIn}/>
              </Col>
            </Row>
          </Route>

          <Route path="/officer">
            <OfficerPage/>
          </Route>

          <Route path="/">
            <ServingTickets requestTypes={this.state.requestTypes} servingTickets={this.state.servingTickets} getServingTickets = {this.getServingTickets}/>
            <TicketForm createNewTicket = {this.createNewTicket} requestTypes = {this.state.requestTypes} ticket = {this.state.ticket} getNumberOfCustomers = {this.getNumberOfCustomers} numberOfCustomers = {this.state.numberOfCustomers} defaultType = {this.state.requestTypes[0]}></TicketForm>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
