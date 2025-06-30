import React, { useEffect, useRef, useState } from "react";
import * as worldMap from "@maptiler/sdk";
import Search from "../assets/Search.svg";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import {
  MaptilerNavigationControl,
  MaptilerGeolocateControl,
} from "@maptiler/sdk";
import Location from "./Location";
import Arrow from "../assets/downArrowHead.png";

const MapPage = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const mapKey = import.meta.env.VITE_MAPTILER_API_KEY;
  const zoom = 4;
  const [center, setCenter] = useState({ lng: 85.1376, lat: 25.5941 });
  const pointerRef = useRef(null);
  const [search, setSearch] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currLocation, setCurrLocation] = useState("Patna");
  worldMap.config.apiKey = mapKey;
  const [detail,setdetail] = useState(false);

  //-----------------For current location--------------
  useEffect(() => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          setCenter({
            lng: pos.coords.longitude,
            lat: pos.coords.latitude,
          });
        });
      }
    } catch (e) {
      alert("Error in map loading");
      console.log("Error in map loading ", e);
    }
  }, []);
  // --------------------------------------------------

  //---------------Map initialization-------------------
  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = new worldMap.Map({
        container: mapContainerRef.current,
        style: worldMap.MapStyle.STREETS,
        center: [center.lng, center.lat],
        zoom: zoom,
        navigationControl: false,
        geolocateControl: false,
      });

      mapRef.current.addControl(
        new MaptilerNavigationControl(),
        "bottom-right"
      );
      mapRef.current.addControl(new MaptilerGeolocateControl(), "bottom-right");
    } else if (mapRef.current) {
      mapRef.current.setCenter([center.lng, center.lat]);
      //-------get location if i click on map---------------
      mapRef.current.on("click", async (e) => {
        const { lng, lat } = e.lngLat;
        if (pointerRef.current) {
          pointerRef.current.setLngLat([lng, lat]);
        } else {
          pointerRef.current = new worldMap.Marker({ color: "#FF0000" })
            .setLngLat([lng, lat])
            .addTo(mapRef.current);
        }
        setCenter({ lng, lat }); // <-- Add this line
      });
      //------------------------------------------------
    }
  }, [center.lng, center.lat, zoom]);
  //-----------------------------------------------------

  //---------------search Location-----------------------
  useEffect(() => {
    async function searchLocation() {
      if (search.trim().length < 2) {
        setSuggestion([]);
        return;
      }

      const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(
        search
      )}.json?key=${mapKey}&autocomplete=true&limit=5`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.features) {
          setSuggestion(data.features);
        } else {
          setSuggestion([]);
        }
      } catch {
        setSuggestion([]);
      }
    }
    searchLocation();
  }, [search]);

  //--------------------mark pointer in map after search ----------
  async function handleSuggestionClick(features) {
    const [lng, lat] = features.center;
    setCenter({ lng, lat });
    setSearch(features.place_name);
    setSuggestion([]);
    setShowSuggestions(false);

    if (pointerRef.current) {
      pointerRef.current.setLngLat([lng, lat]);
    } else if (mapRef.current) {
      pointerRef.current = new worldMap.Marker()
        .setLngLat([lng, lat])
        .addTo(mapRef.current);
    }
  }
  //-----------------------------------------------------

  // getting location from latitude and longitude
  useEffect(() => {
    async function fetchLocation() {
      const url = `https://api.maptiler.com/geocoding/${center.lng},${center.lat}.json?key=${mapKey}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.features) {
        setCurrLocation(data.features);
      } else {
        setCurrLocation([]);
      }
    }
    fetchLocation();
  }, [center]);

  return (
    <div className="w-screen h-screen flex flex-col items-center relative pt-14">
      <div className="w-70 md:w-110 bg-black/60 backdrop-blur-md absolute top-16 z-10 rounded-2xl  py-2">
        <div className="flex px-4 w-full">
          <input
            type="text"
            className="text-white text-xl outline-0 placeholder-amber-50 w-full "
            placeholder="Search for a place..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          {search && (
            <img src={Search} className="w-7 active:scale-85" alt="Search" />
          )}
        </div>

        {showSuggestions && suggestion.length > 0 && (
          <ul className="w-full overflow-y-auto px-4">
            {suggestion.map((feature) => (
              <li
                key={feature.id}
                className="py-2 cursor-pointer hover:bg-white/20 text-white border-t-2 px-2"
                onMouseDown={() => handleSuggestionClick(feature)}
              >
                {feature.place_name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div ref={mapContainerRef} className="w-full h-full" />

      <div className="absolute w-screen md:w-[70%] lg:w-[50%] bottom-0 bg-black/50 backdrop-blur-xl z-10 rounded-t-4xl h-auto flex flex-col items-center py-2 px-5 ">
        <button className={`text-3xl font-bold text-white w-7 ${!detail&&"rotate-180"} transition-all duration-100`} onClick={()=>setdetail(!detail)}>
          <img src={Arrow}></img>
        </button>
        <Location currLocation={currLocation} detail={detail}/>
      </div>
    </div>
  );
};

export default MapPage;
