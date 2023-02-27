import React, {useState} from 'react';
import {
  Text,
  TextInput,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
//@ts-ignore
import Pen from '../../../assets/icons/commons/Pen30.svg';
//@ts-ignore
import Close from '../../../assets/icons/commons/CloseCircle.svg';
import {layout} from '../../constants/Layout';
import {colors} from '../../constants/colors';

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
  editable?: boolean;
  onPressEdit: (editMode: boolean) => void;
}

const Input = ({
  label,
  onBlur,
  onChangeText,
  value,
  secure = false,
  numeric = false,
  onPressEdit,
}: InputProps) => {
  const [editable, setEditable] = useState<boolean>(false);
  console.log('🚀 ~ file: Input.tsx:45 ~ editable:', editable);
  return (
    <>
      <Text
        style={[styles.inputLabel, editable ? {color: colors.green} : null]}>
        {label}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            true ? styles.black : null,
            editable ? {borderBottomColor: colors.green} : null,
          ]}
          onBlur={onBlur}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={secure}
          keyboardType={numeric ? 'numeric' : 'ascii-capable'}
          editable={editable}
        />
        <View style={styles.penContainer}>
          <TouchableOpacity
            onPress={() => {
              setEditable(!editable);
              onPressEdit(editable);
            }}>
            {!editable ? <Pen /> : <Close />}
          </TouchableOpacity>
        </View>
      </View>
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
    width: layout.width * 0.8,
    marginRight: 5,
  },
  black: {
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
  },
  penContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});

export default Input;
