type Props = {
  valueMin: number | null;
  valueMax: number | null;
  onChange: (next: { min: number | null; max: number | null }) => void;
};

const parseOrNull = (raw: string): number | null => {
  if (raw.trim() === "") return null;
  const n = parseInt(raw, 10);
  return isNaN(n) ? null : n;
};

export const MaxCrewFilter = ({ valueMin, valueMax, onChange }: Props) => (
  <div>
    <p className="text-sm font-semibold text-gray-700 mb-2">Max crew</p>
    <div className="flex gap-2">
      <label className="flex flex-col flex-1 gap-1">
        <span className="text-xs text-gray-500">From</span>
        <input
          type="number"
          inputMode="numeric"
          value={valueMin === null ? "" : valueMin}
          placeholder="e.g. 2"
          onChange={(e) => onChange({ min: parseOrNull(e.target.value), max: valueMax })}
          className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
        />
      </label>
      <label className="flex flex-col flex-1 gap-1">
        <span className="text-xs text-gray-500">To</span>
        <input
          type="number"
          inputMode="numeric"
          value={valueMax === null ? "" : valueMax}
          placeholder="e.g. 10"
          onChange={(e) => onChange({ min: valueMin, max: parseOrNull(e.target.value) })}
          className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
        />
      </label>
    </div>
  </div>
);
