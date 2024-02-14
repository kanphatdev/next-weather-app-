"use client";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import WeatherDetail from "@/components/WeatherDetail";
import WeatherIcon from "@/components/WeatherIcon";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import convertWinSpeed from "@/utils/convertWinSpeed";
import getDayOrNightIcon from "@/utils/getDayOrNight";
import metersToKilometers from "@/utils/meterToKilometers";
import axios from "axios";
import { format, fromUnixTime } from "date-fns";
import { parseISO } from "date-fns/parseISO";
import Image from "next/image";
import { useQuery } from "react-query";
type WeatherData = {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

type WeatherItem = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: WeatherCondition[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
};

type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>(
    "repoData",
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
    }
  );
  const firstData = data?.list[0];
  console.log("data", data);

  if (isLoading)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce capitalize text-gray-500">
          loading <span className="text-amber-300">...</span>
        </p>
      </div>
    );
  return (
    <>
      <div className="flex flex-col gap-4 bg-gray-200 min-h-screen">
        <Navbar />
        <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
          {/* today data */}
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="capitalize flex gap-1 text-2xl items-end">
                <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
                <p className="text-lg">
                  ({format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")})
                </p>
              </h2>
              <Container className="gap-10 px-6 items-center">
                <div className="flex flex-col px-4">
                  <span className="text-5xl">
                    {convertKelvinToCelsius(firstData?.main.temp ?? 296.37)}°
                  </span>
                  <p className="text-xs space-x-1 whitespace-nowrap">
                    <span className="capitalize">feels like</span>
                    <span className="">
                      {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°
                    </span>
                  </p>
                  <p className="text-xs space-x-2">
                    <span className="">
                      {""}
                      {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}°↓
                    </span>
                    <span className="">
                      {""}
                      {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}°↑
                    </span>
                  </p>
                </div>
                {/* time and weather icon */}
                <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                  {data?.list.map((d, i) => (
                    <div
                      className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                      key={i}
                    >
                      <p className="whitespace-nowrap">
                        {format(parseISO(d.dt_txt), "h:mm a")}
                      </p>
                      <WeatherIcon
                        iconName={getDayOrNightIcon(
                          d.weather[0].icon,
                          d.dt_txt
                        )}
                      />
                      <p className="">
                        {convertKelvinToCelsius(d?.main.temp ?? 0)}°
                      </p>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
            <div className="flex gap-4">
              {/* left */}
              <Container className="w-fit justify-center flex-col px-4 items-center">
                <p className="capitalize text-center">
                  {firstData?.weather[0].description}
                </p>
                <WeatherIcon
                  iconName={getDayOrNightIcon(
                    firstData?.weather[0].icon ?? "",
                    firstData?.dt_txt ?? ""
                  )}
                />
              </Container>
              {/* right */}
              <Container className="bg-amber-300/80 px-6 gap-4 justify-between overflow-x-auto">
                <WeatherDetail
                  airPressure={`${firstData?.main.pressure}hPa`}
                  visability={metersToKilometers(
                    firstData?.visibility ?? 10000
                  )}
                  humidty={`${firstData?.main.humidity}% `}
                  sunrise={format(
                    fromUnixTime(data?.city.sunrise ?? 1702949452),
                    "H:mm"
                  )}
                  sunset={format(
                    fromUnixTime(data?.city.sunset ?? 1702517657),
                    "H:mm"
                  )}
                  windSpeed={convertWinSpeed(firstData?.wind.speed?? 1.64)}
                />
              </Container>
            </div>
          </section>

          {/* 7 days forecast  data */}
          <section className="flex w-full flex-col gap-4">
            <p className="capitalize text-gray-500 text-2xl">
              forecast <span className="text-amber-400">(7 days)</span>
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
