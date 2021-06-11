import React from "react";
import Calendar_Components from "./calendar/calendar_components.js";

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, "");

class Schedule extends React.Component {
  constructor() {
    super();
    this.state = {
      EVENTS_LOAD: [],
    };
  }

  call_back = (title, startDate, endDate) => {
    console.log(title, startDate, endDate);
    this.setState({
      EVENTS_LOAD: [
        ...this.state.EVENTS_LOAD,
        { title: title, startDate: startDate, endDate: endDate },
      ],
    });
  };

  render() {
    return (
      <div>
        <Calendar_Components
          EVENTS_LOAD={this.state.EVENTS_LOAD}
          call_back={this.call_back}
        />
      </div>
    );
  }
}

export default Schedule;
