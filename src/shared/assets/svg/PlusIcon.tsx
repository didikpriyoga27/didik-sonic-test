import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
const PlusIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path fill="currentColor" d="M9 0v9H0v5h9v10h4.5V14H23V9h-9.5V0H9Z" />
  </Svg>
);
export default PlusIcon;
