import React from "react";
import { Link } from "react-router-dom";
import { FlagDetail } from "./FlagDetail";
import { useNavigate } from "react-router-dom";

export const FlagCard = (country) => {

      const navigate = useNavigate();

      const handleLearnMore = () => {
        navigate(`/detail/${country.country.name.common}`);
      };

  return (
        <div className="group bg-white shadow-md rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
  
        <div className="relative overflow-hidden">
            <img 
            src={country.country.flags.png} 
            alt={country.country.flags.alt}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
        </div>
        
      
        <div className="p-5">
            <h2 className="text-xl font-bold text-gray-900 mb-3">{country.country.name.common}</h2>
            
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="text-gray-700 text-sm mb-1">
                <span className="font-semibold text-gray-900">Region: </span> {country.country.region}
            </p>
            <p className="text-gray-700 text-sm">
                <span className="font-semibold text-gray-900">Subregion: </span> {country.country.subregion}
            </p>
            </div>
            
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2.5 px-4 rounded-lg hover:from-blue-600 hover:to-blue-800 transition font-medium" onClick={handleLearnMore}>
            Explore Country
            </button>
        </div>
        </div>
  );
};
