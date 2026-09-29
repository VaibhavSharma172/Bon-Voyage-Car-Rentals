import React, { useState } from "react";
import { MapPin, CalendarDays, Search } from "lucide-react";

const SearchBox = () => {

  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");

  const handleSearch = () => {
    console.log({
      pickupLocation,
      pickupDate,
      dropoffLocation,
      dropoffDate,
    });
  };

  return (
    <div className="absolute bottom-0 left-1/2 w-[calc(100%-3rem)] max-w-6xl -translate-x-1/2 translate-y-1/2">

      <div className="rounded-3xl border border-black/5 bg-white p-3 shadow-2xl">

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-5">

          {/* Pickup location */}
          <div className="flex items-center gap-3 rounded-2xl border border-black/5 bg-canvas px-4 py-4">

            <MapPin
              size={20}
              className="shrink-0 text-primary"
            />

            <div className="min-w-0 flex-1">
              <label className="block text-xs font-semibold text-ink">
                Pick-up location
              </label>

              <input
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                placeholder="Where are you picking up?"
                className="mt-1 w-full bg-transparent text-sm text-ink outline-none placeholder:text-black/30"
              />
            </div>

          </div>

          {/* Pickup date */}
          <div className="flex items-center gap-3 rounded-2xl border border-black/5 bg-canvas px-4 py-4">

            <CalendarDays
              size={20}
              className="shrink-0 text-primary"
            />

            <div className="min-w-0 flex-1">
              <label className="block text-xs font-semibold text-ink">
                Pick-up date
              </label>

              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="mt-1 w-full bg-transparent text-sm text-ink outline-none"
              />
            </div>

          </div>

          {/* Dropoff location */}
          <div className="flex items-center gap-3 rounded-2xl border border-black/5 bg-canvas px-4 py-4">

            <MapPin
              size={20}
              className="shrink-0 text-accent"
            />

            <div className="min-w-0 flex-1">
              <label className="block text-xs font-semibold text-ink">
                Drop-off location
              </label>

              <input
                type="text"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                placeholder="Where are you returning?"
                className="mt-1 w-full bg-transparent text-sm text-ink outline-none placeholder:text-black/30"
              />
            </div>

          </div>

          {/* Dropoff date */}
          <div className="flex items-center gap-3 rounded-2xl border border-black/5 bg-canvas px-4 py-4">

            <CalendarDays
              size={20}
              className="shrink-0 text-accent"
            />

            <div className="min-w-0 flex-1">
              <label className="block text-xs font-semibold text-ink">
                Drop-off date
              </label>

              <input
                type="date"
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
                className="mt-1 w-full bg-transparent text-sm text-ink outline-none"
              />
            </div>

          </div>

          {/* Search */}
          <button
            onClick={handleSearch}
            className="flex min-h-[72px] items-center justify-center gap-2 rounded-2xl bg-primary px-6 font-semibold text-white transition hover:bg-primary/90"
          >
            <Search size={19} />
            Search cars
          </button>

        </div>

      </div>
    </div>
  );
};

export default SearchBox;