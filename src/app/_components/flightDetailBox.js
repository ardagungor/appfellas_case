import axios from "axios";

export default function FlightDetailBox(props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative">
      <div className="text-lg font-semibold mb-2">Milano - Madrid</div>
      <div className="flex justify-between items-center text-gray-600">
        <div>
          <p className="text-sm">✈️ Departure</p>
          <p className="text-xl font-bold">{props.flightName}</p>
          <p className="text-sm">Airport: {props.from}</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-full border-t border-gray-300"></div>
          <p className="text-green-600 text-sm mt-2">Alitalia</p>
          <p className="text-purple-500 text-2xl">✈️</p>
          <p className="text-sm mt-2">{props.flightDuration}</p>
          <div className="w-full border-t border-gray-300 mt-2"></div>
        </div>
        <div>
          <p className="text-sm">✈️ Arrival</p>
          <p className="text-xl font-bold">{props.estimatedLandingTime}</p>
          <p className="text-sm">Airport: {props.destination}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-xl text-purple-700 font-bold">
            Price: ${Math.floor(Math.random() * 400)}
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 right-0">
        <button className="bg-purple-600 text-white py-2 px-4 min-h-20 min-w-30 rounded-tl-lg rounded-br-lg font-semibold">
          Book Flight
        </button>
      </div>
      <div className="mt-4">
        <a href="#" className="text-purple-600 text-sm">
          Check the details
        </a>
      </div>
    </div>
  );
}
