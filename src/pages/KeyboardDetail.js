// src/KeyboardDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const keyboardData = {
    1: {
        name: 'Keychron K8',
        image: '/keyboard1.jpg',
        desc: 'Keychron K8은 텐키리스 무선 기계식 키보드로, Mac/Windows 모두 호환됩니다.',
        link: 'https://keychron.kr/products/keychron-k8'
    },
    2: {
        name: 'Logitech MX Keys',
        image: '/keyboard2.jpg',
        desc: '무접점 멤브레인 느낌의 고급 키보드로 정숙한 타건감이 특징입니다.',
        link: 'https://www.logitech.com/ko-kr/products/keyboards/mx-keys.920-009415.html'
    },
    3: {
        name: 'Leopold FC750R',
        image: '/keyboard3.jpg',
        desc: '정전용량 무접점 방식의 조용하고 안정적인 키감 제공.',
        link: 'https://leopold.co.kr/?product=fc750rbt'
    }
};

function KeyboardDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const keyboard = keyboardData[id];

    if (!keyboard) return <p>존재하지 않는 키보드입니다.</p>;

    return (
        <div style={{
            position: 'relative',
            minHeight: '100vh',
            backgroundColor: '#FFFDBF'
        }}>
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
            <div style={{ maxWidth: '700px', margin: '2rem auto', textAlign: 'center' }}>
                <h2>{keyboard.name}</h2>
                <img
                    src={keyboard.image}
                    alt={keyboard.name}
                    style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem' }}
                />
                <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '1rem' }}>{keyboard.desc}</p>
                <a
                    href={keyboard.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-block',
                        padding: '0.6rem 1.2rem',
                        backgroundColor: '#B8F5DC',
                        borderRadius: '8px',
                        color: '#333',
                        textDecoration: 'none',
                        fontWeight: '600'
                    }}
                >
                    공식 쇼핑몰 보기
                </a>
            </div>
        </div>
    );
}

export default KeyboardDetail;
