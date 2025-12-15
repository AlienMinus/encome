import React from 'react';
import * as FaIcons from 'react-icons/fa';

const Icon = ({ name }) => {
  const IconComponent = FaIcons[name];
  if (!IconComponent) {
    return null;
  }
  return <IconComponent />;
};

export default Icon;
