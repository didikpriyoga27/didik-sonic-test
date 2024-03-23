import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';

import BaseLayout from '../../shared/components/BaseLayout';
import Image from '../../shared/components/Image';
import PrimaryButton from '../../shared/components/PrimaryButton';
import Text from '../../shared/components/Text';
import View from '../../shared/components/View';
import {StackParamList} from '../../shared/navigation/types';

const LoginScreen = () => {
  const {navigate} = useNavigation<NavigationProp<StackParamList>>();
  return (
    <BaseLayout isWithPaddingBottom>
      <View className="flex-1 justify-between">
        <View className="space-y-4 py-40">
          <Image
            source={require('../../shared/assets/images/logo.jpeg')}
            className="h-40 w-40"
            resizeMode="contain"
          />
          <Text className="p-4 text-center">
            Welcome to{'\n'}
            <Text className="font-poppins_700 text-lg">Sonic Mobile App</Text>
          </Text>
        </View>
        <View className={'p-4'}>
          <PrimaryButton text="Login" onPress={() => navigate('MainScreen')} />
        </View>
      </View>
    </BaseLayout>
  );
};

export default LoginScreen;
