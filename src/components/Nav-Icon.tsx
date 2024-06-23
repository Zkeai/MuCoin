// components/Icon.tsx
import React from 'react';
interface IconProps {
  className: string;
  type: string;
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({type,...props }) => (
    
  <svg
    aria-hidden="true"
    width="18"
    height="18"

    {...props}
  >

    <use  xlinkHref={`#${type}`}></use>
  </svg>
);

export default Icon;
