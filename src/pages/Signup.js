import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/css/Auth.css';

function Signup() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [form, setForm] = useState({
        username: '',
        userId: '',
        password: '',
        email: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://172.20.132.186:8081/users/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: form.username,
                    userId: form.userId,
                    password: form.password,
                    email: form.email,
                }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || '회원가입 실패');
            }

            alert('✅ 회원가입이 완료되었습니다!');
            navigate('/login');
        } catch (error) {
            setErrorMessage(`❌ ${error.message}`);
        }
    };

    return (
        <div className="auth-page">
            <button onClick={() => navigate('/')} className="home-button">🏠</button>

            <div className="auth-wrapper">
                <div className="auth-box">
                    {!isSubmitted ? (
                        <>
                            <h2 className="auth-title">회원가입</h2>
                            {[
                                { label: '이름', name: 'username', type: 'text' },
                                { label: '아이디', name: 'userId', type: 'text' },
                                { label: '비밀번호', name: 'password', type: 'password' },
                                { label: '이메일', name: 'email', type: 'email' },
                            ].map(({ label, name, type }) => (
                                <div key={name} className="auth-field">
                                    <label className="auth-label">{label}</label>
                                    <input
                                        type={type}
                                        name={name}
                                        onChange={handleChange}
                                        className="auth-input"
                                        placeholder={name === 'username' ? '키덕 페이지에서 사용할 이름을 적어주세요.' : ''}
                                    />
                                </div>
                            ))}

                            {errorMessage && (
                                <p className="auth-error-message">{errorMessage}</p>
                            )}

                            <button onClick={handleSubmit} className="auth-button">가입하기</button>

                            <p className="login-bottom-text">
                                계정이 있으신가요?
                                <button onClick={() => navigate('/login')} className="link-button">
                                    로그인
                                </button>
                            </p>
                        </>
                    ) : (
                        <div style={{ textAlign: 'center' }}>
                            <h2 style={{ marginBottom: '1.5rem' }}>✅ 회원가입이 완료되었습니다!</h2>
                            <button onClick={() => navigate('/login')} className="auth-button">
                                로그인 페이지로 이동
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Signup;
