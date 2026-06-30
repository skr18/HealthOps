import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="rounded-xl bg-white shadow-sm border border-slate-200 p-6">
      {children}
    </div>
  );
}