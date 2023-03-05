import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {layout} from '../../constants/Layout';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {colors} from '../../constants/colors';

const SheetItem = ({
  title,
  value,
  onPress,
  field,
  setOnline,
}: {
  title: string;
  value?: string;
  onPress: () => void;
  field: string;
  setOnline?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [idk, setIdk] = useState<boolean>(false);
  const [selected, setSelected] = useState('Online');
  const initalOptions = [
    {title: 'Online', selected: true},
    {title: 'Cash on Delivery', selected: false},
  ];
  const [options, setOptions] = useState(initalOptions);
  console.log('🚀 ~ file: SheetItem.tsx:25 ~ options:', options);

  if (idk) {
    if (field === 'payment') {
      return (
        <View>
          {options.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setIdk(false);
                  setSelected(item.title);
                  if (item.title === 'Online') {
                    //@ts-ignore
                    setOnline(true);
                    setOptions([
                      {title: item.title, selected: true},
                      {title: 'Cash on Delivery', selected: false},
                    ]);
                  }
                  if (item.title === 'Cash on Delivery') {
                    //@ts-ignore
                    setOnline(false);
                    setOptions([
                      {title: 'Online', selected: false},
                      {title: 'Cash on Delivery', selected: true},
                    ]);
                  }
                }}>
                <View
                  style={[
                    styles.optionContainer,
                    item.selected ? {backgroundColor: colors.green} : null,
                  ]}>
                  <Text
                    style={[
                      styles.value,
                      item.selected ? {color: 'white'} : null,
                    ]}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    } else {
      return (
        <View>
          <Text>abc</Text>
        </View>
      );
    }
  }
  if (field === 'payment') {
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
              <Text style={styles.value}>
                {selected === 'Cash on Delivery' ? 'COD' : selected}
              </Text>
              <EvilIcons name={'chevron-right'} size={34} color={'black'} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  if (field === 'address') {
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
              <Text style={styles.value}>
                {selected === 'Cash on Delivery' ? 'COD' : selected}
              </Text>
              <EvilIcons name={'chevron-right'} size={34} color={'black'} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  if (field === 'cost') {
    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <Text style={styles.key}>{title}</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{value}</Text>
            <View style={styles.placeHolder} />
          </View>
        </View>
      </View>
    );
  }
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
  optionContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e2e2e2',
    width: layout.widthp,
    marginTop: 10,
    borderRadius: 10,
  },
  placeHolder: {
    width: 14,
  },
});
