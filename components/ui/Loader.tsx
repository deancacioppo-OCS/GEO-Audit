
import React from 'react';

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-lg font-semibold text-slate-300">{message}</p>
      <p className="text-sm text-slate-400">This may take a moment as our AI performs the audit...</p>
    </div>
  );
};

export default Loader;
