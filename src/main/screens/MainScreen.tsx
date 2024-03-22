import React from 'react';

import BaseLayout from '../../shared/components/BaseLayout';
import Header from '../../shared/components/Header';
import MainSection from '../components/MainSection';

const MainScreen = () => {
  return (
    <BaseLayout isWithPaddingBottom>
      <Header title="Projects" />
      <MainSection />
    </BaseLayout>
  );
};

export default MainScreen;
