import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

import BaseLayout from '../../shared/components/BaseLayout';
import View from '../../shared/components/View';
import {StackParamList} from '../../shared/navigation/types';

const InitScreen = () => {
  const {reset} = useNavigation<NavigationProp<StackParamList>>();

  const handleNavigation = useCallback(async () => {
    const accessToken = await EncryptedStorage.getItem('accessToken');

    const screen: keyof StackParamList = !accessToken
      ? 'LoginScreen'
      : 'MainScreen';
    return reset({
      index: 0,
      routes: [{name: screen}],
    });
  }, [reset]);

  useEffect(() => {
    handleNavigation();
  }, [handleNavigation]);

  return (
    <BaseLayout>
      <View />
    </BaseLayout>
  );
};

export default InitScreen;
