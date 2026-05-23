type Props = {
  value: number[];
  onChange: (next: number[]) => void;
  options: number[];
};

export const SeatsFilter = ({ value, onChange, options }: Props) => (
  <div>
    <p className="text-sm font-semibold text-gray-700 mb-2">Seats</p>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = value.includes(option);
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() =>
              onChange(
                isActive
                  ? value.filter((s) => s !== option)
                  : [...value, option]
              )
            }
            className={
              isActive
                ? "px-3 py-1.5 rounded-full text-sm border transition-colors bg-gray-900 border-gray-900 text-white hover:bg-gray-800"
                : "px-3 py-1.5 rounded-full text-sm border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }
          >
            {option}
          </button>
        );
      })}
    </div>
  </div>
);
