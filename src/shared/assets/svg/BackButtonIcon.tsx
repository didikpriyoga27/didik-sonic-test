import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const BackButtonIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke={props.color ?? '#fff'}
      strokeLinecap="round"
      strokeWidth={2}
      d="M2 12h20M2 12l6-6M2 12l6 6"
    />
  </Svg>
);
export default BackButtonIcon;
