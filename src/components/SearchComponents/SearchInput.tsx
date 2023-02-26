import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {layout} from '../../constants/Layout';
//@ts-expect-error
import SearchIcon from '../../../assets/icons/commons/search.svg';

interface inputProps {
  placeholder: string;
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
  handleSubmit: any;
  autoFocus?: boolean;
}

const SearchInput = ({
  placeholder,
  onChangeText,
  onBlur,
  value,
  handleSubmit,
  autoFocus = true,
}: inputProps) => {
  return (
    <View style={styles.root}>
      <TextInput
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        style={styles.input}
        autoFocus={autoFocus}
      />
      <View style={{marginHorizontal: 5}} />
      <TouchableOpacity onPress={handleSubmit}>
        <SearchIcon />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 51,
    width: layout.widthp,
    backgroundColor: '#F2F3F2',
    borderRadius: 15,
    marginVertical: 10,
    flexDirection: 'row',
  },
  input: {
    width: layout.width * 0.8 - 20,
    fontFamily: 'Poppins-SemiBold',
    // backgroundColor: 'pink',
  },
});
