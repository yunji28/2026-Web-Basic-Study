import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import movieData from "./mock/dummy.json"; // 원본 데이터
import Header from "./components/Header";
import MainPage from "./page/MainPage";
import FavoritePage from "./page/FavoritePage";
import MoviePage from "./page/MoviePage";
import AddMoviePage from "./page/AddMoviePage";

import "./App.css";

export default function App() {
  // 1. 모든 영화 데이터에 isLiked 속성을 추가하여 상태(State)로 관리합니다.
  const [movies, setMovies] = useState(
    movieData.map((movie) => ({ ...movie, isLiked: false })),
  );

  // ⭐ 검색어 상태 추가
  const [searchTerm, setSearchTerm] = useState("");

  // 2. 하트를 누를 때 실행될 함수 (상태 변경 로직)
  // 기존 영화 배열을 순회하며, id가 일치하는 영화의 isLiked 상태만 반전시킨 새로운 배열을 반환
  const toggleHeart = (id) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, isLiked: !movie.isLiked } : movie,
      ),
    );
  };

  // ⭐ 3. 영화 삭제 함수
  const deleteMovie = (id) => {
    // window.confirm : 확인 창을 띄워 사용자에게 재확인 받습니다.
    if (window.confirm("정말로 이 영화를 삭제하시겠습니까?")) {
      // filter() : 인수로 받은 조건을 만족하는 요소들만 뽑아 리스트로 만든다.
      // 즉 movie.id 가 전달받은 id가 아닌 영화들만을 남기는 것!
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id != id));
    }
  };

  // ⭐ 4. 검색어 변경 핸들러
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // ⭐ 5. 검색어에 따라 필터링된 영화 목록
  // 검색어가 있으면 제목에 검색어가 포함된 영화만 필터링하고, 없으면 전체 영화를 보여줍니다.
  const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <BrowserRouter>
      {/* ⭐ Header에 검색 핸들러를 prop으로 전달합니다. */}
      <Header onSearch={handleSearch} />
      <Routes>
        {/* ⭐ MainPage에 필터링된 영화 목록과 기능 함수들을 넘겨줍니다. */}
        <Route
          path="/"
          element={
            <MainPage
              movies={filteredMovies}
              onToggle={toggleHeart}
              onDelete={deleteMovie}
            />
          }
        />
        {/* FavoritePage에는 '좋아요'한 영화만 걸러서(filter) 넘겨줍니다. */}
        <Route
          path="/favorites"
          element={
            <FavoritePage
              movies={movies.filter((m) => m.isLiked)}
              onToggle={toggleHeart}
              onDelete={deleteMovie}
            />
          }
        />
        {/* 동적 라우팅 */}
        <Route
          path="/movie/:id"
          element={
            <MoviePage
              movies={movies}
              onToggle={toggleHeart}
              onDelete={deleteMovie}
            />
          }
        />
        {/* 영화 추가 라우트 추가 및 Props 전달 */}
        {/* 영화 추가 페이지를 위한 동적 라우팅을 작성해 봅시다. 주소 경로는 '/add'로 설정합니다. */}
        <Route
          path="/add"
          element={<AddMoviePage movies={movies} setMovies={setMovies} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
