import React from "react";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { ImMeter } from "react-icons/im";
import { MdAir } from "react-icons/md";
import { FiDroplet } from "react-icons/fi";
export interface WeatherDetailProps {
  visability: string;
  humidty: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
}

export default function WeatherDetail(props: WeatherDetailProps) {
  const {
    visability = "25km",
    humidty = "61%",
    windSpeed = "7km/h",
    airPressure = "1012hpa",
    sunrise = "6.20",
    sunset = "18:48",
  } = props;
  return (
    <>
      <SingleWeatherDetail
        icon={<LuEye />}
        information="visability"
        value={visability}
      />
      <SingleWeatherDetail
        icon={<FiDroplet />}
        information="humidty"
        value={humidty}
      />
      <SingleWeatherDetail
        icon={<MdAir />}
        information="wind Speed"
        value={windSpeed}
      />
      <SingleWeatherDetail
        icon={<ImMeter />}
        information="air pressure"
        value={airPressure}
      />
      <SingleWeatherDetail
        icon={<LuSunrise />}
        information="sunrise"
        value={sunrise}
      />
      <SingleWeatherDetail
        icon={<LuSunset />}
        information="sunset"
        value={sunset}
      />
    </>
  );
}
export interface SingleWeatherDetailProps {
  information: string;
  icon: React.ReactNode;
  value: string;
}
export function SingleWeatherDetail(props: SingleWeatherDetailProps) {
  return (
    <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80">
      <p className="whitespace-nowrap capitalize">{props.information}</p>
      <div className="text-3xl">{props.icon}</div>
      <p className="">{props.value}</p>
    </div>
  );
}
