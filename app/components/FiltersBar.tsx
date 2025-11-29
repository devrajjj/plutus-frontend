'use client';

interface FiltersBarProps {
  nameFilter: string;
  cityFilter: string;
  onNameChange: (value: string) => void;
  onCityChange: (value: string) => void;
}

export default function FiltersBar({
  nameFilter,
  cityFilter,
  onNameChange,
  onCityChange,
}: FiltersBarProps) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        placeholder="Filter by name..."
        value={nameFilter}
        onChange={(e) => onNameChange(e.target.value)}
        className="px-4 py-2 border border-stone-300 dark:border-gray-700 rounded-lg bg-stone-50 dark:bg-gray-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Filter by city..."
        value={cityFilter}
        onChange={(e) => onCityChange(e.target.value)}
        className="px-4 py-2 border border-stone-300 dark:border-gray-700 rounded-lg bg-stone-50 dark:bg-gray-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

