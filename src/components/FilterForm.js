import React, { useState } from 'react';
import styles from './css/FilterForm.module.css';

const priceRangeMap = {
  '5만원 이하': { min: 0, max: 50000 },
  '5~10만원': { min: 50000, max: 100000 },
  '10~15만원': { min: 100000, max: 150000 },
  '15만원 이상': { min: 150000, max: null },
};

// 사용자 → 백엔드 값 변환 테이블
const valueMap = {
  // 스위치
  '부드러운 (리니어)': '리니어',
  '손 끝에 딸깍 (택타일)': '택타일',
  '소리 + 딸깍 (클릭키)': '클릭키',

  // 키압
  '가벼움 (35~45g)': '가벼움',
  '보통 (50~60g)': '보통',
  '묵직함 (65g 이상)': '묵직함',

  // 무게
  '가벼움 (700g 이하)': '가벼움',
  '보통 (700g ~ 1.2kg)': '보통',
  '무거움 (1.2kg 이상)': '무거움',

  // 백라이트
  '없음': '없음',
  '단색': '단색',
  '레인보우': '레인보우',
  'RGB': 'RGB',

  // 배열
  '풀배열': '풀배열',
  '작은배열': '작은배열',

  // 소음
  '저소음': '저소음',
  '일반': '일반',

  // 연결방식
  '유선': '유선',
  '무선': '무선',
  '유선 + 무선': '유선+무선',

  // 용도
  '게임용': '게임용',
  '사무용': '사무용',

  // 제조사
  '로지텍': '로지텍',
  '커세어': '커세어',
  '앱코': '앱코',
  '키크론': '키크론',

  // 재질
  '플라스틱': '플라스틱',
  '알루미늄': '알루미늄',
  '아크릴': '아크릴',
};

// 값 간소화 함수
const simplifyValue = (value) => {
  return valueMap[value] || value.replace(/\s*\(.*?\)/g, '');
};

// 필드명 한글 → 백엔드 키 변환
const filterKeyMap = {
  제조사: 'manufacturers',
  연결방식: 'connections',
  무게: 'weightLabels',
  재질: 'materials',
  백라이트: 'backlights',
  '키 배열': 'layouts',
  키압: 'keyPressureLabels',
  소음: 'sounds',
  스위치: 'switchTypes',
  용도: 'purposes',
  가격: 'priceRanges',
};

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
        return {
          ...prev,
          [category]: ['전체']
        };
      }

      const updated = isChecked
        ? current.filter(v => v !== value)
        : [...current.filter(v => v !== '전체'), value];

      return {
        ...prev,
        [category]: updated
      };
    });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');

    // filters → 백엔드용 구조 변환
    const backendFilters = {};
    for (const [koreanKey, values] of Object.entries(filters)) {
      if (values.includes('전체')) continue;

      const backendKey = filterKeyMap[koreanKey];
      if (!backendKey) continue;

      if (koreanKey === '가격') {
        // 가격: 문자열 → PriceRangeDTO 객체로 변환
        backendFilters[backendKey] = values
          .filter(v => priceRangeMap[v])
          .map(v => priceRangeMap[v]);
      } else {
        backendFilters[backendKey] = values.map(simplifyValue);
      }
    }

    console.log('📦 전송할 필터:', backendFilters);

    try {
      const response = await fetch('http://172.20.132.186:8081/keyboards/filter/qdsl?page=0&size=5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(backendFilters)
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      setResults(data.content || []);
    } catch (err) {
      console.error('❌ 필터 요청 실패:', err.message);
      setResults([]);
    }
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
      <h2 className={styles.title}>🧩 필터 설정을 통해 원하는 키보드 찾기</h2>

      {Object.entries(filterCategories).map(([categoryLabel, items]) => (
        <div key={categoryLabel} className={styles.box}>
          <div className={styles.category}>{categoryLabel}</div>
          <div className={styles.options}>
            {items.map(item => (
              <label
                key={item}
                className={`${styles.filterOption} ${filters[categoryLabel].includes(item) ? styles.filterOptionChecked : ''
                  }`}
              >
                <input
                  type="checkbox"
                  checked={filters[categoryLabel].includes(item)}
                  onChange={() => handleCheckboxChange(categoryLabel, item)}
                  className={styles.hiddenCheckbox}
                />
                {item}
              </label>

            ))}
          </div>
        </div>
      ))}

      <div style={{ textAlign: 'center' }}>
        <button
          type="button"
          onClick={handleSubmit}
          className={styles.searchBtn}
        >
          검색
        </button>
      </div>

      <div className={styles.summaryBox}>
        {Object.entries(filters).map(([category, values]) => {
          if (values.includes('전체')) return null;

          return (
            <div key={category} className={styles.summaryItem}>
              <strong>{category}</strong>: {values.join(', ')}
            </div>
          );
        })}
      </div>

      {results.length > 0 ? (
        <div className={styles.resultContainer}>
          <h3 className={styles.resultTitle}>추천 제품 ({results.length}개)</h3>

          <div>
            {results.map(item => (
              <div
                key={item.id}
                onClick={() => window.open(`/keyboard/${item.id}`, '_blank')}
                className={styles.resultCard}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.resultImage}
                />
                <div>
                  <h4>{item.name}</h4>
                  <p className={styles.resultText}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#777', fontSize: '1rem' }}>
          😢 조건에 맞는 키보드가 없어요.
        </div>
      )}
    </section>
  );
}

export default FilterForm;
