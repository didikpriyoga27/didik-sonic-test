import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

import ChevronRightIcon from '../assets/svg/ChevronRightIcon';
import View from './View';

type Props = {isWithChevronRight?: boolean} & TouchableOpacityProps;

const Card = ({children, isWithChevronRight = true, ...props}: Props) => {
  return (
    <TouchableOpacity {...props}>
      <View className="flex-row items-center justify-between space-x-4 rounded border border-border p-4">
        <View className="flex-1">{children}</View>
        {isWithChevronRight && <ChevronRightIcon />}
      </View>
    </TouchableOpacity>
  );
};

export default Card;
