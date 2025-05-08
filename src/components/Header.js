import React from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';
import logo from '../images/logo.png';
import heartIcon from '../images/heart.png';
import bookIcon from '../images/book.png';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload(); // 로그아웃 후 UI 갱신
  };

  return (
    <header className="Header-Container">
      <div className="Header">
        {/* 로고 영역 */}
        <Link to='/' className="Logo">
          <img src={logo} alt="키덕 로고" className="Logo-icon" />
        </Link>

        {/* 섹션 컨테이너 */}
        <div className="Section-Container">
          <div className="Tutorial-Section">
            <div className="Tutorial-Link">
              <Link to="/" className="Tutorial-text">
                조립 튜토리얼
                <img src={bookIcon} alt="책 아이콘" className="Book-icon" />
              </Link>
            </div>
          </div>
          {/* 검색 영역 */}
          <SearchBar />

          {/* 리스트 영역 */}
          <div className="List-Section">
            <div className="List-Container">

              {/* 로그인 컨테이너 */}
              <div className="Login-Container">
                <div className="Login-Link">
                  {token ? (
                    <>
                      <button onClick={() => navigate('/mypage')} style={buttonStyle}>
                        마이페이지
                      </button>
                      <button onClick={handleLogout} style={buttonStyle}>
                        로그아웃
                      </button>
                    </>
                  ) : (
                    <Link to="/login" className="Login-text">
                      회원가입 | 로그인
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
