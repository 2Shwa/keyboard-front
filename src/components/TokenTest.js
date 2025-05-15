// src/components/TokenTest.js
import React, { useState, useEffect } from 'react';
import authFetch from '../utils/authFetch';

function TokenTest() {
  const [result, setResult] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await authFetch('http://172.20.132.186:8081/keyboards/1');
        const status = res.status;

        // 여기서 단 한 번만 json 읽기
        const data = await res.json();

        if (!res.ok) {
          const errorText = JSON.stringify(data, null, 2);
          throw new Error(`(${status}) ${errorText}`);
        }

        // 정상일 경우
        setResult(JSON.stringify(data, null, 2));
      } catch (err) {
        setResult('실패: ' + err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ marginTop: '120px' }}>
      <pre style={{ marginTop: '1rem', background: '#f6f6f6', padding: '1rem' }}>
        {result}
      </pre>
    </div>
  );
}

export default TokenTest;
