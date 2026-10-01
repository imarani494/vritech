import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  className = '',
}) => {
  const baseClasses =
    'inline-flex items-center font-medium rounded-full tracking-wide transition-colors uppercase';

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  };

  const variantClasses = {
    primary: 'bg-indigo-100 text-indigo-800 border border-indigo-200',
    secondary: 'bg-slate-100 text-slate-700 border border-slate-200',
    accent: 'bg-amber-100 text-amber-900 border border-amber-200',
    outline: 'bg-transparent text-slate-600 border border-slate-300',
  };

  return (
    <span className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
