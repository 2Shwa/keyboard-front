import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/css/Auth.css';

function Login() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // 백엔드 연동용
    const handleLogin = async () => {
        try {
            const response = await fetch('http://172.20.132.186:8081/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, password }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
            }

            const data = await response.json();
            const token = data.token;

            localStorage.setItem('token', token);
            navigate('/');
        } catch (error) {
            setErrorMessage(`❌ ${error.message}`);
        }
    };

    return (
        <div className="auth-page">
            <button onClick={() => navigate('/')} className="home-button">🏠</button>

            <div className="auth-wrapper">
                <div className="auth-box">
                    <h2 className="auth-title">로그인</h2>

                    <div className="auth-field">
                        <input
                            type="text"
                            placeholder="아이디"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="auth-input"
                        />
                    </div>

                    <div className="auth-field">
                        <input
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="auth-input"
                        />
                    </div>

                    <button onClick={handleLogin} className="auth-button">로그인</button>

                    {errorMessage && (
                        <p className="auth-error-message">{errorMessage}</p>
                    )}

                    <p className="login-bottom-text">
                        계정이 없으신가요?
                        <button onClick={() => navigate('/signup')} className="link-button">
                            회원가입
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;

