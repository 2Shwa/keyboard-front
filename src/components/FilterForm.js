import React, { useState } from 'react';
import './css/FilterForm.css';

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

      if (value === '전체') {
        return { ...prev, [category]: ['전체'] };
      }

      const updated = isChecked
        ? current.filter(v => v !== value)
        : [...current.filter(v => v !== '전체'), value];

      return { ...prev, [category]: updated };
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
    <section className="filter-frame">
      <div className="filter-title">
        <h2 className="filter-text">
          필터로 원하는 키보드 찾기
        </h2>
      </div>

      <div className="filter-container">
        {Object.entries(filterCategories).map(([categoryLabel, items]) => (
          <div key={categoryLabel} className="filter-box">
            <div className="filter-title">{categoryLabel}</div>
            <div className="filter-options">
              {items.map(item => (
                <label key={item} className="filter-label">
                  <input
                    type="checkbox"
                    checked={filters[categoryLabel].includes(item)}
                    onChange={() => handleCheckboxChange(categoryLabel, item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="submit-container">
        <button type="button" onClick={handleSubmit} className="submit-button">
          검색
        </button>
      </div>

      {results.length > 0 && (
        <div className="results-container">
          <h3 className="results-title">
            추천 제품 {results.length}
          </h3>

          <div className="results-list">
            {results.map(item => (
              <div
                key={item.id}
                className="result-item"
                onClick={() => window.open(`/keyboard/${item.id}`, '_blank')}
              >
                <img src={item.image} alt={item.name} className="result-image" />
                <div>
                  <h4 className="result-name">{item.name}</h4>
                  <p className="result-desc">{item.desc}</p>
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