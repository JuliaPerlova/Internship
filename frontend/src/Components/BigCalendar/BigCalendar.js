import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import React from 'react';

const localizer = momentLocalizer(moment)

export default class BigCakendar extends React.Component {
    constructor(props) {
        super(props)
        const events = [
            {
                id: 0,
                title: 'Event',
                start: moment().toDate(),
                end: moment().add(5, 's').toDate()
                
            },
            {
                id: 1,
                title: 'another event',
                start: moment().add(2, 'd').toDate(),
                end: moment().add(2, 'd').add(5, 's').toDate()
            }
        ]
        
        this.state = {
            events,
        }
    }
    render() {
        return(
            <div>
                <Calendar
                localizer={localizer}
                events={this.state.events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                />
            </div>
        )
    }
}