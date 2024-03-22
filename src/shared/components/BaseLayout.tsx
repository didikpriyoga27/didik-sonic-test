import React, {PropsWithChildren} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Header from './Header';
import View from './View';

type Props = {
  title?: string;
  isWithBackButton?: boolean;
  isWithPaddingBottom?: boolean;
} & PropsWithChildren;

const BaseLayout = ({
  title = '',
  isWithBackButton = false,
  isWithPaddingBottom = false,
  children,
}: Props) => {
  const {top, bottom} = useSafeAreaInsets();

  return (
    <View
      className={'flex-1'}
      style={{
        paddingTop: top,
        paddingBottom: isWithPaddingBottom ? bottom : 0,
      }}>
      <KeyboardAvoidingView
        className={'flex-1'}
        behavior={Platform.select({ios: 'padding', android: 'height'})}
        keyboardVerticalOffset={0}>
        <Header {...{title, isWithBackButton}} />
        <View className={'flex-1'}>{children}</View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default BaseLayout;
