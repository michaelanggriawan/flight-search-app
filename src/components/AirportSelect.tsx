'use client';

import { useState, useEffect, useRef } from 'react';
import { useAirportSearch } from '@/hooks/useAirportSearch';

type Props = {
  label: string;
  value: string;
  onChange: (code: string) => void;
};

export default function AirportSelect({ label, value, onChange }: Props) {
  console.log("debug value", value)
  const [inputValue, setInputValue] = useState(value);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectionMade, setSelectionMade] = useState(false);
  const blurTimeout = useRef<NodeJS.Timeout | null>(null);
  const results = useAirportSearch(inputValue ?? '');

  useEffect(() => {
    if (selectionMade) {
      setInputValue(value);
      setSelectionMade(false);
    }
  }, [value, selectionMade]);

  const handleSelect = (airport: (typeof results)[0]) => {
    onChange(airport.code);
    setSelectionMade(true);
    setShowDropdown(false);
  };

  const handleBlur = () => {
    blurTimeout.current = setTimeout(() => {
      setShowDropdown(false);
      if (!selectionMade) {
        setInputValue(value);
      }
    }, 150);
  };

  const handleFocus = () => {
    if (blurTimeout.current) clearTimeout(blurTimeout.current);
    setShowDropdown(true);
  };

  return (
    <div className="relative">
      <label className="text-sm font-medium text-gray-600 mb-1 block">{label}</label>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowDropdown(true);
          setSelectionMade(false); // mark as not selected
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Search airports..."
        className="w-full p-3 border rounded-md text-gray-800"
      />

      {showDropdown && (
        <ul className="absolute z-50 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {results.length > 0 ? (
            results.map((airport, index) => (
              <li
                key={`${airport.name}-${index}`}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                onMouseDown={() => handleSelect(airport)} // <-- use onMouseDown to avoid blur race
              >
                <div className="text-xs text-gray-500">
                  {airport.name} — {airport.code}
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-400 text-sm">No results</li>
          )}
        </ul>
      )}
    </div>
  );
}
