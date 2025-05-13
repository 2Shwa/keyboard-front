import React, { useState } from 'react';

function FilterForm() {
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({
    제조사: ['전체'],
    연결방식: ['전체'],
    무게: ['전체'],
    재질: ['전체'],
    백라이트: ['전체'],
    '키 배열': ['전체'],
    키압: ['전체'],
    소음: ['전체'],
    스위치: ['전체'],
    용도: ['전체'],
    가격: ['전체'],
  });

  const handleCheckboxChange = (category, value) => {
    setFilters(prev => {
      const current = prev[category];
      const isChecked = current.includes(value);

      // 1️⃣ '전체'를 선택한 경우 → 다른 항목들 제거하고 '전체'만 남김
      if (value === '전체') {
        return {
          ...prev,
          [category]: ['전체']
        };
      }

      // 2️⃣ 다른 항목을 선택한 경우 → '전체' 제거하고 항목 추가 or 제거
      const updated = isChecked
        ? current.filter(v => v !== value) // 체크 해제
        : [...current.filter(v => v !== '전체'), value]; // '전체' 제거 후 추가

      return {
        ...prev,
        [category]: updated
      };
    });
  };

  const handleSubmit = () => {
    const dummyResults = [
      { id: 1, name: 'Keychron K8', desc: '텐키리스 무선 기계식 키보드', image: '/keychron_k8.jpeg' },
      { id: 2, name: 'Logitech MX Keys', desc: '무접점 멤브레인 느낌의 타건감', image: '/logitech_mx_keys.png' },
      { id: 3, name: 'Leopold FC750R', desc: '정전용량 무접점, 조용한 타건감', image: '/leopold_fc750r.png' },
    ];
    setResults(dummyResults);
  };

  const boxStyle = {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
  };

  const titleStyle = {
    width: '120px',
    fontWeight: 'bold',
  };

  const optionsStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    marginLeft: '1rem',
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
  };

  const filterCategories = {
    제조사: ['전체', '로지텍', '커세어', '앱코', '키크론'],
    연결방식: ['전체', '유선', '무선(블루투스)', '무선(2.4GHz)'],
    무게: ['전체', '가벼움 (700g 이하)', '보통 (700g ~ 1.2kg)', '무거움 (1.2kg 이상)'],
    재질: ['전체', '플라스틱', '알루미늄', '아크릴'],
    백라이트: ['전체', '레인보우', '단색', 'RGB', '없음'],
    '키 배열': ['전체', '풀배열', '작은배열'],
    키압: ['전체', '가벼움 (35~45g)', '보통 (50~60g)', '묵직함 (65g 이상)'],
    소음: ['전체', '저소음', '일반'],
    스위치: ['전체', '부드러운 (리니어)', '손 끝에 딸깍 (택타일)', '소리 + 딸깍 (클릭키)'],
    용도: ['전체', '게임용', '사무용'],
    가격: ['전체', '5만원 이하', '5~10만원', '10~15만원', '15만원 이상'],
  };

  return (
    <section>
      <h2 style={{
        backgroundColor: '#FFFDBF',
        padding: '0.5rem 1rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        marginBottom: '1rem'
      }}>
        🧩 필터 설정을 통해 원하는 키보드 찾기
      </h2>

      {Object.entries(filterCategories).map(([categoryLabel, items]) => (
        <div key={categoryLabel} style={boxStyle}>
          <div style={titleStyle}>{categoryLabel}</div>
          <div style={optionsStyle}>
            {items.map(item => (
              <label key={item} style={labelStyle}>
                <input
                  type="checkbox"
                  checked={filters[Object.keys(filterCategories).find(key => filterCategories[key] === items)].includes(item)}
                  onChange={() => handleCheckboxChange(Object.keys(filterCategories).find(key => filterCategories[key] === items), item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
      ))}

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button
          type="button"
          onClick={handleSubmit}
          style={{
            padding: '0.8rem 2rem',
            backgroundColor: '#B8F5DC',
            color: '#333',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '1.1rem',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          검색
        </button>
      </div>

      {results.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem'
          }}>
            추천 제품 {results.length}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {results.map(item => (
              <div key={item.id}
                onClick={() => window.open(`/keyboard/${item.id}`, '_blank')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  boxShadow: '0 0 10px rgba(0,0,0,0.05)',
                  cursor: 'pointer'
                }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '30%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginRight: '1rem'
                  }}
                />
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>{item.name}</h4>
                  <p style={{ fontSize: '0.95rem', color: '#555' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default FilterForm;
