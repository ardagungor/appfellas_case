"use client";
import { useRouter } from "next/navigation";

export default function Header({ username }) {
  const router = useRouter();

  return (
    <header className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        <i className="fas fa-plane-departure text-[#6b21a8] text-2xl mr-2"></i>
        <a
          onClick={() => {
            router.push("/");
          }}
        >
          <span className="text-2xl font-bold text-[#000000] cursor-pointer">
            ✈️ PLANE SCAPE
          </span>
        </a>
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
          <a
            onClick={() => {
              router.push("/savedFlights");
            }}
          >
            <span className="text-[#000000] hover:bg-gray-400 rounded-md p-2 cursor-pointer">
              🙂 {username}
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
}
