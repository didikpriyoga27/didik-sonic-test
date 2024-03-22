import React, {FC, ReactNode} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

import Text from './Text';

type Props = {
  leftComponent?: ReactNode;
  text: string;
} & TouchableOpacityProps;

const OutlinedButton: FC<Props> = ({
  leftComponent,
  text,
  className,
  ...props
}) => {
  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center space-x-2 rounded-full border border-border bg-transparent py-4 ${className}`}
      {...props}>
      {leftComponent}
      <Text className="font-poppins_500 text-xs">{text}</Text>
    </TouchableOpacity>
  );
};

export default OutlinedButton;
