"use client";

import type { Filters, VehicleType } from "@/lib/types";
import { getManufacturers, getBikeTypes, getCarSeats } from "@/lib/data";
import { defaultFilters } from "@/lib/filter";
import { TypeFilter } from "./filters/TypeFilter";
import { ManufacturerFilter } from "./filters/ManufacturerFilter";
import { YearRangeFilter } from "./filters/YearRangeFilter";
import { BikeTypeFilter } from "./filters/BikeTypeFilter";
import { SeatsFilter } from "./filters/SeatsFilter";
import { HorsepowerFilter } from "./filters/HorsepowerFilter";
import { MaxCrewFilter } from "./filters/MaxCrewFilter";

const manufacturers = getManufacturers();
const bikeTypes = getBikeTypes();
const carSeats = getCarSeats();

type Props = {
  filters: Filters;
  onChange: (next: Filters) => void;
};

const hasActiveFilters = (filters: Filters): boolean =>
  filters.query !== "" ||
  filters.vehicleTypes.length > 0 ||
  filters.manufacturers.length > 0 ||
  filters.yearMin !== null ||
  filters.yearMax !== null ||
  filters.bikeTypes.length > 0 ||
  filters.seats.length > 0 ||
  filters.horsepowerMin !== null ||
  filters.horsepowerMax !== null ||
  filters.maxCrewMin !== null ||
  filters.maxCrewMax !== null;

const shows = (selected: VehicleType[], type: VehicleType): boolean =>
  selected.length === 0 || selected.includes(type);

export const Sidebar = ({ filters, onChange }: Props) => {
  const showBikeFilters = shows(filters.vehicleTypes, "bike");
  const showCarFilters = shows(filters.vehicleTypes, "car");
  const showSpaceshipFilters = shows(filters.vehicleTypes, "spaceship");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters(filters) && (
          <button
            type="button"
            onClick={() => onChange(defaultFilters)}
            className="text-xs text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      <TypeFilter
        value={filters.vehicleTypes}
        onChange={(vehicleTypes) => onChange({ ...filters, vehicleTypes })}
      />

      <ManufacturerFilter
        value={filters.manufacturers}
        onChange={(manufacturers) => onChange({ ...filters, manufacturers })}
        manufacturers={manufacturers}
      />

      <YearRangeFilter
        valueMin={filters.yearMin}
        valueMax={filters.yearMax}
        onChange={({ min, max }) => onChange({ ...filters, yearMin: min, yearMax: max })}
      />

      {showBikeFilters && (
        <BikeTypeFilter
          value={filters.bikeTypes}
          onChange={(bikeTypes) => onChange({ ...filters, bikeTypes })}
          options={bikeTypes}
        />
      )}

      {showCarFilters && (
        <>
          <SeatsFilter
            value={filters.seats}
            onChange={(seats) => onChange({ ...filters, seats })}
            options={carSeats}
          />
          <HorsepowerFilter
            valueMin={filters.horsepowerMin}
            valueMax={filters.horsepowerMax}
            onChange={({ min, max }) => onChange({ ...filters, horsepowerMin: min, horsepowerMax: max })}
          />
        </>
      )}

      {showSpaceshipFilters && (
        <MaxCrewFilter
          valueMin={filters.maxCrewMin}
          valueMax={filters.maxCrewMax}
          onChange={({ min, max }) => onChange({ ...filters, maxCrewMin: min, maxCrewMax: max })}
        />
      )}
    </div>
  );
};
