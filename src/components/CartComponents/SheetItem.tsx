import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {layout} from '../../constants/Layout';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const SheetItem = ({
  title,
  value,
  onPress,
}: {
  title: string;
  value: string;
  onPress: () => void;
}) => {
  const [idk, setIdk] = useState<boolean>(false);
  if (idk) {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setIdk(false);
          }}>
          <Text>nice</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.key}>{title}</Text>
        <TouchableOpacity
          onPress={() => {
            onPress();
            setIdk(true);
          }}>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{value}</Text>
            <EvilIcons name={'chevron-right'} size={34} color={'black'} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SheetItem;

const styles = StyleSheet.create({
  root: {
    width: layout.widthp,
    height: 40,
    justifyContent: 'center',
    marginVertical: 10,
  },
  key: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#7C7C7C',
  },
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  value: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: 'black',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
