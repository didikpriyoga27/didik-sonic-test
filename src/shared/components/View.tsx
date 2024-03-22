import React, {FC} from 'react';
import {View as RNView, ViewProps} from 'react-native';

const View: FC<ViewProps> = ({...props}) => {
  return <RNView className="bg-white dark:bg-slate-900" {...props} />;
};

export default View;
