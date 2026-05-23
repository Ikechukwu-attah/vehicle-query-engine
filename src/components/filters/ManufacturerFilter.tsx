import { useState } from "react";

type Props = {
  value: string[];
  onChange: (next: string[]) => void;
  manufacturers: string[];
};

export const ManufacturerFilter = ({ value, onChange, manufacturers }: Props) => {
  const [search, setSearch] = useState("");

  const filtered = search.trim() === ""
    ? manufacturers
    : manufacturers.filter((m) =>
        m.toLowerCase().includes(search.trim().toLowerCase())
      );

  return (
    <div>
      <p className="text-sm font-semibold text-gray-700 mb-2">
        Manufacturer{value.length > 0 ? ` (${value.length})` : ""}
      </p>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1 text-sm w-full mb-2 placeholder:text-gray-400"
      />
      <div className="max-h-48 overflow-y-auto border border-gray-200 rounded p-2 space-y-1">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400 px-1">No matches</p>
        ) : (
          filtered.map((manufacturer) => {
            const isChecked = value.includes(manufacturer);
            return (
              <label
                key={manufacturer}
                className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 px-1 py-0.5 rounded"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() =>
                    onChange(
                      isChecked
                        ? value.filter((m) => m !== manufacturer)
                        : [...value, manufacturer]
                    )
                  }
                />
                {manufacturer}
              </label>
            );
          })
        )}
      </div>
    </div>
  );
};
