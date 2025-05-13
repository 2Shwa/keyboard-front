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
    alert('로그아웃 되었습니다.');
    navigate('/');
    window.location.reload();
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
                <div className="Login-Link-Wrapper">
                  {token ? (
                    <>
                      <span onClick={() => navigate('/mypage')} className="Login-text">마이페이지</span>
                      <span className="Divider">|</span>
                      <span onClick={handleLogout} className="Login-text">로그아웃</span>
                    </>
                  ) : (
                    <>
                      <Link to="/signup" className="Login-text">회원가입</Link>
                      <span className="Divider">|</span>
                      <Link to="/login" className="Login-text">로그인</Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header >
  );
}

export default Header;
