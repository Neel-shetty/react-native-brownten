import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import OptionButton from './OptionButton';

const Toggle = ({
  onPressInfo,
  onPressItems,
  info,
  items,
}: {
  onPressInfo: () => void;
  onPressItems: () => void;
  items: boolean;
  info: boolean;
}) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={onPressInfo}>
        <OptionButton selected={info} title="Info" />
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity onPress={onPressItems}>
        <OptionButton selected={items} title="Items" />
      </TouchableOpacity>
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
