import { useState } from "react";
import StarRating from "./StarRating";

export default function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} start</p>
    </div>
  );
}
