export default function Sort({ sortOption, setSortOption }) {
  return (
    <section className="bg-white p-6 rounded-[8px] mb-6 min-w-56">
      <div className="flex flex-row justify-between">
        <h2 className="text-xl font-bold text-[#000000] mb-4">✈️ MY FLIGHTS</h2>
        <div className="flex flex-row gap-0 text-black">
          <button
            className={`text-m font-bold ${
              sortOption === "ascending" ? "text-white" : "text-purple-600"
            } mb-4 border-black rounded-l-full ${
              sortOption === "ascending" ? "bg-purple-800" : "bg-gray-200"
            } p-2 w-40`}
            onClick={() => setSortOption("ascending")}
          >
            Date (ascending)
          </button>

          <button
            className={`text-m font-bold ${
              sortOption === "descending" ? "text-white" : "text-purple-600"
            } mb-4 border-black rounded-r-full  ${
              sortOption === "descending" ? "bg-purple-800" : "bg-gray-200"
            } p-2 w-40`}
            onClick={() => setSortOption("descending")}
          >
            Date (descending)
          </button>
        </div>
      </div>
    </section>
  );
}
