import React from 'react';

/* 
    props.requestTypes: { 
        "idRequest": ...
        "serviceTime": ...
        "requestName": ...
    }
*/

class ServingTickets extends React.Component {

    componentDidMount() {
        this.props.getServingTickets();
    }

    render() {
        /*console.log("servingTickets: " + JSON.stringify(this.props.servingTickets))
        for(const r of this.props.requestTypes) {
            console.dir(`this.props.servingTickets[${r.idRequest}]: ` + this.props.servingTickets[r.idRequest])
        }*/

        return(
            <table className='table '>
                <thead>
                <tr>
                    <th className='col-4'>Service</th>
                    <th className='col-2'>Ticket n°</th>
                    <th className="col-2">Counter id</th>
                </tr>
                </thead>
                <tbody>{
                    this.props.requestTypes.map((r) => <TicketRow key={r.idRequest} request={{...r, ticketNumber: this.props.servingTickets[r.idRequest]?.ticketNumber, counterId: this.props.servingTickets[r.idRequest]?.counterId}}/>)
                }
                </tbody>
            </table>
        )
    }
}

function TicketRow(props) {
    return <tr><TicketRowData requestName={props.request.requestName} ticketNumber={props.request.ticketNumber} counterId={props.request.counterId}/></tr>
}

function TicketRowData(props) {
    return <>
        <td>{props.requestName}</td>
        <td>{props.ticketNumber}</td>
        <td>{props.counterId}</td>
    </>;
}

export default ServingTickets;