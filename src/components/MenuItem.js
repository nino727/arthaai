import React from 'react';

const MenuItem = ({ icon, label, onClick, active }) => (
  <button
    className={`flex items-center px-4 py-2 rounded transition-colors w-full text-left hover:bg-orange-100 ${active ? 'bg-orange-200 font-bold' : ''}`}
    onClick={onClick}
  >
    {icon && <span className="mr-3">{icon}</span>}
    {label}
  </button>
);

export default MenuItem;
