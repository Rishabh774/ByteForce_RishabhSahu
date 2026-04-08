import React from 'react';
import { Star } from 'lucide-react';

const RatingCard = ({ rating }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-bold text-dark">{rating.user?.name}</h4>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < rating.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(rating.createdAt).toLocaleDateString()}
        </span>
      </div>
      {rating.comment && (
        <p className="text-gray-600 text-sm">{rating.comment}</p>
      )}
    </div>
  );
};

export default RatingCard;
