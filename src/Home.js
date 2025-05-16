import React from 'react';
import Header from './components/Header';
import KeyboardSlider from './components/KeyboardSlider';
// import KeyboardInfo from './KeyboardInfo';
import FilterForm from './components/FilterForm';

function Home() {
  return (
    <div>
      <Header />
      <div style={{ paddingTop: '90px' }}> {/* 헤더 높이만큼 패딩을 추가 */}
        <KeyboardSlider />
        { /* <KeyboardInfo /> */}
        <FilterForm />
      </div>
    </div>
  );
}

export default Home;
