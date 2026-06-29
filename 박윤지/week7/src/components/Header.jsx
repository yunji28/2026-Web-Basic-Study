import { Link } from "react-router-dom";
import heartOutline from "../assets/heart-outline.svg";
import searchIcon from "../assets/search-icon.svg"; // 검색 아이콘 임포트
import "./Header.css";

function Header({ onSearch }) {
  return (
    <header className="navbar">
      <div className="nav-container">
        {/* 로고 */}
        <h1 className="logo">
          <Link to="/" className="logo-text">
            🎬 Movie Log
          </Link>
        </h1>

        {/* 우측 즐겨찾기 버튼 */}
        <div className="fav-page-btn">
          {/* ⭐ 영화 등록 페이지 이동 버튼 */}
          <Link to="/add" className="add-movie-link">
            ➕ 영화 추가
          </Link>

          <Link
            to="/favorites"
            className="favorite-icon-link"
            title="즐겨찾기 이동"
          >
            <img src={heartOutline} alt="즐겨찾기" />
          </Link>
        </div>
      </div>
      {/* 검색창 컨테이너 */}
      <div className="search-bar-container">
        <div className="search-bar">
          <img src={searchIcon} alt="검색" className="search-icon" />
          <input
            type="text"
            placeholder="영화 제목 검색..."
            onChange={onSearch}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
