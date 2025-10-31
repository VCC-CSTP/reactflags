import React from "react";
import { useState, useEffect } from "react";
import { FlagCard } from "./FlagCard";

const API_URL_One =
  "https://restcountries.com/v3.1/name/canada?fields=name,region,subregion,flags";

const API_URL =
  "https://restcountries.com/v3.1/independent?status=true&fields=name,region,subregion,flags";

export const FlagGrid = () => {
  const [countries, setCountries] = useState([]); // ← Changed to single object

  useEffect(() => {
    getFlagsData();
  }, []);

  const getFlagsData = async () => {
    const data = await fetch(API_URL);
    const jsonData = await data.json();
    //console.log(jsonData);
    setCountries(jsonData);
  };

  // Add loading check
  if (!countries) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="relative overflow-x-auto">
      <h1 className="text-4xl font-bold no-underline p-6">World Flags</h1>
        <div className="grid grid-cols-4 gap-4">
            {countries.map((country, index) => (
                <FlagCard key={index} country={country} />
            ))}
        </div>
    </div>
  );
};
