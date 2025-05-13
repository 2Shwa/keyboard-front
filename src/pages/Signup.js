import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/css/Signup.css';

function Signup() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (form.password !== form.confirmPassword) {
            setErrorMessage('❌ 비밀번호가 일치하지 않습니다.');
            return;
        }
        setErrorMessage('');
        setIsSubmitted(true);
    };

    return (
        <div className="signup-page">
            <button onClick={() => navigate('/')} className="home-button">🏠</button>

            <div className="signup-wrapper">
                <div className="signup-box">
                    {!isSubmitted ? (
                        <>
                            <h2 className="signup-title">회원가입</h2>

                            {[ 
                                { label: '아이디', name: 'username', type: 'text' },
                                { label: '비밀번호', name: 'password', type: 'password' },
                                { label: '비밀번호 확인', name: 'confirmPassword', type: 'password' },
                                { label: '이름', name: 'name', type: 'text' },
                                { label: '휴대전화', name: 'phone', type: 'text' }
                            ].map(({ label, name, type }) => (
                                <div key={name} className="signup-field">
                                    <label className="signup-label">{label}</label>
                                    <input
                                        type={type}
                                        name={name}
                                        onChange={handleChange}
                                        className="signup-input"
                                    />
                                </div>
                            ))}

                            {errorMessage && (
                                <p className="error-message">{errorMessage}</p>
                            )}

                            <button onClick={handleSubmit} className="signup-button">가입하기</button>

                            <p className="login-bottom-text">
                                계정이 있으신가요?
                                <button
                                    onClick={() => navigate('/login')}
                                    className="link-button"
                                >
                                    로그인하기
                                </button>
                            </p>
                        </>
                    ) : (
                        <div style={{ textAlign: 'center' }}>
                            <h2 style={{ marginBottom: '1.5rem' }}>✅ 회원가입이 완료되었습니다!</h2>
                            <button onClick={() => navigate('/login')} className="signup-button">
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