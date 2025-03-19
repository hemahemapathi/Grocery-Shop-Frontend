import React from 'react';
import './CustomRating.css';

const CustomRating = ({ value, onChange, size = 'medium' }) => {
  const stars = [1, 2, 3, 4, 5];
  
  return (
    <div className={`custom-rating ${size}`}>
      {stars.map((star) => (
        <span
          key={star}
          className={`star ${value >= star ? 'filled' : 'empty'}`}
          onClick={() => onChange({ target: { value: star } })}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default CustomRating;
