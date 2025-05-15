import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/css/Signup.css';

function Signup() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [form, setForm] = useState({
        userID: '',
        username: '',
        password: '',
        email: '',
        // confirmPassword: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const checkDuplicateUserID = async () => {
        try {
            const response = await fetch(`http://172.20.132.186:8081/users/check-id?userID=${form.userID}`);
            const data = await response.json();
            if (data.exists) {
                setErrorMessage('❌ 이미 사용 중인 아이디입니다.');
            } else {
                setErrorMessage('✅ 사용 가능한 아이디입니다.');
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleSubmit = async () => {
        if (!form.userID || !form.password) {
            setErrorMessage('❌ 아이디와 비밀번호를 입력해주세요.');
            return;
        }

        try {
            const response = await fetch('http://172.20.132.186:8081/users/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID: form.userID,
                    username: form.username,
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
        <div className="signup-page">
            <button onClick={() => navigate('/')} className="home-button">🏠</button>

            <div className="signup-wrapper">
                <div className="signup-box">
                    {!isSubmitted ? (
                        <>
                            <h2 className="signup-title">회원가입</h2>

                            {/* 아이디 필드 + 중복 확인 */}
                            <div className="signup-field">
                                <label className="signup-label">아이디</label>
                                <input
                                    type="text"
                                    name="userID"
                                    onChange={handleChange}
                                    className="signup-input"
                                />
                                <button
                                    onClick={checkDuplicateUserID}
                                    className="check-button"
                                >
                                    중복 확인
                                </button>
                            </div>

                            {/* 나머지 필드들 */}
                            {[
                                { label: '이름', name: 'username', type: 'text' },
                                { label: '비밀번호', name: 'password', type: 'password' },
                                // { label: '비밀번호 확인', name: 'confirmPassword', type: 'password' },
                                { label: '이메일', name: 'email', type: 'email' },
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
