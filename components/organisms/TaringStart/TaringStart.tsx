import { FC } from "react";
import { EmptyStarIcon } from "../../atoms/icons/starIcon/EmptyStarIcon";
import { FullStarIcon } from "../../atoms/icons/starIcon/FullStarIcon";

interface StarRatingProps {
  totalStars: number;
  userRating: number;
  onRatingChange: (rating: number) => void;
}

export const TaringStart: FC<StarRatingProps> = ({
  totalStars,
  userRating,
  onRatingChange,
}) => {
  const handleRatingChange = (newRating: number) => {
    if (newRating !== userRating) {
      onRatingChange(newRating);
    }
  };

  return (
    <div>
      {Array.from({ length: totalStars }, (_, index) => (
        <span key={index} onClick={() => handleRatingChange(index + 1)}>
          {index < userRating ? <FullStarIcon /> : <EmptyStarIcon />}
        </span>
      ))}
    </div>
  );
};
