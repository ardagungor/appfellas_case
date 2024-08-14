export default function Header({ username }) {
  return (
    <header className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        <i className="fas fa-plane-departure text-[#6b21a8] text-2xl mr-2"></i>
        <h1 className="text-2xl font-bold text-[#000000]">✈️ PLANE SCAPE</h1>
      </div>
      <nav className="flex items-center space-x-6">
        <a href="#" className="text-[#6b21a8]">
          🏷️ Deals
        </a>
        <a href="#" className="text-[#6b21a8]">
          🌎 Discover
        </a>
        <div className="flex items-center space-x-2">
          <i className="fas fa-user-circle text-[#6b21a8] text-2xl"></i>
          <a href="">
            <span
              className="text-[#000000] hover:bg-gray-400 rounded-md p-2"
              data-tooltip-target="tooltip-default"
            >
              🙂 {username}
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
}
