import {StyleSheet, View} from 'react-native';
import React from 'react';
import OptionButton from './OptionButton';

const Toggle = ({info, items}: {items: boolean; info: boolean}) => {
  console.log('🚀 ~ file: Toggle.tsx:6 ~ Toggle ~ items:', items);
  console.log('🚀 ~ file: Toggle.tsx:6 ~ Toggle ~ info:', info);
  return (
    <View style={styles.root}>
      <OptionButton selected={info} title="Info" />
      <View style={styles.line} />
      <OptionButton selected={items} title="Items" />
    </View>
  );
};

export default Toggle;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  line: {
    borderWidth: 1,
    height: 35,
    borderColor: '#E2E2E2',
    marginHorizontal: 8,
  },
});
