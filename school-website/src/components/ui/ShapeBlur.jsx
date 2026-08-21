// components/ui/ShapeBlur.jsx
import React from 'react';

const ShapeBlur = ({ 
  className = '', 
  shape = 'square',
  blurAmount = 20,
  color = 'rgba(16, 185, 129, 0.3)',
  size = 200,
  position = 'center'
}) => {
  const getPositionStyles = () => {
    switch(position) {
      case 'top-left': return { top: '10%', left: '10%' };
      case 'top-right': return { top: '10%', right: '10%' };
      case 'bottom-left': return { bottom: '10%', left: '10%' };
      case 'bottom-right': return { bottom: '10%', right: '10%' };
      case 'center': default: return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  };

  const getShapeStyles = () => {
    const baseStyles = {
      width: size,
      height: size,
      background: color,
      filter: `blur(${blurAmount}px)`,
      position: 'absolute',
      ...getPositionStyles(),
    };

    switch(shape) {
      case 'square':
        return { ...baseStyles, borderRadius: '0%' };
      case 'circle':
        return { ...baseStyles, borderRadius: '50%' };
      case 'rounded-square':
        return { ...baseStyles, borderRadius: '20%' };
      default:
        return baseStyles;
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div style={getShapeStyles()} />
    </div>
  );
};

export default ShapeBlur;