import type { Vehicle } from "@/lib/types";

const typeLabel = {
  bike: "Bike",
  car: "Car",
  spaceship: "Spaceship",
};

export const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
  return (
    <div className="border border-gray-200 hover:border-gray-400 rounded-lg p-4 transition-colors">
      <span className="text-xs font-medium uppercase tracking-wide text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
        {typeLabel[vehicle.vehicleType]}
      </span>

      <p className="mt-2 font-bold text-gray-900">
        {vehicle.manufacturer} {vehicle.model}
      </p>

      <p className="text-sm text-gray-500 mb-3">{vehicle.year}</p>

      <ul className="space-y-1 text-sm">
        {vehicle.vehicleType === "bike" && (
          <>
            <li className="flex justify-between">
              <span className="text-gray-500">Type</span>
              <span>{vehicle.bikeType}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Gears</span>
              <span>{vehicle.gears}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Wheel size</span>
              <span>{vehicle.wheelSize}"</span>
            </li>
          </>
        )}

        {vehicle.vehicleType === "car" && (
          <>
            <li className="flex justify-between">
              <span className="text-gray-500">Engine</span>
              <span>{vehicle.engineSize}L</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Horsepower</span>
              <span>{vehicle.horsepower} hp</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Seats</span>
              <span>{vehicle.seats}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Top speed</span>
              <span>{vehicle.topSpeed} km/h</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Colour</span>
              <span>{vehicle.colour}</span>
            </li>
          </>
        )}

        {vehicle.vehicleType === "spaceship" && (
          <>
            <li className="flex justify-between">
              <span className="text-gray-500">Max crew</span>
              <span>{vehicle.maxCrew}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Top speed</span>
              <span>{vehicle.topSpeedLightFraction}c</span>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
