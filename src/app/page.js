"use client";
import Header from "./_components/header";
import Filter from "./_components/filter";
import FlightDetailBox from "./_components/flightDetailBox";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [flights, setFlights] = useState([]);
  const [isArrival, setIsArrival] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

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

  const formatTime = (dateString) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Unknown";
    }

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  };

  const getFlights = () => {
    axios
      .post("/api/getFlights", {
        flightDirection: isArrival === true ? "A" : "D",
        fromDate: fromDate.toLocaleDateString("en-GB"), // Format as dd-MM-yyyy
        toDate: toDate.toLocaleDateString("en-GB"), // Format as dd-MM-yyyy
      })
      .then((res) => {
        setFlights(res.data.flights);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getFlights();
  }, [isArrival, fromDate, toDate]);

  return (
    <main className="flex min-h-screen flex-col p-8 bg-gray-200">
      <Header />
      <Filter
        isArrival={isArrival}
        setIsArrival={setIsArrival}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />
      <div className="flex flex-col gap-8">
        {flights?.map((flight) => {
          const estimatedLandingTime = formatTime(flight.estimatedLandingTime);
          const scheduleDateTime = formatTime(flight.scheduleDateTime);
          return (
            <FlightDetailBox
              key={flight.id}
              from={
                isArrival !== true
                  ? flight.publicFlightState.flightStates[0]
                  : flight.route.destinations[0]
              }
              destination={
                isArrival === true
                  ? flight.publicFlightState.flightStates[0]
                  : flight.route.destinations[0]
              }
              flightName={flight.flightName}
              estimatedLandingTime={estimatedLandingTime}
              flightDuration={calculateFlightDuration(
                flight.scheduleDateTime,
                flight.estimatedLandingTime
              )}
            />
          );
        })}
      </div>
    </main>
  );
}
