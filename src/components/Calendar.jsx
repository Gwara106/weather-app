import "boxicons";
import React, { useState } from "react";
import "./Calendar.css";
import Sidebar from "./Sidebar";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

const Calendar = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState({ hours: "00", minutes: "00" });
  const [eventText, setEventText] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    const today = new Date();
    if (clickedDate >= today || isSameDay(clickedDate, today)) {
      setSelectedDate(clickedDate);
      setShowEventPopup(true);
      setEventText("");
      setEventTime({ hours: "00", minutes: "00" });
      setEditingEvent(null);
    }
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const handleEventSubmit = async () => {
    const newEvent = {
      id: editingEvent ? editingEvent.id : Date.now(),
      date: new Date(selectedDate.setHours(parseInt(eventTime.hours), parseInt(eventTime.minutes))),
      time: `${eventTime.hours}:${eventTime.minutes}`,
      text: eventText,
    };

    let updatedEvents = [...events];
    if (editingEvent) {
      updatedEvents = updatedEvents.map((event) =>
        event.id === editingEvent.id ? newEvent : event
      );
    } else {
      updatedEvents.push(newEvent);
    }

    updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    setEvents(updatedEvents);
    setEventTime({ hours: "00", minutes: "00" });
    setEventText("");
    setShowEventPopup(false);
    setEditingEvent(null);
  };

  const handleEditEvent = (event) => {
    setSelectedDate(new Date(event.date));
    setEventTime({
      hours: event.time.split(":")[0].padStart(2, "0"),
      minutes: event.time.split(":")[1].padStart(2, "0"),
    });
    setEventText(event.text);
    setEditingEvent(event);
    setShowEventPopup(true);
  };

  const handleDeleteEvent = async (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setEventTime((prevTime) => ({
      ...prevTime,
      [name]: value.padStart(2, "0"),
    }));
  };

  return (
    <div className="Mainbody">
      <div>
        <Sidebar />
      </div>
      <div className="calendar-app">
        <div className="calendar">
          <h1 className="heading">Calendar</h1>
          <div className="navigate-date">
            <h2 className="month">{monthsOfYear[currentMonth]},</h2>
            <h2 className="year">{currentYear}</h2>
            <div className="buttons">
              <i className="bx bx-chevron-left" onClick={prevMonth}></i>
              <i className="bx bx-chevron-right" onClick={nextMonth}></i>
            </div>
          </div>
          <div className="weekdays">
            {daysOfWeek.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="days">
            {[...Array(firstDayOfMonth).keys()].map((_, index) => (
              <span key={`empty-${index}`} />
            ))}
            {[...Array(daysInMonth).keys()].map((day) => (
              <span
                key={day + 1}
                className={
                  day + 1 === currentDate.getDate() &&
                  currentMonth === currentDate.getMonth() &&
                  currentYear === currentDate.getFullYear()
                    ? "current-day"
                    : ""
                }
                onClick={() => handleDayClick(day + 1)}
              >
                {day + 1}
              </span>
            ))}
          </div>
        </div>
        <div className="events">
          {showEventPopup && (
            <div className="event-popup">
              <div className="time-input">
                <div className="event-popup-time">Time</div>
                <input
                  type="number"
                  name="hours"
                  min={0}
                  max={24}
                  className="hours"
                  value={eventTime.hours}
                  onChange={handleTimeChange}
                />
                <input
                  type="number"
                  name="minutes"
                  min={0}
                  max={60}
                  className="minutes"
                  value={eventTime.minutes}
                  onChange={handleTimeChange}
                />
              </div>
              <textarea
                placeholder="Add Event (Maximum 60 Characters)"
                value={eventText}
                onChange={(e) => {
                  if (e.target.value.length <= 60) {
                    setEventText(e.target.value);
                  }
                }}
              ></textarea>
              <button className="event-pop-up-btn" onClick={handleEventSubmit}>
                {editingEvent ? "Update Event" : "Add Event"}
              </button>
              <button
                className="close-event-popup"
                onClick={() => setShowEventPopup(false)}
              >
                <i className="bx bx-x"></i>
              </button>
            </div>
          )}
          {events.map((event) => {
            const eventDate = event.date instanceof Date ? event.date : new Date();
            return (
              <div className="event" key={event.id}>
                <div className="event-date-wrapper">
                  <div className="event-date">{`${
                    monthsOfYear[eventDate.getMonth()]
                  } ${eventDate.getDate()}, ${eventDate.getFullYear()}`}</div>
                  <div className="event-time">{event.time || "00:00"}</div>
                </div>
                <div className="event-text">{event.text}</div>
                <div className="event-buttons">
                  <i
                    className="bx bx-edit-alt"
                    onClick={() => handleEditEvent(event)}
                  ></i>
                  <i
                    className="bx bx-message-alt-x"
                    onClick={() => handleDeleteEvent(event.id)}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;