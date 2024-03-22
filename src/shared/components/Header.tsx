import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useColorScheme} from 'nativewind';
import React, {FC} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import BackButtonSvg from '../assets/svg/BackButtonIcon';
import {StackParamList} from '../navigation/types';
import Text from './Text';

type Props = {
  title?: string;
  isWithBackButton?: boolean;
};
const Header: FC<Props> = ({title, isWithBackButton = false}) => {
  const {goBack} = useNavigation<NavigationProp<StackParamList>>();
  const {top} = useSafeAreaInsets();
  const {colorScheme} = useColorScheme();

  const isDark = colorScheme === 'dark';

  if (!isWithBackButton && !title) {
    return null;
  }

  return (
    <View
      className={'z-10 w-full justify-end'}
      style={{
        marginTop: -top,
        height: title ? top + 48 : top + 80,
      }}>
      <View className={`flex-row items-center px-6 ${title ? 'h-12' : 'h-20'}`}>
        {title && (
          <Text className="absolute left-0 right-0 flex-1 text-center font-poppins_700 text-base">
            {title}
          </Text>
        )}
        {isWithBackButton && (
          <TouchableOpacity onPress={goBack} className="-ml-2 p-2">
            <BackButtonSvg color={isDark ? 'white' : 'black'} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;
