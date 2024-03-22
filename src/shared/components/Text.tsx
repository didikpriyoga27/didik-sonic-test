import React, {FC} from 'react';
import {Text as RNText, TextProps} from 'react-native';

const Text: FC<TextProps> = ({className, ...props}) => {
  return (
    <RNText
      className={`font-poppins_500 text-sm text-black dark:text-white ${className}`}
      {...props}
    />
  );
};

export default Text;
