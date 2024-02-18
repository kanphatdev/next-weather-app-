"use client";
import { MdOutlineWbSunny } from "react-icons/md";
import { MdLocationSearching } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import SeachBox from "./SeachBox";
import { useState } from "react";
import axios from "axios";

export const Navbar = () => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  async function handleInputChang(value: string) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
        );
        const suggestions = response.data.list.map((item: any) => item.name);
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }
  function handleSuggestionClick(value: string) {
    setShowSuggestions(false);
    setCity(value);
  }
  function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (suggestions.length == 0) {
      setError("location not found");
    } else {
      setError("");
      setShowSuggestions(false);
    }
  }
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <p className="flex items-center justify-center gap-2">
          <h2 className="capitalize text-gray-500 text-3xl">weather</h2>
          <MdOutlineWbSunny className="text-3xl mt-1 text-amber-300" />
        </p>
        {/*  */}
        <section className="flex gap-2 items-center">
          <MdLocationSearching className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer" />
          <>
            <IoLocationOutline className="text-3xl text-black" />
          </>
          <p className="text-slate-900/80 text-sm capitalize">thailand</p>
          <div className="relative">
            {/* SeachBox */}
            <>
              <SeachBox
                value={city}
                onChange={(e) => handleInputChang(e.target.value)}
                onSubmit={handleSubmitSearch}
              />
              <SuggestionBox
                {...{
                  showSuggestions,
                  suggestions,
                  handleSuggestionClick,
                  error,
                }}
              />
            </>
          </div>
        </section>
      </div>
    </nav>
  );
};
function SuggestionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}) {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 px-2 py-2">
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-1 capitalize">{error}</li>
          )}
          {suggestions.map((item, i) => (
            <>
              <li
                key={i}
                onClick={() => handleSuggestionClick(item)}
                className="cursor-pointer p-1 rounded hover:bg-gray-200"
              >
                {item}
              </li>
            </>
          ))}
        </ul>
      )}
    </>
  );
}
