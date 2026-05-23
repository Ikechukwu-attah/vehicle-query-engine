import { describe, it, expect } from "vitest";
import { filterVehicles, defaultFilters } from "./filter";
import type { Vehicle } from "./types";

const bike: Vehicle = {
  id: "bike-test-1",
  vehicleType: "bike",
  manufacturer: "EraCraft",
  model: "Urbanite",
  year: 2014,
  bikeType: "Road",
  gears: 3,
  wheelSize: 29,
};

const car: Vehicle = {
  id: "car-test-1",
  vehicleType: "car",
  manufacturer: "Aurora Motors",
  model: "Pop",
  year: 1956,
  colour: "Teal",
  engineSize: 1.2,
  horsepower: 702,
  seats: 4,
  topSpeed: 412.8,
};

const spaceship: Vehicle = {
  id: "spaceship-test-1",
  vehicleType: "spaceship",
  manufacturer: "Titan Galactic",
  model: "Star Wanderer",
  year: 2021,
  maxCrew: 400,
  topSpeedLightFraction: 0.7098,
};

const vehicles: Vehicle[] = [bike, car, spaceship];

describe("filterVehicles", () => {
  describe("with no filters applied", () => {
    it("returns all vehicles when filters are defaults", () => {
      expect(filterVehicles(vehicles, defaultFilters)).toHaveLength(3);
    });
  });

  describe("vehicleTypes filter", () => {
    it("returns only matching types when one type is selected", () => {
      const result = filterVehicles(vehicles, { ...defaultFilters, vehicleTypes: ["bike"] });
      expect(result).toEqual([bike]);
    });

    it("returns multiple types when multiple are selected", () => {
      const result = filterVehicles(vehicles, { ...defaultFilters, vehicleTypes: ["bike", "car"] });
      expect(result).toHaveLength(2);
      expect(result).toContain(bike);
      expect(result).toContain(car);
    });

    it("returns all vehicles when array is empty", () => {
      expect(filterVehicles(vehicles, { ...defaultFilters, vehicleTypes: [] })).toHaveLength(3);
    });
  });

  describe("query filter", () => {
    it("matches manufacturer case-insensitively", () => {
      const result = filterVehicles(vehicles, { ...defaultFilters, query: "aurora" });
      expect(result).toContain(car);
    });

    it("matches model case-insensitively", () => {
      const result = filterVehicles(vehicles, { ...defaultFilters, query: "star wanderer" });
      expect(result).toContain(spaceship);
    });

    it("returns nothing when query has no matches", () => {
      expect(filterVehicles(vehicles, { ...defaultFilters, query: "zzznomatch" })).toHaveLength(0);
    });

    it("ignores whitespace-only query", () => {
      expect(filterVehicles(vehicles, { ...defaultFilters, query: "   " })).toHaveLength(3);
    });
  });

  describe("manufacturers filter", () => {
    it("returns vehicles only from specified manufacturers", () => {
      const result = filterVehicles(vehicles, { ...defaultFilters, manufacturers: ["EraCraft"] });
      expect(result).toEqual([bike]);
    });

    it("returns all when array is empty", () => {
      expect(filterVehicles(vehicles, { ...defaultFilters, manufacturers: [] })).toHaveLength(3);
    });
  });

  describe("year range", () => {
    it("respects yearMin only", () => {
      const result = filterVehicles(vehicles, { ...defaultFilters, yearMin: 2000 });
      expect(result).toContain(bike);
      expect(result).toContain(spaceship);
      expect(result).not.toContain(car);
    });

    it("respects yearMax only", () => {
      const result = filterVehicles(vehicles, { ...defaultFilters, yearMax: 2000 });
      expect(result).toEqual([car]);
    });

    it("respects both yearMin and yearMax", () => {
      const result = filterVehicles(vehicles, { ...defaultFilters, yearMin: 2010, yearMax: 2018 });
      expect(result).toEqual([bike]);
    });

    it("returns all when both are null", () => {
      expect(filterVehicles(vehicles, { ...defaultFilters, yearMin: null, yearMax: null })).toHaveLength(3);
    });
  });

  describe("bike-specific filters", () => {
    it("filters bikes by bikeType but passes non-bikes through unchanged", () => {
      const result = filterVehicles(vehicles, { ...defaultFilters, bikeTypes: ["Road"] });
      expect(result).toContain(bike);
      expect(result).toContain(car);
      expect(result).toContain(spaceship);
    });

    it("returns non-bike vehicles even when bikeTypes is set", () => {
      const result = filterVehicles(vehicles, { ...defaultFilters, bikeTypes: ["Mountain"] });
      expect(result).not.toContain(bike);
      expect(result).toContain(car);
      expect(result).toContain(spaceship);
    });
  });

  describe("car-specific filters", () => {
    it("filters cars by seats but passes non-cars through unchanged", () => {
      const result = filterVehicles(vehicles, { ...defaultFilters, seats: [4] });
      expect(result).toContain(car);
      expect(result).toContain(bike);
      expect(result).toContain(spaceship);
    });

    it("filters cars by horsepower range", () => {
      const result = filterVehicles(vehicles, { ...defaultFilters, horsepowerMin: 800 });
      expect(result).not.toContain(car);
      expect(result).toContain(bike);
      expect(result).toContain(spaceship);
    });
  });

  describe("spaceship-specific filters", () => {
    it("filters spaceships by maxCrew range but passes non-spaceships through", () => {
      const result = filterVehicles(vehicles, { ...defaultFilters, maxCrewMin: 500 });
      expect(result).not.toContain(spaceship);
      expect(result).toContain(bike);
      expect(result).toContain(car);
    });
  });

  describe("filter composition", () => {
    it("combines multiple filters with AND semantics", () => {
      const result = filterVehicles(vehicles, {
        ...defaultFilters,
        vehicleTypes: ["car"],
        manufacturers: ["Aurora Motors"],
      });
      expect(result).toEqual([car]);
    });
  });
});
