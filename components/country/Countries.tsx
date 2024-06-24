"use client";

import { useEffect, useState } from "react";

import { CountryData } from "@/interface/Interface";

import CountryDetails from "./CountryDetails";
import CountryList from "./CountryList";

export default function Countries() {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
    null
  );
  const [countries, setCountries] = useState<CountryData[]>([]);

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,currencies,languages,maps"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch countries data");
      }
      const countriesData = await response.json();
      setCountries(countriesData);

      const malaysia = countriesData.find(
        (country: CountryData) => country.name.common === "Malaysia"
      );

      if (malaysia) {
        setSelectedCountry(malaysia);
      }
    } catch (error) {
      console.error("Error fetching countries data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="h-full flex-col flex gap-5 px-4 items-center justify-center w-full mx-auto max-w-lg py-12">
      {!isLoading && countries.length > 0 && (
        <>
          <CountryList
            countries={countries}
            selectedCountryData={selectedCountry}
            setSelectedCountryData={setSelectedCountry}
          />
          <CountryDetails selectedCountryData={selectedCountry} />
        </>
      )}
    </div>
  );
}
