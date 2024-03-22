import React, {FC, ReactNode} from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import Text from './Text';

type Props = {
  leftComponent?: ReactNode;
  text: string;
  isLoading?: boolean;
} & TouchableOpacityProps;

const PrimaryButton: FC<Props> = ({
  leftComponent,
  text,
  className,
  isLoading = true,
  ...props
}) => {
  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center space-x-2 rounded-full bg-primary py-4 ${className} ${
        (props.disabled || isLoading) && 'opacity-50'
      }`}
      disabled={props.disabled || isLoading}
      {...props}>
      {leftComponent}
      {isLoading ? (
        <ActivityIndicator color={'white'} />
      ) : (
        <Text className="text-center font-poppins_500 text-xs text-white">
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
