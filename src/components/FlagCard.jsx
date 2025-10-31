import React from 'react'
import { Link } from "react-router-dom";

export const FlagCard = (country) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
        <img
          src={country.flags.png}
          alt={country.name.common}
          className="w-full h-40 object-cover"
        />

        <div className="flex justify-between items-center p-4">
          <span className="font-medium">{country.name.common}</span>
          <Link
            to={`/detail/${country.name.common}`}
            className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
