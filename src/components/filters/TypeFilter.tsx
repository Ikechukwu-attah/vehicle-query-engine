import type { VehicleType } from "@/lib/types";

const typeLabel: Record<VehicleType, string> = {
  bike: "Bike",
  car: "Car",
  spaceship: "Spaceship",
};

const types: VehicleType[] = ["bike", "car", "spaceship"];

type Props = {
  value: VehicleType[];
  onChange: (next: VehicleType[]) => void;
};

export const TypeFilter = ({ value, onChange }: Props) => (
  <div>
    <p className="text-sm font-semibold text-gray-700 mb-2">Type</p>
    <div className="flex flex-wrap gap-2">
      {types.map((type) => (
        <button
          key={type}
          type="button"
          aria-pressed={value.includes(type)}
          onClick={() =>
            onChange(
              value.includes(type)
                ? value.filter((t) => t !== type)
                : [...value, type]
            )
          }
          className={
            value.includes(type)
              ? "px-3 py-1.5 rounded-full text-sm border transition-colors bg-gray-900 border-gray-900 text-white hover:bg-gray-800"
              : "px-3 py-1.5 rounded-full text-sm border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          }
        >
          {typeLabel[type]}
        </button>
      ))}
    </div>
  </div>
);
