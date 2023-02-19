import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {layout} from '../../constants/Layout';
import EStyleSheet from 'react-native-extended-stylesheet';
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
}

const SearchInput = ({
  placeholder,
  onChangeText,
  onBlur,
  value,
  handleSubmit,
}: inputProps) => {
  return (
    <View style={styles.root}>
      <TextInput
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        style={styles.input}
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

const eStyles = EStyleSheet.create({
  searchBar: {
    width: '100%',
    paddingVertical: 16.0,
    paddingHorizontal: 15.0,
    borderRadius: 15.0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F2F3F2',
  },
  searchBarText: {
    marginLeft: 7.0,
    fontFamily: '$gilroyNormal600',
    fontSize: '0.875rem',
    color: '$darkGreyColour',
  },
});
