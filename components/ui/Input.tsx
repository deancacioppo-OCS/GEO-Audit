
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>
      <input
        id={id}
        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"
        {...props}
      />
    </div>
  );
};

export default Input;
