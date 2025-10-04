interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showNumber = false,
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    let starType: 'full' | 'half' | 'empty';

    if (i <= Math.floor(rating)) {
      starType = 'full';
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      starType = 'half';
    } else {
      starType = 'empty';
    }

    stars.push(
      <span
        key={i}
        className={sizeClasses[size]}
      >
        {starType === 'full' && <span className="text-gold">★</span>}
        {starType === 'half' && <span className="text-gold">⯪</span>}
        {starType === 'empty' && <span className="text-volcanic-300">☆</span>}
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-1">
      <div className="flex">{stars}</div>
      {showNumber && (
        <span className={`${sizeClasses[size]} text-volcanic-600 font-medium ml-1`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};
