import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: ReactNode;
}
export function Button({ title, icon, ...rest }: ButtonProps) {
  return (
    <button {...rest} className="text-lg flex items-center bg-green p-4 rounded-xl min-w-[200px] gap-3 text-white justify-center ">
      {title}
      {icon}
    </button>
  );
}
