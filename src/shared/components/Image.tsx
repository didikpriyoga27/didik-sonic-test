import React, {FC} from 'react';
import FastImage, {FastImageProps} from 'react-native-fast-image';

const Image: FC<FastImageProps> = ({...props}) => {
  return <FastImage {...props} />;
};

export default Image;
