import React from 'react';
import '../Agenda/Agenda.css';

export default class Agenda extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            // Object.keys(this.props).length === 0 ? <p>You have no posts planned yet...</p> :
            <div className="center">
                <div className="container">
                    <h3>Title</h3>
                    <p>some text bla bla bla...</p>
                    <hr/>
                    <div style={{float: "left"}}>
                        <p>socials:</p>
                    </div>
                    <div style={{float: "right"}}>
                        <p>time: {this.props.time}</p>
                    </div>
                </div>
            </div>
        )
    }
}