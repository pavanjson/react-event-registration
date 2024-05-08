import { useState, useEffect } from "react";
import EventModel from "../interfaces/EventModel";
import logo from "../assets/logo.png";
import moment from "moment";
import NumberCard from "./NumberCard";
import EventStatusBadge from "./EventStatusBadge";
import "../assets/EventItem.css";

interface Props {
  eventModel: EventModel;
}

const EventItem = (props: Props) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const eventDate = new Date(
      moment(props.eventModel.date).format("YYYY-MM-DDTHH:mm:ss.SSS")
    );
    const now = new Date();
    const difference = eventDate.getTime() - now.getTime();

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const formatNumber = (number: number) => {
        return number < 10 ? "0" + number : number;
      };

      return {
        days: formatNumber(days),
        hours: formatNumber(hours),
        minutes: formatNumber(minutes),
        seconds: formatNumber(seconds),
      };
    } else {
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }
  }
  const image = `${import.meta.env.VITE_API_GET_EVENTS_URL}/${
    props.eventModel.eventCode
  }/poster`;

  return (
    <>
      <div className="col-md-3 my-3">
        <div className="card event-card">
          <img
            className="card-img-top"
            src={image}
            onError={({ currentTarget }) => {
              currentTarget.src = logo;
            }}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{props.eventModel.eventName}</h5>
            <p className="card-text">{props.eventModel.description}</p>
            <p className="card-text">Time Left:</p>
            <div className="number-container">
              <NumberCard name="days" number={timeLeft.days} />
              <NumberCard name="hours" number={timeLeft.hours} />
              <NumberCard name="min" number={timeLeft.minutes} />
              <NumberCard name="sec" number={timeLeft.seconds} />
            </div>
          </div>
          <EventStatusBadge isActive={props.eventModel.isActive} />
        </div>
      </div>
    </>
  );
};

export default EventItem;
