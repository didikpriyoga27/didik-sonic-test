import React from 'react';
import {Switch as RNSwitch, SwitchProps} from 'react-native';

import colors from '../utils/colors';

const Switch = ({...props}: SwitchProps) => {
  return (
    <RNSwitch
      {...props}
      trackColor={{
        false: colors.grey,
        true: colors.green,
      }}
      thumbColor={props.value ? 'white' : colors.grey}
    />
  );
};

export default Switch;
