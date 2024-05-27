import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
 
import { useState } from "react";
import Miami from "/workspaces/sample-react-app/src/assets/miami.png";
import London from "/workspaces/sample-react-app/src/assets/london.jpg";
import NewYork from "/workspaces/sample-react-app/src/assets/new york.jpg";
import Rome from "/workspaces/sample-react-app/src/assets/rome.jpg";
import Dublin from "/workspaces/sample-react-app/src/assets/dublin.jpg";
import LosAngles from "/workspaces/sample-react-app/src/assets/los Angles.jpg";
import Riyadh from "/workspaces/sample-react-app/src/assets/riyadh.jpg"
import { getWeatherData } from "../api/actions";
 
 
const WeatherCard: React.FC = () => {
  const [data, setData] = useState<WeatherData>();
  const [loadingState, setLoadingState] = useState(false);
  const [city, setcity] = useState("");
  const [error, setError] = useState("");
 
  const handleSearch = () => {
    console.log("Fetching Weather Data...");
    console.log(city);
    setLoadingState(true);
    getWeatherData(city)
      .then((res) => {
        setError("");
        if (res) {
          console.log(res);
          setData(res);
          setLoadingState(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoadingState(false);
        setData(undefined);
        setError(error);
      });
  };
 
 
  const getLogo = (city: string) => {
    switch (city) {
      case "dublin":
        return Dublin;
      case "london":
        return London;
      case "los angles":
        return LosAngles;
      case "new york":
        return NewYork;
      case "riyadh":
        return Riyadh;
      case "rome":
        return Rome;
      case "miami":
          return Miami;
      default:
        return ""; // Default case if no logo is found
    }
  };
  return (
<Card className="max-w-[400px]">
<CardHeader className="flex gap-3">
<form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
>
<div className="flex flex-col w-full p-2 space-y-4">
<Input
              id="weathername"
              type="text"
              label="weather"
              value={city}
              onChange={(e) => {
                setcity(e.target.value);
              }}
            />
<Button
              className=""
              color="primary"
              isLoading={loadingState}
              type="submit"
>
              Search
</Button>
</div>
</form>
</CardHeader>
<Divider />
      {data ? (
<CardBody>
<div className="flex flex-col items-center">
<img
              src={getLogo(data.city)} // Get logo based on weather
              alt={`${data.city} logo`}
              className="w-40 h-40 mb-4"
            />
<h1 className="text-3xl font-bold">{data.temperature}°C</h1>
            <p className="text-lg">Humidity: {data.humidity}%</p>
            <p className="text-lg">Wind: {data.wind} km/h</p>
            <p className="text-lg">Rain: {data.rain} %</p>
</div>
</CardBody>
      ):(
<CardBody>
<div className="flex flex-col items-center">
<p className="text-xl font-bold">Please enter a weather </p>
</div>
</CardBody>
 
      )}
<Divider />
 
      <CardFooter>
<div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600 ">{error}</p>}
          {data && (
<p className="text-xs  text-gray-600 ">Last update successful.</p>
          )}
          {!data && (
<p className="text-xs  text-gray-600 ">Waiting for input...</p>
          )}
</div>
</CardFooter>
</Card>
  );
};
 
export default WeatherCard;