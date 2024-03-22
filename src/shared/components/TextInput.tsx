import React, {FC, ReactNode} from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';

export type CustomTextInputProps = {
  leftComponent?: ReactNode;
  leftComponentOnPress?: () => void;
};

type Props = CustomTextInputProps & TextInputProps;

const TextInput: FC<Props> = props => {
  const {leftComponent, leftComponentOnPress, ...restProps} = props;

  return (
    <>
      <RNTextInput
        className={`${
          restProps.multiline ? 'h-20' : 'h-12'
        } rounded border border-border px-4 font-poppins_400 text-xs text-black dark:text-white`}
        style={[Boolean(leftComponent) && {paddingLeft: 40}]}
        placeholderTextColor={'#ACAEB8'}
        textAlignVertical={'top'}
        {...restProps}
      />
      {Boolean(leftComponent) && (
        <TouchableOpacity
          testID="ButtonLeftComponent"
          style={styles.leftComponent}
          onPress={leftComponentOnPress}>
          {leftComponent}
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  leftComponent: {
    position: 'absolute',
    alignSelf: 'center',
    left: 0,
    padding: 16,
  },
});

export default TextInput;
