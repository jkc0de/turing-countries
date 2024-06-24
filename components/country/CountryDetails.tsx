import { FC } from "react";
import { CountryData } from "@/interface/Interface";
import { ButtonPrimary } from "../common/Buttons";
import Image from "next/image";

interface Props {
  selectedCountryData: CountryData | null;
}

const CountryDetails: FC<Props> = ({ selectedCountryData }) => {
  if (!selectedCountryData) {
    return <div className="text-red-500">No country selected</div>;
  }

  const currencyKey = Object.keys(selectedCountryData.currencies)[0];
  const currency = selectedCountryData.currencies[currencyKey];

  const languages = Object.entries(selectedCountryData.languages).map(
    ([key, value]) => ({
      code: key,
      name: value,
    })
  );

  return (
    selectedCountryData && (
      <div className="bg-white rounded-md shadow-lg overflow-hidden flex flex-col gap-5 w-full">
        {selectedCountryData.flags?.svg && (
          <div className="border-b">
            <Image
              src={selectedCountryData.flags.svg}
              alt={selectedCountryData.name.common}
              width={1000}
              height={400}
              className="object-fill"
              priority
            />
          </div>
        )}

        {selectedCountryData.name.common && (
          <h2 className="text-2xl font-serif w-full text-center border-b pb-4 px-2">
            {selectedCountryData.name.common}
          </h2>
        )}

        {languages.length > 0 && (
          <div className="flex flex-col gap-2 px-2 border-b pb-4">
            <div className="font-medium flex items-center gap-2">
              Languages
              <span className="material-symbols-outlined">language</span>
            </div>
            <div className="flex flex-wrap gap-3 ">
              {languages.map((language, index) => (
                <span
                  key={index}
                  className="bg-orange-500 px-3 py-2 text-white rounded-md shadow-md"
                >
                  {language.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {currency && (
          <div className="flex flex-col gap-2 px-2">
            <div className="font-medium flex items-center gap-2">
              Currency
              <span className="material-symbols-outlined">payments</span>
            </div>
            <div className="flex flex-wrap gap-3 ">
              {currency.name} ({currency.symbol})
            </div>
          </div>
        )}

        {selectedCountryData.maps?.googleMaps && (
          <div>
            <a
              target="_blank"
              href={selectedCountryData.maps.googleMaps}
              rel="noopener noreferrer"
            >
              <ButtonPrimary
                type="button"
                label="Open Google Maps"
                fontSize="text-lg"
              />
            </a>
          </div>
        )}
      </div>
    )
  );
};

export default CountryDetails;
