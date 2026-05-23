export type VehicleType = "bike" | "car" | "spaceship";

export type BaseVehicle = {
  id: string;
  vehicleType: VehicleType;
  manufacturer: string;
  model: string;
  year: number;
};

export type Bike = BaseVehicle & {
  vehicleType: "bike";
  bikeType: string;
  gears: number;
  wheelSize: number;
};

export type Car = BaseVehicle & {
  vehicleType: "car";
  colour: string;
  engineSize: number;
  horsepower: number;
  seats: number;
  topSpeed: number;
};

export type Spaceship = BaseVehicle & {
  vehicleType: "spaceship";
  maxCrew: number;
  topSpeedLightFraction: number;
};

export type Vehicle = Bike | Car | Spaceship;

export type Filters = {
  query: string;
  vehicleTypes: VehicleType[];
  manufacturers: string[];
  yearMin: number | null;
  yearMax: number | null;
  bikeTypes: string[];
  seats: number[];
  horsepowerMin: number | null;
  horsepowerMax: number | null;
  maxCrewMin: number | null;
  maxCrewMax: number | null;
};
