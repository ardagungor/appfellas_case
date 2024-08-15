"use client";
import Header from "../_components/header";
import Sort from "../_components/sort";
import FlightDetailBox from "../_components/flightDetailBox";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [flights, setFlights] = useState([]);
  const [sortOption, setSortOption] = useState("descending");

  const [username, setUsername] = useState("AppFellas test user");

  const getSavedFlights = () => {
    axios
      .post("/api/getSavedFlights", {
        username,
        sortOption,
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
      <Sort sortOption={sortOption} setSortOption={setSortOption} />
      <div className="flex flex-col gap-8">
        {flights?.map((flight) => {
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
              type="savedFlights"
            />
          );
        })}
      </div>
    </main>
  );
}
