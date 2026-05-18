import { useNavigate } from "react-router-dom";
import "./Movie.css";
import heart from "../assets/heart.svg";
import heartOutline from "../assets/heart-outline.svg";

function Movie({ movie, onToggle }) {
  const navigate = useNavigate();

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
      <div className="poster-container">
        <img
          className="poster-img"
          src={movie.posterImgUrl}
          alt={movie.title}
        />

        <button
          className="like-btn"
          onClick={(e) => {
            e.stopPropagation();  // 부모 div로의 클릭 이벤트 전파(버블링)를 막는다
            onToggle(movie.id);   // 부모에게서 받은 온토글 함수에 영화 id를 넘긴다.
          }}
        >
          <img src={movie.isLiked ? heart : heartOutline} />
        </button>
      </div>

      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p className="subtitle">{movie.subTitle}</p>

        <ul className="genres">
          {movie.genres.map((genre, index) => (
            <li key={index}>{genre}</li>
          ))}
        </ul>

        <p className="description">
          {movie.description.length > 100
            ? movie.description.substring(0, 100) + "..."
            : movie.description}
        </p>
      </div>
    </div>
  );
}

export default Movie;
