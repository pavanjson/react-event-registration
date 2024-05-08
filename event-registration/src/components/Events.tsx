import { useEffect } from "react";
import EventItem from "./EventItem";
import "../assets/Events.css";
import { useAppDispatch, useAppSelector } from "../redux/state/store";
import { fetchData } from "../redux/state/action-creators";
import Loading from "./Loading";
import SearchBar from "./SearchBar";
const Events = () => {
  const { data, loading } = useAppSelector((state) => state.events);
  const eventDispatch = useAppDispatch();
  useEffect(() => {
    eventDispatch(fetchData(""));
  }, [eventDispatch]);
  return (
    <div className="row my-3">
      <h2>Events</h2>
      <SearchBar />
      {loading ? (
        <div className="loader-container">
          <Loading />
        </div>
      ) : data && data.length ? (
        data.map((event, index) => {
          return <EventItem key={index.toString()} eventModel={event} />;
        })
      ) : (
        <div className="loader-container">"No data Available"</div>
      )}
    </div>
  );
};

export default Events;
