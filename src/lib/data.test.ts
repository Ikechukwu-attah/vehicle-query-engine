import { describe, it, expect } from "vitest";
import { getAllVehicles, getManufacturers, getBikeTypes, getCarSeats } from "./data";

describe("getAllVehicles", () => {
  it("returns 120 vehicles", () => {
    expect(getAllVehicles()).toHaveLength(120);
  });

  it("skips the schema row from each file", () => {
    const vehicles = getAllVehicles();
    const schemaStrings = [
      "Manufacturer of the bicycle.",
      "Manufacturer of the car.",
      "Manufacturer of the spaceship.",
    ];
    const hasSchema = vehicles.some((v) => schemaStrings.includes(v.manufacturer));
    expect(hasSchema).toBe(false);
  });

  it("assigns unique ids to all vehicles", () => {
    const vehicles = getAllVehicles();
    expect(new Set(vehicles.map((v) => v.id)).size).toBe(vehicles.length);
  });

  it("assigns the correct vehicleType discriminator to each vehicle", () => {
    const vehicles = getAllVehicles();
    const bikes = vehicles.filter((v) => v.vehicleType === "bike");
    const cars = vehicles.filter((v) => v.vehicleType === "car");
    const spaceships = vehicles.filter((v) => v.vehicleType === "spaceship");
    expect(bikes.every((v) => v.vehicleType === "bike")).toBe(true);
    expect(cars.every((v) => v.vehicleType === "car")).toBe(true);
    expect(spaceships.every((v) => v.vehicleType === "spaceship")).toBe(true);
  });

  it("normalizes brand to manufacturer for bikes", () => {
    const bikes = getAllVehicles().filter((v) => v.vehicleType === "bike");
    expect(bikes.every((v) => typeof v.manufacturer === "string" && v.manufacturer.length > 0)).toBe(true);
  });

  it("normalizes make to manufacturer for cars", () => {
    const cars = getAllVehicles().filter((v) => v.vehicleType === "car");
    expect(cars.every((v) => typeof v.manufacturer === "string" && v.manufacturer.length > 0)).toBe(true);
  });

  it("preserves manufacturer name for spaceships", () => {
    const spaceships = getAllVehicles().filter((v) => v.vehicleType === "spaceship");
    expect(spaceships.every((v) => typeof v.manufacturer === "string" && v.manufacturer.length > 0)).toBe(true);
  });
});

describe("getManufacturers", () => {
  it("returns a sorted array of unique manufacturers", () => {
    const manufacturers = getManufacturers();
    const sorted = [...manufacturers].sort();
    expect(manufacturers).toEqual(sorted);
  });

  it("has no duplicates", () => {
    const manufacturers = getManufacturers();
    expect(new Set(manufacturers).size).toBe(manufacturers.length);
  });
});

describe("getBikeTypes", () => {
  it("returns sorted unique bike types", () => {
    const types = getBikeTypes();
    const sorted = [...types].sort();
    expect(types).toEqual(sorted);
  });

  it("does not include null or undefined", () => {
    const types = getBikeTypes();
    expect(types.every((t) => t != null)).toBe(true);
  });
});

describe("getCarSeats", () => {
  it("returns sorted unique seat counts as numbers", () => {
    const seats = getCarSeats();
    expect(seats.every((s) => typeof s === "number")).toBe(true);
  });

  it("sorts numerically not lexicographically", () => {
    const seats = getCarSeats();
    const sorted = [...seats].sort((a, b) => a - b);
    expect(seats).toEqual(sorted);
  });
});
