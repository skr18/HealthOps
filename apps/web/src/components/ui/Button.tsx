import { type ButtonHTMLAttributes } from 'react';

//If you didn't use ButtonHTMLAttributes, you would have to manually add every single HTML property you might ever want to use to your interface:
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
}

export function Button({
  children,
  isLoading = false,
  loadingText,
  className="",
  ...props
}: Props) {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={[
        "px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed",
        className, 
      ].join(" ")}
      
    >
      {isLoading ? loadingText || 'Loading...' : children}
    </button>
  );
}