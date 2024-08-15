"use client";
import Header from "./_components/header";
import Filter from "./_components/filter";
import FlightDetailBox from "./_components/flightDetailBox";
import axios from "axios";
import { useState, useEffect } from "react";
import Skeleton from "./_components/skeleton";

export default function Home() {
  const [flights, setFlights] = useState([]);
  const [isArrival, setIsArrival] = useState(true);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(
    new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  );
  const [username, setUsername] = useState("AppFellas test user");
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(true);
    axios
      .post("/api/getFlights", {
        flightDirection: isArrival === true ? "A" : "D",
        fromScheduleDate: fromDate.toISOString().split("T")[0],
        toScheduleDate: toDate.toISOString().split("T")[0],
      })
      .then((res) => {
        setFlights(res.data.flights);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // Calculate the difference in days between fromDate and toDate
    const timeDifference = new Date(toDate) - new Date(fromDate);
    const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

    if (dayDifference > 3) {
      // If toDate is more than 3 days ahead of fromDate, move toDate to 2 days ahead
      alert("The difference between dates cannot be more than 3 days.");
      setToDate(new Date(fromDate.getTime() + 2 * 24 * 60 * 60 * 1000));
    } else if (dayDifference < 0) {
      // If fromDate is greater than toDate, set toDate to 2 days ahead of fromDate and allow the user to select that date
      setToDate(new Date(fromDate.getTime() + 2 * 24 * 60 * 60 * 1000));
    }
  }, [fromDate, toDate]);

  useEffect(() => {
    getFlights();
  }, [isArrival, fromDate, toDate]);

  return (
    <main className="flex min-h-screen flex-col p-8 bg-gray-200">
      <Header username={username} />
      <Filter
        isArrival={isArrival}
        setIsArrival={setIsArrival}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />
      <div className="flex flex-col gap-8">
        {/* Display skeleton while the data is loading */}
        {isLoading === true ? (
          <Skeleton />
        ) : (
          flights?.map((flight) => {
            const estimatedLandingTime = formatTime(
              flight.estimatedLandingTime
            );
            return (
              <FlightDetailBox
                key={flight.id}
                username={username}
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
                date={flight.estimatedLandingTime}
                flightDuration={calculateFlightDuration(
                  flight.scheduleDateTime,
                  flight.estimatedLandingTime
                )}
                type="allFlights"
              />
            );
          })
        )}
      </div>
    </main>
  );
}
