import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const OptionButton = ({
  title,
  selected,
}: {
  title: string;
  selected: boolean;
}) => {
  console.log(selected);
  return (
    <View style={[styles.root, selected ? styles.green : null]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default OptionButton;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 117,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(83, 177, 117, 0.7)',
    backgroundColor: 'white',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: 'black',
  },
  green: {
    backgroundColor: 'rgba(83, 177, 117, 0.1)',
  },
});
