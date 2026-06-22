import { Link } from "react-router-dom";
import heartOutline from "../assets/heart-outline.svg";
import "./Header.css";

function Header() {
  return (
    <header className="navbar">
      <div className="nav-container">
        {/* 중앙 로고 */}
        <h1 className="logo">
          <Link to="/" className="logo-text">
            🎬 Movie Log
          </Link>
        </h1>

        {/* 우측 즐겨찾기 버튼 */}
        <div className="fav-page-btn">

          {/* ⭐ 영화 등록 페이지 이동 버튼 */}
          {/* 클릭해서 영화 등록 페이지로 이동할 수 있는 링크 버튼을 만들어 봅시다. */}
          <Link to="/add" className="add-movie-link">
            ➕ 영화 추가
          </Link>

          <Link to="/favorites" className="favorite-icon-link" title="즐겨찾기 이동">
            {/* hertOutline 이미지를 클릭하면 즐겨찾기 페이지로 이동합니다. */}
            <img src={heartOutline} alt="즐겨찾기" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
