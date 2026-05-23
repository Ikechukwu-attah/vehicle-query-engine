"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Sidebar } from "@/components/Sidebar";
import { VehicleCard } from "@/components/VehicleCard";
import { getAllVehicles } from "@/lib/data";
import { filterVehicles, defaultFilters } from "@/lib/filter";
import { useDebounce } from "@/lib/useDebounce";
import type { Filters } from "@/lib/types";

const allVehicles = getAllVehicles();

export default function Home() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const debouncedQuery = useDebounce(filters.query, 300);

  const filteredVehicles = useMemo(
    () => filterVehicles(allVehicles, { ...filters, query: debouncedQuery }),
    [filters, debouncedQuery]
  );

  return (
    <AppShell sidebar={<Sidebar filters={filters} onChange={setFilters} />}>
      <p className="text-sm text-gray-500 mb-6">
        Showing {filteredVehicles.length} of {allVehicles.length} vehicles
      </p>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search manufacturer or model..."
          value={filters.query}
          onChange={(e) => setFilters({ ...filters, query: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      {filteredVehicles.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center">
          <p className="text-gray-600 font-medium">No vehicles match your filters</p>
          <p className="text-sm text-gray-500 mt-1">Try clearing your search or adjusting filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </AppShell>
  );
}
