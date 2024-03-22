import React, {FC, ReactNode} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

import Text from './Text';

type Props = {
  leftComponent?: ReactNode;
  text: string;
} & TouchableOpacityProps;

const PrimaryButton: FC<Props> = ({
  leftComponent,
  text,
  className,
  ...props
}) => {
  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center space-x-2 rounded-full bg-primary py-4 ${className}`}
      {...props}>
      {leftComponent}
      <Text className="text-center font-poppins_500 text-xs text-white">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
