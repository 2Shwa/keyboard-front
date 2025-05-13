import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/css/Login.css';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // 백엔드 연동용
    /* const handleLogin = async () => {
        try {
            const response = await fetch('http://172.20.132.186:8081/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });
    
            if (!response.ok) {
                throw new Error('로그인 실패');
            }
    
            const data = await response.json();
            const token = data.token; // 백엔드가 토큰을 `token`이라는 키로 넘겨준다고 가정
    
            // 토큰 저장
            localStorage.setItem('token', token);
    
            alert('로그인 성공!');
            navigate('/'); // 로그인 성공 후 메인으로 이동
        } catch (error) {
            alert('로그인 실패: ' + error.message);
        }
    }; */

    // 프론트 단독 테스트용
    const handleLogin = () => {
        if (!username && !password) {
            setErrorMessage('❌ 아이디와 비밀번호를 입력해주세요.');
            return;
        }
        if (!username) {
            setErrorMessage('❌ 아이디를 입력해주세요.');
            return;
        }
        if (!password) {
            setErrorMessage('❌ 비밀번호를 입력해주세요.');
            return;
        }

        if (username === 'hello' && password === '1234') {
            localStorage.setItem('token', 'dummy-token');
            navigate('/');
        } else {
            setErrorMessage('❌ 아이디 또는 비밀번호가 일치하지 않습니다.');
        }
    };

    return (
        <div className="login-page">
            <button onClick={() => navigate('/')} className="home-button">🏠</button>

            <div className="login-box-wrapper">
                <div className="login-box">
                    <h2 style={{ marginBottom: '2rem' }}>로그인</h2>

                    <input
                        type="text"
                        placeholder="아이디"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="login-input"
                    />

                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                    />

                    <button onClick={handleLogin} className="login-button">로그인</button>

                    {errorMessage && (
                        <p className="login-error-message">{errorMessage}</p>
                    )}

                    <p className="login-bottom-text">
                        계정이 없으신가요?{' '}
                        <button onClick={() => navigate('/signup')} className="link-button">
                            회원가입하기
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;

