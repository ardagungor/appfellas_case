import axios from "axios";

export default function FlightDetailBox(props) {
  const username = props.username;
  const from = props.from;
  const flightName = props.flightName;
  const date = new Date(props.date);
  const flightDuration = props.flightDuration;
  const estimatedLandingTime = props.estimatedLandingTime;
  const destination = props.destination;

  const saveFlight = () => {
    axios
      .post("/api/saveFlight", {
        username,
        from,
        destination,
        flightName,
        date: new Date(date),
        flightDuration,
        estimatedLandingTime,
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Flight saved successfully!");
        }
      })
      .catch((e) => alert("Error: " + e));
  };

  const removeFlight = () => {
    axios
      .post("/api/removeFlight", {
        id: props.id,
      })
      .then((res) => {
        if (res.status === 200) {
          alert("Flight deleted successfully!");
          props.refreshFlights();
        }
      })
      .catch((e) => alert("Error: " + e));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative">
      <div className="flex justify-between items-center text-gray-600">
        <div>
          <p className="text-sm">✈️ Departure</p>
          <p className="text-xl font-bold">{flightName}</p>
          <p className="text-sm">Airport: {from}</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-full border-t border-gray-300"></div>
          <p className="text-green-600 text-sm mt-2">
            {new Date(date).toLocaleDateString("en-GB")}
          </p>
          <p className="text-purple-500 text-2xl">✈️</p>
          <p className="text-sm mt-2">{flightDuration}</p>
          <div className="w-full border-t border-gray-300 mt-2"></div>
        </div>
        <div>
          <p className="text-sm">✈️ Arrival</p>
          <p className="text-xl font-bold">{estimatedLandingTime}</p>
          <p className="text-sm">Airport: {destination}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-xl text-purple-700 font-bold">
            {/* Set a random price since we don't have price info */}
            Price: ${Math.floor(Math.random() * 400)}
          </p>
        </div>
      </div>
      {
        <div className="absolute bottom-0 right-0">
          {/* Button CSS and functionality changes depending on the page it is presented */}
          <button
            className={`${
              props.type === "allFlights" ? "bg-purple-600" : "bg-red-600"
            } text-white py-2 px-4 min-h-20 min-w-30 rounded-tl-lg rounded-br-lg font-semibold`}
            onClick={() => {
              props.type === "allFlights" ? saveFlight() : removeFlight();
            }}
          >
            {props.type === "allFlights" ? "Book Flight" : "Remove flight"}
          </button>
        </div>
      }
      <div className="mt-4">
        <a href="#" className="text-purple-600 text-sm">
          Check the details
        </a>
      </div>
    </div>
  );
}
