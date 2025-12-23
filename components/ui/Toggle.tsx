'use client';

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label?: string;
}

export default function Toggle({ enabled, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex items-center h-7 px-3 rounded-full text-sm font-medium transition-colors flex-shrink-0 whitespace-nowrap ${
        enabled
          ? 'bg-green-700 text-white'
          : 'bg-gray-100 text-gray-700 border border-gray-200'
      }`}
    >
      {label}
    </button>
  );
}
