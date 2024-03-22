import React from 'react';

import BaseLayout from '../../shared/components/BaseLayout';
import Header from '../../shared/components/Header';
import Text from '../../shared/components/Text';
import View from '../../shared/components/View';

const MainScreen = () => {
  return (
    <BaseLayout isWithPaddingBottom>
      <Header title="Main Screen" />
      <View className="flex-1 justify-between">
        <View className="space-y-4 py-40">
          <Text className="p-4 text-center">
            Welcome to{'\n'}
            <Text className="font-poppins_700 text-lg">Sonic Mobile App</Text>
          </Text>
        </View>
      </View>
    </BaseLayout>
  );
};

export default MainScreen;
