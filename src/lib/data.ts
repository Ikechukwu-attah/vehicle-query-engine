import rawBikes from "@/data/bikes.json";
import rawCars from "@/data/cars.json";
import rawSpaceships from "@/data/spaceships.json";
import type { Bike, Car, Spaceship, Vehicle } from "./types";

type RawBike = {
  brand: string;
  gears: number;
  model: string;
  type: string;
  wheel_size: number;
  year: number;
};

type RawCar = {
  colour: string;
  engine_size: number;
  horsepower: number;
  make: string;
  model: string;
  seats: number;
  top_speed: number;
  year: number;
};

type RawSpaceship = {
  manufacturer: string;
  max_crew: number;
  model: string;
  top_speed: number;
  year: number;
};

const normalizeBike = (raw: RawBike, index: number): Bike => ({
  id: `bike-${index}`,
  vehicleType: "bike",
  manufacturer: raw.brand,
  model: raw.model,
  year: raw.year,
  bikeType: raw.type,
  gears: raw.gears,
  wheelSize: raw.wheel_size,
});

const normalizeCar = (raw: RawCar, index: number): Car => ({
  id: `car-${index}`,
  vehicleType: "car",
  manufacturer: raw.make,
  model: raw.model,
  year: raw.year,
  colour: raw.colour,
  engineSize: raw.engine_size,
  horsepower: raw.horsepower,
  seats: raw.seats,
  topSpeed: raw.top_speed,
});

const normalizeSpaceship = (raw: RawSpaceship, index: number): Spaceship => ({
  id: `spaceship-${index}`,
  vehicleType: "spaceship",
  manufacturer: raw.manufacturer,
  model: raw.model,
  year: raw.year,
  maxCrew: raw.max_crew,
  topSpeedLightFraction: raw.top_speed,
});

export function getAllVehicles(): Vehicle[] {
  const bikes = (rawBikes as unknown as RawBike[]).slice(1).map(normalizeBike);
  const cars = (rawCars as unknown as RawCar[]).slice(1).map(normalizeCar);
  const spaceships = (rawSpaceships as unknown as RawSpaceship[])
    .slice(1)
    .map(normalizeSpaceship);
  return [...bikes, ...cars, ...spaceships];
}

export const getManufacturers = (): string[] => {
  const set = new Set(getAllVehicles().map((v) => v.manufacturer));
  return Array.from(set).sort();
};

export const getBikeTypes = (): string[] => {
  const bikes = getAllVehicles().filter((v) => v.vehicleType === "bike");
  const set = new Set(bikes.map((v) => v.bikeType));
  return Array.from(set).sort();
};

export const getCarSeats = (): number[] => {
  const cars = getAllVehicles().filter((v) => v.vehicleType === "car");
  const set = new Set(cars.map((v) => v.seats));
  return Array.from(set).sort((a, b) => a - b);
};
