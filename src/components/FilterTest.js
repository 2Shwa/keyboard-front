// src/components/FilterTest.js
import React from 'react';

function FilterTest() {
    const handleFilterTest = async () => {
        try {
            const token = localStorage.getItem('token');

            const res = await fetch('http://172.20.132.186:8081/keyboards/filter/qdsl?page=0&size=5', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    layouts: ["풀배열"],
                    sounds: ["일반"]
                })
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`(${res.status}) ${errorText}`);
            }

            const data = await res.json();
            console.log('📦 필터 결과:', data);
        } catch (err) {
            console.error('❌ 필터 테스트 실패:', err);
        }
    }; 
    return (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button
                onClick={handleFilterTest}
                style={{
                    backgroundColor: '#d1fae5',
                    padding: '0.8rem 1.6rem',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}
            >
                🔍 필터 테스트 실행
            </button>
        </div>
    );
}

export default FilterTest;
