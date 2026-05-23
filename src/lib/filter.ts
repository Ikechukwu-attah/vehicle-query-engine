import type { Vehicle, Filters } from "./types";

export const defaultFilters: Filters = {
  query: "",
  vehicleTypes: [],
  manufacturers: [],
  yearMin: null,
  yearMax: null,
  bikeTypes: [],
  seats: [],
  horsepowerMin: null,
  horsepowerMax: null,
  maxCrewMin: null,
  maxCrewMax: null,
};

export const filterVehicles = (
  vehicles: Vehicle[],
  filters: Filters,
): Vehicle[] =>
  vehicles.filter((vehicle) => {
    if (
      filters.vehicleTypes.length > 0 &&
      !filters.vehicleTypes.includes(vehicle.vehicleType)
    )
      return false;

    const trimmedQuery = filters.query.trim().toLowerCase();
    if (trimmedQuery !== "") {
      const matchesManufacturer = vehicle.manufacturer
        .toLowerCase()
        .includes(trimmedQuery);
      const matchesModel = vehicle.model.toLowerCase().includes(trimmedQuery);
      if (!matchesManufacturer && !matchesModel) return false;
    }

    if (
      filters.manufacturers.length > 0 &&
      !filters.manufacturers.includes(vehicle.manufacturer)
    )
      return false;

    if (filters.yearMin !== null && vehicle.year < filters.yearMin)
      return false;
    if (filters.yearMax !== null && vehicle.year > filters.yearMax)
      return false;

    if (filters.bikeTypes.length > 0 && vehicle.vehicleType === "bike") {
      if (!filters.bikeTypes.includes(vehicle.bikeType)) return false;
    }

    if (filters.seats.length > 0 && vehicle.vehicleType === "car") {
      if (!filters.seats.includes(vehicle.seats)) return false;
    }

    if (vehicle.vehicleType === "car") {
      if (
        filters.horsepowerMin !== null &&
        vehicle.horsepower < filters.horsepowerMin
      )
        return false;
      if (
        filters.horsepowerMax !== null &&
        vehicle.horsepower > filters.horsepowerMax
      )
        return false;
    }

    if (vehicle.vehicleType === "spaceship") {
      if (filters.maxCrewMin !== null && vehicle.maxCrew < filters.maxCrewMin)
        return false;
      if (filters.maxCrewMax !== null && vehicle.maxCrew > filters.maxCrewMax)
        return false;
    }

    return true;
  });
