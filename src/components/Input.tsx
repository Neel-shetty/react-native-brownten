import React from 'react';
import {Text, TextInput, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {height: heightScreen} = Dimensions.get('screen');

interface InputProps {
  label: string;
  onChangeText: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T,
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  onBlur: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  value: string;
  secure?: boolean;
  numeric?: boolean;
}

const Input = ({
  label,
  onBlur,
  onChangeText,
  value,
  secure = false,
  numeric = false,
}: InputProps) => {
  return (
    <>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        onBlur={onBlur}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secure}
        keyboardType={numeric ? 'numeric' : 'ascii-capable'}
      />
    </>
  );
};

const styles = EStyleSheet.create({
  inputLabel: {
    fontSize: '1rem',
    lineHeight: '1rem',
    height: '1rem',
    fontFamily: '$gilroyMedium',
    color: '$darkGreyColour',
  },
  input: {
    fontFamily: '$gilroyMedium',
    fontSize: '1.125rem',
    lineHeight: '1.125rem',
    paddingVertical: heightScreen * 0.012,
    borderBottomWidth: 1.0,
    borderBottomColor: '$lightGreyColour',
    marginBottom: heightScreen * 0.022,
    color: 'black',
  },
});

export default Input;
