import Image from "next/image";
import {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { CountryData } from "@/interface/Interface";
import RoundLogo from "@/public/round-logo.svg";

interface CountryListProps {
  countries: CountryData[];
  selectedCountryData: CountryData | null;
  setSelectedCountryData: Dispatch<SetStateAction<CountryData | null>>;
}

const CountryList: React.FC<CountryListProps> = ({
  countries,
  selectedCountryData,
  setSelectedCountryData,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  const handleCountryClick = (country: CountryData) => {
    setSelectedCountryData(country);
    setIsPopoverOpen(false);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (isPopoverOpen && selectedCountryData) {
      const selectedCountryElement = document.getElementById(
        selectedCountryData.name.common
      );
      if (selectedCountryElement) {
        selectedCountryElement.scrollIntoView({
          behavior: "instant",
          block: "start",
        });
      }
    }
  }, [isPopoverOpen, selectedCountryData]);

  return (
    <div className="relative w-full">
      <button
        className="border px-4 py-2 rounded-md bg-white text-stone-500 w-full flex items-center justify-between gap-4 shadow-lg"
        onClick={() => setIsPopoverOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-4">
          <Image
            src={RoundLogo}
            alt="Turing Technology"
            height={30}
            width={30}
          />
          <span>Select a country</span>
        </div>
        <span className="material-symbols-outlined">unfold_more</span>
      </button>

      {isPopoverOpen && (
        <div className="absolute top-14 rounded-md left-0 w-full bg-white  shadow-lg z-10">
          <div className="relative p-2">
            <div className="absolute inset-y-0 bottom-4 left-4 material-symbols-outlined flex items-center pointer-events-none">
              search
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full border py-2 px-2 border-primary focus:outline-primary mb-4 rounded-md pl-10"
            />
          </div>
          <ul className="h-[300px] overflow-scroll flex flex-col">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <li
                  key={country.name.common}
                  id={country.name.common}
                  className={`flex gap-2 items-center justify-between border-b py-2 px-3 cursor-pointer last:border-b-0 ${
                    selectedCountryData === country
                      ? "bg-primary font-semibold"
                      : ""
                  }`}
                  onClick={() => handleCountryClick(country)}
                >
                  <div className="flex items-center gap-2">
                    <div>
                      <Image
                        src={country.flags.svg}
                        width={30}
                        height={30}
                        alt={country.name.common}
                        className="rounded-md"
                        priority
                      />
                    </div>
                    {country.name.common}
                  </div>
                  {selectedCountryData === country && (
                    <span className="material-symbols-outlined font-semibold">
                      check
                    </span>
                  )}
                </li>
              ))
            ) : (
              <div className="flex py-2 px-3 text-red-500">
                No countries found
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountryList;
