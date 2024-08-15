"use client";
import Header from "../_components/header";
import Sort from "../_components/sort";
import FlightDetailBox from "../_components/flightDetailBox";
import axios from "axios";
import { useState, useEffect } from "react";
import Skeleton from "../_components/skeleton";

export default function Home() {
  const [flights, setFlights] = useState([]);
  const [sortOption, setSortOption] = useState("descending");
  const [isLoading, setIsLoading] = useState(true);

  const [username, setUsername] = useState("AppFellas test user");

  const getSavedFlights = () => {
    setIsLoading(true);
    axios
      .post("/api/getSavedFlights", {
        username,
        sortOption,
      })
      .then((res) => {
        if (res.status === 200) {
          setFlights(res.data);
        }
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getSavedFlights();
  }, [sortOption]);

  return (
    <main className="flex min-h-screen flex-col p-8 bg-gray-200">
      <Header username={username} />
      <Sort sortOption={sortOption} setSortOption={setSortOption} />
      <div className="flex flex-col gap-8">
        {/* Display skeleton while the data is loading */}
        {isLoading === true ? (
          <Skeleton />
        ) : (
          flights?.map((flight) => {
            return (
              <FlightDetailBox
                key={flight._id}
                id={flight._id}
                username={username}
                from={flight.from}
                destination={flight.destination}
                flightName={flight.flightName}
                estimatedLandingTime={flight.estimatedLandingTime}
                date={flight.estimatedLandingTime}
                flightDuration={flight.flightDuration}
                refreshFlights={getSavedFlights}
                type="savedFlights"
              />
            );
          })
        )}
      </div>
    </main>
  );
}
