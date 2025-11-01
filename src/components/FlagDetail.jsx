import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const API_URL = "https://restcountries.com/v3.1/name/";
// Add all the fields you need
const API_PostUrl =
  "?fields=name,region,subregion,flags,capital,capitalInfo,population,languages,currencies,area,timezones,continents,idd,tld,cca3,car,independent,borders";

export const FlagDetail = () => {
  const param = useParams();
  const country = param.country.toLowerCase();;
  const navigate = useNavigate();

  const [flagInfo, setFlagInfo] = useState(null);

  const getFlagsDatabyName = async () => {
    try {
      const data = await fetch(API_URL + country + API_PostUrl);
      const jsonData = await data.json();
      console.log("API Response:", jsonData);
      setFlagInfo(jsonData[0]); // First item in the array
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  useEffect(() => {
    getFlagsDatabyName();
  }, [country]);

  if (flagInfo === null) {
    return <div className="p-8">Loading...</div>;
  }

  // Extract data from API response
  const latitude = flagInfo.capitalInfo.latlng?.[0] || 0;
  const longitude = flagInfo.capitalInfo.latlng?.[1] || 0;
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=5`;
  
  // Get first language
  const languages = flagInfo.languages ? Object.values(flagInfo.languages) : [];
  
  // Get first currency
  const currencies = flagInfo.currencies ? Object.values(flagInfo.currencies) : [];
  const currency = currencies[0] || {};

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="group bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="relative overflow-hidden h-80">
          <img
            src={flagInfo.flags.png}
            alt={flagInfo.name.common}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-5xl font-bold text-white mb-2">
              {flagInfo.name.common}
            </h1>
            <p className="text-xl text-gray-200">
              {flagInfo.name.official}
            </p>
          </div>

          <button 
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-lg transition font-medium flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </button>
        </div>

        <div className="p-8">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition">
              <p className="text-gray-500 text-sm mb-1">Region</p>
              <p className="text-gray-900 font-bold text-lg">{flagInfo.region}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition">
              <p className="text-gray-500 text-sm mb-1">Subregion</p>
              <p className="text-gray-900 font-bold text-lg">{flagInfo.subregion}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition">
              <p className="text-gray-500 text-sm mb-1">Capital</p>
              <p className="text-gray-900 font-bold text-lg">
                {flagInfo.capital?.[0] || 'N/A'}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition">
              <p className="text-gray-500 text-sm mb-1">Population</p>
              <p className="text-gray-900 font-bold text-lg">
                {(flagInfo.population / 1000000).toFixed(1)}M
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Official Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Official Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Official Name</p>
                  <p className="text-gray-900 font-semibold">
                    {flagInfo.name.official}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Status</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
                    {flagInfo.independent ? 'Independent' : 'Dependent'}
                  </span>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Languages</h2>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-white rounded-lg text-gray-800 font-medium border border-gray-200"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Currency */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Currency</h2>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white px-6 py-3 rounded-lg border border-gray-200">
                  <p className="text-gray-600 text-sm">Name</p>
                  <p className="text-gray-900 font-semibold text-lg">
                    {currency.name || 'N/A'}
                  </p>
                </div>
                <div className="bg-white px-6 py-3 rounded-lg border border-gray-200">
                  <p className="text-gray-600 text-sm">Symbol</p>
                  <p className="text-gray-900 font-semibold text-lg">
                    {currency.symbol || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Geography */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Geography</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-600 text-sm mb-1">Area</p>
                  <p className="text-gray-900 font-semibold">
                    {flagInfo.area?.toLocaleString()} km²
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-600 text-sm mb-1">Timezone</p>
                  <p className="text-gray-900 font-semibold">
                    {flagInfo.timezones?.[0]}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-600 text-sm mb-1">Continent</p>
                  <p className="text-gray-900 font-semibold">
                    {flagInfo.continents?.[0]}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Additional Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Calling Code</span>
                  <span className="text-gray-900 font-semibold">
                    {flagInfo.idd?.root}{flagInfo.idd?.suffixes?.[0]}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Top Level Domain</span>
                  <span className="text-gray-900 font-semibold">
                    {flagInfo.tld?.[0]}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">ISO Code</span>
                  <span className="text-gray-900 font-semibold">
                    {flagInfo.cca3}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Driving Side</span>
                  <span className="text-gray-900 font-semibold">
                    {flagInfo.car?.side}
                  </span>
                </div>
              </div>
            </div>

            {/* Neighboring Countries */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Neighboring Countries
              </h2>
              {flagInfo.borders && flagInfo.borders.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {flagInfo.borders.map((border, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-white rounded-lg text-gray-800 font-medium border border-gray-200"
                    >
                      {border}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Island nation - No land borders</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            
             <a href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-800 transition font-medium text-lg text-center"
            >
              View on Map
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};