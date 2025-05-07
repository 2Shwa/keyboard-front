import React from 'react';

function KeyboardInfo() {
  return (
    <section style={{ padding: '2rem' }}>
      <h3>기계식 키보드란?</h3>
      <p>
        키 하나하나에 '축' 이라고 불리는 개별 스위치가 들어가는 것이 특징으로,
        스위치의 직접적인 접촉을 통해 신호가 전달되는 방식
      </p>
      <button onClick={() => alert('자세히 보기 클릭됨!')}>자세히 보기</button>
    </section>
  );
}

export default KeyboardInfo;
