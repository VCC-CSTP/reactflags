import React from "react";
import { useState, useEffect } from "react";
import { FlagCard } from "./FlagCard";

const API_URL =
  "https://restcountries.com/v3.1/name/canada?fields=name,region,subregion,flags";

export const FlagGrid = () => {
  const [country, setCountry] = useState(null); // ← Changed to single object

  useEffect(() => {
    getFlagsData();
  }, []);

  const getFlagsData = async () => {
    const data = await fetch(API_URL);
    const jsonData = await data.json();
    console.log(jsonData[0]);
    setCountry(jsonData[0]); // ← Store first item, not the array
  };

  // Add loading check
  if (!country) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="relative overflow-x-auto">
      <h1 className="text-4xl font-bold underline">Flags</h1>
      {country?.map((cntry) => (
        <FlagCard cntry={cntry} />
      ))}
    </div>
  );
};
