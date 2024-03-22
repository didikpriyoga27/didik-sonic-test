import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const ChevronRightIcon = (props: SvgProps) => (
  <Svg width={6} height={10} fill="none" {...props}>
    <Path
      stroke={props.color || '#5F6C78'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m1 1 4 4-4 4"
    />
  </Svg>
);
export default ChevronRightIcon;
