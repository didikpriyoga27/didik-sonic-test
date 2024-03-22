import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
const FilterIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke={props.color ?? '#5F6C78'}
      strokeWidth={1.2}
      d="M11 20a.965.965 0 0 1-.712-.288A.965.965 0 0 1 10 19v-6L4.2 5.6c-.25-.333-.287-.683-.112-1.05S4.567 4 5 4h14c.433 0 .738.183.913.55.175.367.137.717-.113 1.05L14 13v6c0 .283-.096.52-.287.712A.968.968 0 0 1 13 20h-2Z"
    />
  </Svg>
);
export default FilterIcon;
