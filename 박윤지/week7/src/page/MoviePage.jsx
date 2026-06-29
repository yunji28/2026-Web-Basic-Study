import { useParams, useNavigate } from "react-router-dom";
import heart from "../assets/heart.svg";
import heartOutline from "../assets/heart-outline.svg";
import deleteIcon from "../assets/delete-icon.svg";
import "./MoviePage.css";

function MoviePage({ movies, onToggle, onDelete }) {
  // 1. URL에서 :id 값을 가져옵니다.
  const { id } = useParams();
  // 페이지 이동을 위한 navigate 함수
  const navigate = useNavigate();

  // 2. 전체 데이터 중 ID가 일치하는 영화 하나만 찾습니다.
  // URL의 id는 문자열이므로 숫자로 변환(Number)하여 비교합니다.
  const movie = movies.find((m) => m.id === Number(id));

  // 데이터를 찾지 못했을 때의 예외 처리
  if (!movie) {
    return <div className="error">영화를 찾을 수 없습니다.</div>;
  }

  // ⭐ 삭제 버튼 클릭 핸들러
  const handleDelete = () => {
    onDelete(movie.id);
    navigate("/"); // 삭제 후 메인 페이지로 이동
  };

  return (
    <div className="movie-detail-container">
      {/* 상단: 큰 포스터 이미지 */}
      <div className="detail-poster">
        <img src={movie.posterImgUrl} alt={movie.title} />
      </div>

      {/* 하단: 영화 상세 정보 */}
      <div className="detail-content">
        <div>
          <div className="detail-title-container">
            <h1>{movie.title}</h1>
            {/* ⭐ 삭제 버튼 추가 */}
            <button className="delete-btn-detail" onClick={handleDelete}>
              <img src={deleteIcon} alt="삭제" />
            </button>
          </div>
          <button className="like-btn" onClick={() => onToggle(movie.id)}>
            <img src={movie.isLiked ? heart : heartOutline} alt="좋아요" />
          </button>
        </div>

        <p className="detail-subtitle">{movie.subTitle}</p>

        <div className="detail-genres">
          {movie.genres.map((genre, index) => (
            <span key={index}>{genre}</span>
          ))}
        </div>

        <div className="detail-summary">
          <p>{movie.description}</p>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
