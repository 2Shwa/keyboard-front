import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
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
    };

    return (
        <div style={{
            position: 'relative',
            minHeight: '100vh',
            backgroundColor: '#FFFDBF'
        }}>
            {/* 홈 버튼 */}
            <button
                onClick={() => navigate('/')}
                style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '2rem',
                    backgroundColor: '#B8F5DC',
                    color: '#333',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '0.6rem 1.4rem',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
            >
                🏠
            </button>

            {/* 로그인 박스 */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '700px',
                    backgroundColor: '#fff',
                    padding: '4rem',
                    borderRadius: '16px',
                    boxShadow: '0 0 16px rgba(0,0,0,0.05)',
                    textAlign: 'center'
                }}>
                    <h2 style={{ marginBottom: '2rem' }}>로그인</h2>
                    <input type="text" placeholder="아이디" style={inputStyle} />
                    <input type="password" placeholder="비밀번호" style={inputStyle} />
                    <button onClick={() => navigate('/')} style={buttonStyle}>로그인</button>

                    <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                        계정이 없으신가요?{' '}
                        <button
                            onClick={() => navigate('/signup')}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#007BFF',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                padding: 0,
                                margin: 0
                            }}
                        >
                            회원가입하기
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
const inputStyle = {
    display: 'block',
    width: '100%',
    marginBottom: '1rem',
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    boxSizing: 'border-box'
};

const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#B8F5DC',
    color: '#333',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '1.1rem',
    cursor: 'pointer'
};

export default Login;
