// components/Icon.tsx
import React from 'react';

interface IconProps {
  type: string;
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ type, size = 24, color = 'black', ...props }) => (
  <svg
    className="icon"
    aria-hidden="true"
    width={size}
    height={size}
    fill={color}
    {...props}
  >
    <use xlinkHref={`#${type}`}></use>
  </svg>
);

export default Icon;
