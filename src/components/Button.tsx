import React, { useState } from 'react';
import { Text, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../assets/styles';

interface Props {
  buttonType?: 'answer' | 'back' | 'start';
  children?: JSX.Element;
  disabled?: boolean;
  onPress?: () => void;
  style?: any;
  text?: string;
  textStyle?: any;
  icon?: string;
  iconColor?: string;
}

const Button = (props: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <TouchableHighlight
      disabled={props.disabled}
      onPress={props.onPress}
      underlayColor={
        props.icon ||
        props.buttonType === 'back' ||
        props.buttonType === 'start'
          ? 'transparent'
          : colors.bittersweet
      }
      onShowUnderlay={() => setIsFocused(true)}
      onHideUnderlay={() => setIsFocused(false)}
      style={[
        styles.button,
        props.buttonType === 'answer'
          ? styles.answerButton
          : props.buttonType === 'start'
          ? styles.startButton
          : props.buttonType === 'back' && styles.backButton,
        isFocused && { opacity: 1 },
        props.disabled && styles.disabled,
        props.icon && { height: 100 },
        props.style,
      ]}
    >
      <>
        {props.icon && (
          <Icon
            name={props.icon}
            color={props.iconColor ? props.iconColor : colors.midnightGreen}
            size={36}
            style={{ padding: 0, textAlign: 'center', opacity: 1 }}
          />
        )}
        {props.buttonType === 'back' && (
          <Icon
            name="arrow-left"
            color={colors.mintCream}
            size={40}
            style={{ margin: 0, textAlign: 'center', opacity: 1 }}
          />
        )}
        {props.buttonType === 'start' && (
          <Icon
            name="play"
            color={colors.bittersweet}
            size={60}
            style={{ margin: 0, textAlign: 'center', opacity: 1 }}
          />
        )}
        {props.text && (
          <Text
            style={[
              props.buttonType === 'answer'
                ? styles.answerButtonText
                : styles.buttonText,
              props.textStyle,
            ]}
          >
            {props.text}
          </Text>
        )}
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
  answerButton: {
    backgroundColor: colors.yellow,
    borderColor: colors.mediumTurquise,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    height: 75,
    margin: 10,
    padding: 10,
    width: 75,
  },
  answerButtonText: {
    textAlign: 'center',
    color: colors.midnightGreen,
    fontSize: 20,
    maxHeight: 100,
    minWidth: 50,
    maxWidth: 100,
    margin: 0,
  },
  backButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    position: 'absolute',
    top: -20,
    left: -40,
    resizeMode: 'cover',
    paddingVertical: 0,
    paddingHorizontal: 20,
    opacity: 1,
    shadowColor: 'transparent',
  },
  backButtonText: {
    color: colors.mintCream,
    fontSize: 20,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 20,
    backgroundColor: colors.mintCream,
    // borderColor: colors.mintCream,
    // borderWidth: 1,
    padding: 50,
    opacity: 0.8,
  },
  buttonText: {
    color: colors.mintCream,
    fontSize: 16,
    textAlign: 'center',
    opacity: 1,
  },
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  disabled: {
    backgroundColor: 'darkgrey',
    borderColor: 'grey',
    opacity: 0.5,
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 90,
    opacity: 0.8,
  },
  startButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: colors.bittersweet,
    borderRadius: 100,
    borderWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    height: 100,
    justifyContent: 'center',
    width: 100,
    opacity: 1,
  },
  startButtonText: {
    color: colors.bittersweet,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default Button;
