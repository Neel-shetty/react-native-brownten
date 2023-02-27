import {StyleSheet, View} from 'react-native';
import React from 'react';

const RadioButton = ({selected = false}) => {
  return (
    <View style={styles.outerRing}>
      {selected ? <View style={styles.innerCircle} /> : null}
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  outerRing: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#53B175',
  },
});
