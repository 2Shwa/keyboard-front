import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const keyboardData = {
    1: {
        name: 'Keychron K8',
        image: '/keychron_k8.jpeg',
        desc: 'Keychron K8은 텐키리스 무선 기계식 키보드로, Mac/Windows 모두 호환됩니다.',
        price: '99,000',
        layout: '87키 텐키리스',
        switchBrand: 'Gateron',
        connectionType: '무선 / 유선',
        backlight: 'RGB 백라이트',
        weight: '800g',
        pros: ['맥/윈도우 완벽 호환', '무선 블루투스 기능', 'PBT 키캡 사용'],
        cons: ['배터리 지속 시간이 짧음'],
        link: 'https://keychron.kr/products/keychron-k8'
    },
    // 다른 키보드도 같은 구조로 추가 가능
};

function KeyboardDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const keyboard = keyboardData[id];

    if (!keyboard) return <p>존재하지 않는 키보드입니다.</p>;

    return (
        <div className="keyboard-detail-page"
            style={{
                position: 'relative',
                minHeight: '100vh',
                maxWidth: '900px',      // ✅ 너비 제한
                margin: '0 auto',       // ✅ 수평 가운데 정렬
                padding: '2rem'         // ✅ 좌우 여백
            }}
        >
            {/* 홈 버튼 */}
            <button className="home-button" onClick={() => navigate('/')}>
                🏠
            </button>

            <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem' }}>
                {/* 왼쪽: 이미지 */}
                <div style={{ flex: '1' }}>
                    <img
                        src={keyboard.image}
                        alt={keyboard.name}
                        style={{ width: '100%', maxWidth: '350px', borderRadius: '12px' }}
                    />
                </div>

                {/* 오른쪽: 정보 */}
                <div style={{ flex: '2' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{keyboard.name}</h2>
                    <p style={{ fontSize: '1.4rem', color: '#1e40af', fontWeight: '600' }}>{keyboard.price}원</p>
                    <p style={{ margin: '1rem 0', color: '#555' }}>{keyboard.desc}</p>

                    <ul style={{ lineHeight: '1.8', color: '#333' }}>
                        <li><strong>키 배열:</strong> {keyboard.layout}</li>
                        <li><strong>스위치 제조사:</strong> {keyboard.switchBrand}</li>
                        <li><strong>연결 방식:</strong> {keyboard.connectionType}</li>
                        <li><strong>백라이트:</strong> {keyboard.backlight}</li>
                        <li><strong>무게:</strong> {keyboard.weight}</li>
                    </ul>
                </div>
            </div>

            {/* 장점 & 단점 */}
            <div className="keyboard-bottom-section">
                <div className="keyboard-pros">
                    <h3>🟢 장점</h3>
                    <ul>
                        {keyboard.pros.map((pro, i) => (
                            <li key={i}>{pro}</li>
                        ))}
                    </ul>
                </div>

                <div className="keyboard-cons">
                    <h3>🔴 단점</h3>
                    <ul>
                        {keyboard.cons.map((con, i) => (
                            <li key={i}>{con}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* 공식 링크 */}
            <div className="keyboard-link">
                <a href={keyboard.link} target="_blank" rel="noopener noreferrer">
                    🔗 공식 쇼핑몰에서 확인하기
                </a>
            </div>
        </div>
    );
}

export default KeyboardDetail;
