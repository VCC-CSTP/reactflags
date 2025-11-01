import React from "react";
import { useState, useEffect } from "react";
import { FlagCard } from "./FlagCard";
import { FlagHeader } from "./FlagHeader";

const API_URL =
  "https://restcountries.com/v3.1/independent?status=true&fields=name,region,subregion,flags";

export const FlagGrid = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    getFlagsData();
  }, []);

  const getFlagsData = async () => {
    const data = await fetch(API_URL);
    const jsonData = await data.json();
    //console.log(jsonData);
    setCountries(jsonData);
  };

  // Filter countries based on search term
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort countries based on sort order
  const sortedCountries = [...filteredCountries].sort((a, b) => {
    const nameA = a.name.common.toLowerCase();
    const nameB = b.name.common.toLowerCase();

    if (sortOrder === "asc") {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  // Add loading check
  if (!countries) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading countries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <FlagHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-bold text-gray-900">
              {sortedCountries.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-gray-900">{countries.length}</span>{" "}
            countries
          </p>
        </div>

        {sortedCountries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedCountries.map((country, index) => (
              <FlagCard key={index} country={country} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg
              className="w-24 h-24 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No countries found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search term:{" "}
              <span className="font-semibold">"{searchTerm}"</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
