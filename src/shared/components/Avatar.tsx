import React from 'react';

import Text from './Text';
import View from './View';

type Props = {
  initials: string;
};

const Avatar = ({initials}: Props) => {
  const generateBackgroundColor = () => {
    const colors = [
      '#D65F3D',
      '#D6B546',
      '#3DD66A',
      '#3D80D6',
      '#863DD6',
      '#D63D86',
      '#3DD6BE',
      '#D63DBE',
      '#D6993D',
    ];

    const index = initials.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <View
      className="h-12 w-12 items-center justify-center rounded-full"
      style={{
        backgroundColor: generateBackgroundColor(),
      }}>
      <Text className={'text-xl text-white'}>{initials}</Text>
    </View>
  );
};

export default Avatar;
