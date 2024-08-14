"use client";
import Header from "../_components/header";
import FlightDetailBox from "../_components/flightDetailBox";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [flights, setFlights] = useState([]);
  const [isArrival, setIsArrival] = useState(true);

  const [username, setUsername] = useState("AppFellas test user");

  const calculateFlightDuration = (scheduleDateTime, estimatedLandingTime) => {
    const departureTime = new Date(scheduleDateTime);
    const landingTime = new Date(estimatedLandingTime);

    // Difference in ms
    const durationMs = landingTime - departureTime;

    // Convert ms -> minutes
    const durationMinutes = Math.floor(durationMs / (1000 * 60));

    const hours = Math.floor(durationMinutes / 60) * -1;
    const minutes = (durationMinutes % 60) * -1;

    if (isNaN(hours) || isNaN(minutes)) {
      return "Unknown";
    }
    return `${hours}h ${minutes}m`;
  };

  const getSavedFlights = () => {
    axios
      .post("/api/getSavedFlights", {
        username,
      })
      .then((res) => {
        if (res.status === 200) setFlights(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getSavedFlights();
  }, []);

  return (
    <main className="flex min-h-screen flex-col p-8 bg-gray-200">
      <Header username={username} />

      <div className="flex flex-col gap-8">
        {flights?.map((flight) => {
          const estimatedLandingTime = flight.estimatedLandingTime;
          return (
            <FlightDetailBox
              key={flight._id}
              username={username}
              from={flight.from}
              destination={flight.destination}
              flightName={flight.flightName}
              estimatedLandingTime={flight.estimatedLandingTime}
              date={flight.estimatedLandingTime}
              flightDuration={flight.flightDuration}
            />
          );
        })}
      </div>
    </main>
  );
}
