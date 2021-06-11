import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId } from "./event-utils";
import "./calendar_components.css";
import { Grid } from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";

class Calendar_Components extends React.Component {
  constructor() {
    super();
    this.state = {
      weekendsVisible: true,
      currentEvents: [],
      updateId: "",
      show: false,
    };
  }

  render() {
    return (
      <div className='calendar ' style={{ marginTop: "20px" }}>
        <Grid container direction='row'>
          <Grid item lg={1} sm={1} xs={1} />
          <Grid item lg={4} md={5} sm={4} xs={10}>
            {this.props.EVENTS_LOAD.length === 0 ? (
              <div style={{ marginTop: "30px" }}>
                <EventIcon style={{ fontSize: "300px" }} />
              </div>
            ) : (
              <div className='sideBar'>
                {this.props.EVENTS_LOAD.map((obj, i) =>
                  this.renderSidebarEvent(obj)
                )}
              </div>
            )}
          </Grid>
          <div style={{ margin: "auto", marginTop: "30px" }}>
            {!this.state.show && (
              <button
                onClick={() => this.setState({ show: true })}
                className='button'
              >
                Book Calendar
              </button>
            )}
          </div>
          {this.state.show && (
            <Grid
              item
              lg={6}
              md={7}
              sm={6}
              xs={12}
              style={{ marginTop: "30px" }}
            >
              <div className='sccroll' style={{ margin: "auto" }}>
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  calendar
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth",
                  }}
                  initialView='dayGridMonth'
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  eventResizableFromStart={true}
                  dayMaxEvents={true}
                  eventOverlap={false}
                  weekends={this.state.weekendsVisible}
                  initialEvents={this.props.EVENTS_LOAD} // alternatively, use the `events` setting to fetch from a feed
                  select={this.handleDateSelect}
                  eventContent={this.renderEventContent} // custom render function
                  eventClick={this.handleEventClick}
                  eventStartEditable={this.update_function}
                  eventsSet={this.handleEvents}
                  eventResize={this.resize}
                  eventDragStart={this.handle} // called after events are initialized/added/changed/removed
                />
              </div>
            </Grid>
          )}
        </Grid>
      </div>
    );
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  };

  handle = (events) => {
    this.setState({ updateId: events.event.id });
  };
  handleDateSelect = (selectInfo) => {
    let id;

    let title = prompt("Please enter a new title for your event");
    console.log(title);
    if (title === null || title === "") {
      alert("title cannot be empty");
      return;
    }
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    this.props.call_back(title, selectInfo.startStr, selectInfo.endStr);
    this.setState({ show: false });
    calendarApi.addEvent({
      id: createEventId(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    });
  };

  handleEventClick = (clickInfo) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}' if yes enter anything else leave blank`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  resize = (event) => {
    let start1 = event.event.start;
    let end1 = event.event.end;
    let title1 = event.event.title;
    let color = event.event.backgroundColor;
  };

  handle = (events) => {
    this.setState({ updateId: events.event.id });
  };

  handleEvents = (events) => {
    for (let i = 0; i < events.length; i++) {
      if (this.state.updateId === events[i].id) {
        let start1 = events[i].startStr;
        let end1 = events[i].endStr;
        let title1 = events[i].title;
        let color = events[i].backgroundColor;
      }
    }
  };

  renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

  renderSidebarEvent = (event) => {
    var option = {};
    const options = new Date(event.start).toLocaleTimeString([], option);
    console.log(event);
    return (
      <div className='sideBarProperty'>
        <span>{event.startDate}</span>
        <span>
          {event.startDate !== event.endDate ? <>-{event.endDate}</> : null}
        </span>
        <br />
        <span>{"                                     " + event.title}</span>
        <br />
      </div>
    );
  };
}

export default Calendar_Components;
