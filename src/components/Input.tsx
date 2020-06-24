import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

interface Props {
  onChange?: (input: string) => void;
  ref?: React.MutableRefObject<string>;
  onFocus?: () => void;
}
const Input = (props: Props) => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        onChangeText={props.onChange}
        onFocus={props.onFocus}
        style={styles.input}
        placeholder="BASIC INPUT"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {},
  input: {},
});
export default Input;
