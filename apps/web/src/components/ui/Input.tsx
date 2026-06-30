import { type InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({
  label,
  error,
  ...props
}: Props) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        {...props}
        className={`
          w-full
          rounded-lg
          border
          border-slate-300
          px-3
          py-2
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          ${props.className ?? ""}
        `}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}