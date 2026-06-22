import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddMoviePage.css"; // CSS 파일 로드

function AddMoviePage({ movies, setMovies }) {
    const navigate = useNavigate();

    // 1. 5가지 입력 필드를 하나의 객체 상태로 관리하기
    const [formData, setFormData] = useState({
        title: "",
        subTitle: "",
        description: "",
        genres: "",
        posterImgUrl: "",
    });

    // 2. 입력 창의 값이 바뀔 때 실행될 핸들러 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        /* 스프레드 연산자로 기존 객체를 복사한 뒤, 변경된 키만 덮어 쓴다.*/
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // 3. 새로운 영화 등록 핸들러 함수
    const handleSubmit = (e) => {
        e.preventDefault(); // 페이지 새로고침 방지

        // 예외 처리: 필수 항목 검사
        if (!formData.title || !formData.posterImgUrl) {
            alert("영화 제목과 사진 URL은 필수 입력 항목입니다!");
            return;
        }

        // 새로운 영화 객체 생성 (기존 dummy.json 구조와 일치화)
        // 기존 dummy.json의 데이터 구조와 똑같은 형태의 새로운 영화 객체(newMovie)를 완성해 봅시다.
        const newMovie = {
            id: movies.length > 0 ? Math.max(...movies.map((m) => m.id)) + 1 : 1,
            title: formData.title,
            subTitle: formData.subTitle,
            description: formData.description,
            genres: formData.genres ? formData.genres.split(",").map((g) => g.trim()) : ["기타"],
            posterImgUrl: formData.posterImgUrl,
            isLiked: false, // 새로 등록된 영화의 하트 초기 상태
        };

        // 부모 상태 배열에 새 데이터 추가
        // 부모에게 상속받은 setMovies 함수를 활용하여 기존 영화 목록 배열 뒤에 새 영화(newMovie)를 추가해 봅시다.
        setMovies((prev) => [...prev, newMovie]);

        alert("🎬 새로운 영화가 성공적으로 등록되었습니다!");
        navigate("/"); // 등록 완료 후 메인 화면으로 리다이렉트
    };

    return (
        <div className="add-movie-container">
            <h1>새로운 영화 추가하기</h1>
            <p className="add-movie-subtitle">
                인상 깊게 본 영화나 나만 알고 싶은 숨은 명작을 기록해 보세요.
            </p>

            <form onSubmit={handleSubmit} className="add-movie-form">

                <div className="input-group">
                    <label htmlFor="title">영화 제목<span>*</span></label>
                    <input
                        type="text" id="title" name="title" value={formData.title} onChange={handleChange}
                        placeholder="예: 악마는 프라다를 입는다 2"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="subTitle">서브 타이틀</label>
                    <input
                        type="text" id="subTitle" name="subTitle" value={formData.subTitle} onChange={handleChange}
                        placeholder="예: 영원한 아이콘의 귀환"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="posterImgUrl">사진 (포스터 이미지 URL)<span>*</span></label>
                    <input
                        type="text" id="posterImgUrl" name="posterImgUrl" value={formData.posterImgUrl} onChange={handleChange}
                        placeholder="https://media.themoviedb.org/..."
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="genres">장르 (쉼표로 구분)</label>
                    <input
                        type="text" id="genres" name="genres" value={formData.genres} onChange={handleChange}
                        placeholder="예: 코미디, 드라마, 액션"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="description">줄거리 설명</label>
                    <textarea
                        id="description" name="description" value={formData.description} onChange={handleChange}
                        placeholder="영화에 대한 상세한 설명을 적어주세요." rows="5"
                    />
                </div>

                <button type="submit" className="submit-btn">
                    새로운 영화 등록하기
                </button>
            </form>
        </div>
    );
}

export default AddMoviePage;