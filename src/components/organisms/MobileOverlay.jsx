import React from 'react';

const MobileOverlay = ({ isOpen, onClick }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
      onClick={onClick}
    />
  );
};

export default MobileOverlay;