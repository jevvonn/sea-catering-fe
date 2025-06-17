import React, { useState } from "react";
import { Star } from "lucide-react";

interface RatingInputProps {
  maxRating?: number;
  value?: number;
  onChange?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
  allowHalf?: boolean;
  className?: string;
  emptyColor?: string;
  fillColor?: string;
  hoverColor?: string;
}

const RatingInput: React.FC<RatingInputProps> = ({
  maxRating = 5,
  value = 0,
  onChange,
  size = "md",
  readonly = false,
  allowHalf = false,
  className = "",
  emptyColor = "text-gray-300",
  fillColor = "text-yellow-400",
  hoverColor = "text-yellow-300",
}) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const handleClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating: number) => {
    if (!readonly) {
      setHoveredRating(rating);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoveredRating(null);
    }
  };

  const getStarFill = (starIndex: number) => {
    const currentRating = hoveredRating ?? value;

    if (allowHalf) {
      if (currentRating >= starIndex) return "full";
      if (currentRating >= starIndex - 0.5) return "half";
      return "empty";
    } else {
      return currentRating >= starIndex ? "full" : "empty";
    }
  };

  const getStarColor = (starIndex: number) => {
    const fill = getStarFill(starIndex);
    if (hoveredRating !== null && hoveredRating >= starIndex) {
      return hoverColor;
    }
    return fill === "full" || fill === "half" ? fillColor : emptyColor;
  };

  const renderStar = (starIndex: number) => {
    const fill = getStarFill(starIndex);
    const color = getStarColor(starIndex);

    return (
      <div
        key={starIndex}
        className={`relative cursor-${
          readonly ? "default" : "pointer"
        } transition-colors duration-150`}
        onClick={() => handleClick(starIndex)}
        onMouseEnter={() => handleMouseEnter(starIndex)}
        onMouseLeave={handleMouseLeave}
      >
        {fill === "half" ? (
          <div className="relative">
            <Star className={`${sizeClasses[size]} ${emptyColor}`} />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star
                className={`${sizeClasses[size]} ${fillColor}`}
                fill="currentColor"
              />
            </div>
          </div>
        ) : (
          <Star
            className={`${sizeClasses[size]} ${color}`}
            fill={fill === "full" ? "currentColor" : "none"}
          />
        )}

        {allowHalf && !readonly && (
          <div
            className="absolute inset-0 w-1/2"
            onClick={(e) => {
              e.stopPropagation();
              handleClick(starIndex - 0.5);
            }}
            onMouseEnter={(e) => {
              e.stopPropagation();
              handleMouseEnter(starIndex - 0.5);
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: maxRating }, (_, i) => renderStar(i + 1))}
    </div>
  );
};

export default RatingInput;
