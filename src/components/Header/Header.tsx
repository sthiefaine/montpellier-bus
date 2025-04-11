// src/components/Header/Header.tsx
import React from 'react';

interface HeaderProps {
  currentTime: Date;
}

const Header = ({ currentTime }: HeaderProps) => {

  const formattedTime = currentTime.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const formattedDate = currentTime.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-10 w-full bg-blue-600 text-white shadow-md">
      <div className="max-w-2xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Montpellier Sabines</h1>
            <p className="text-s capitalize">{formattedDate}</p>
          </div>
          <div className="text-right">
          <p className="text-s">Heure :</p>
            <div className="text-xl font-bold">{formattedTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;