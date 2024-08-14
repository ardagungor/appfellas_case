import { useState } from "react";

export default function Filter({
  isArrival,
  setIsArrival,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}) {
  return (
    <section className="bg-white p-6 rounded-[8px] mb-6 min-w-56">
      <div className="flex flex-row justify-between">
        <h2 className="text-xl font-bold text-[#000000] mb-4">
          ✈️ BOOK YOUR FLIGHT
        </h2>
        <div className="flex flex-row gap-0">
          <button
            className={`text-m font-bold ${
              isArrival === true ? "text-white" : "text-purple-600"
            } mb-4 border-black rounded-l-full ${
              isArrival === true ? "bg-purple-800" : "bg-gray-200"
            } p-2 w-40`}
            onClick={() => setIsArrival(true)}
          >
            Arrival
          </button>

          <button
            className={`text-m font-bold ${
              isArrival === false ? "text-white" : "text-purple-600"
            } mb-4 border-black rounded-r-full  ${
              isArrival === false ? "bg-purple-800" : "bg-gray-200"
            } p-2 w-40`}
            onClick={() => setIsArrival(false)}
          >
            Departure
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center mb-4 flex-wrap gap-8 text-black">
        <div className="flex items-center space-x-2 ">
          <i className="fas fa-plane-departure text-[#6b21a8] text-xl"></i>
          <input
            type="text"
            className="border border-[#e5e7eb] rounded-[8px] p-2 min-w-40"
            placeholder="From"
          />
        </div>
        <div className="flex items-center space-x-2">
          <i className="fas fa-plane-arrival text-[#6b21a8] text-xl"></i>
          <input
            type="text"
            className="border border-[#e5e7eb] rounded-[8px] p-2 min-w-40"
            placeholder="To"
          />
        </div>
        <div className="flex items-center space-x-2">
          <i className="fas fa-calendar-alt text-[#6b21a8] text-xl"></i>
          <input
            type="date"
            className="border border-[#e5e7eb] rounded-[8px] p-2 min-w-40"
            placeholder="Departure"
            value={fromDate.toISOString().substring(0, 10)}
            onChange={(e) => setFromDate(new Date(e.target.value))}
          />
        </div>
        <div className="flex items-center space-x-2">
          <i className="fas fa-calendar-alt text-[#6b21a8] text-xl"></i>
          <input
            type="date"
            className="border border-[#e5e7eb] rounded-[8px] p-2 min-w-40"
            placeholder="Return"
            value={toDate.toISOString().substring(0, 10)}
            onChange={(e) => setToDate(new Date(e.target.value))}
          />
        </div>
      </div>
      <button className="bg-[#6b21a8] text-white py-2 px-4 rounded-[8px]">
        Show flights
      </button>
    </section>
  );
}
