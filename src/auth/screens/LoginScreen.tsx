import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, ScrollView} from 'react-native';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';

import BaseLayout from '../../shared/components/BaseLayout';
import Image from '../../shared/components/Image';
import PrimaryButton from '../../shared/components/PrimaryButton';
import Text from '../../shared/components/Text';
import TextInput from '../../shared/components/TextInput';
import View from '../../shared/components/View';
import {StackParamList} from '../../shared/navigation/types';

const LoginScreen = () => {
  const {reset} = useNavigation<NavigationProp<StackParamList>>();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <BaseLayout isWithPaddingBottom>
      <ScrollView className="flex-1">
        <View className="space-y-4 py-4">
          <Image
            source={require('../../shared/assets/images/logo.jpeg')}
            className="h-40 w-40 self-center"
            resizeMode="contain"
          />
          <Text className="p-4 text-center">
            Welcome to{'\n'}
            <Text className="font-poppins_700 text-lg">Sonic Mobile App</Text>
          </Text>
          <View className="space-y-4 rounded-md p-4">
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="username"
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
            />
          </View>
        </View>
      </ScrollView>
      <View className={'p-4'}>
        <PrimaryButton
          disabled={!username || !(password.length >= 8)}
          text="Login"
          onPress={() => {
            if (username === 'didik' && password === '12345678') {
              EncryptedStorage.setItem(
                'accessToken',
                Config.ACCESS_TOKEN || '',
              );
              reset({index: 0, routes: [{name: 'MainScreen'}]});
            } else {
              Alert.alert('Error', 'Invalid credentials');
            }
          }}
        />
      </View>
    </BaseLayout>
  );
};

export default LoginScreen;
