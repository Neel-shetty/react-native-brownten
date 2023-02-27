import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {layout} from '../constants/Layout';
import EStyleSheet from 'react-native-extended-stylesheet';
import SecondaryButton from '../components/SecondaryButton';
import {colors} from '../constants/colors';

const data = [1, 2, 3, 4, 5, 6, 7, 8];

const AddressScreen = () => {
  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <Text style={eStyles.text}>My cart</Text>
      </View>
      <View style={styles.listContainer}>
        <ScrollView>
          {data.map(item => {
            return <Text key={item}>item</Text>;
          })}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <SecondaryButton
            onPress={() => {}}
            text="Add Address"
            bgColour={colors.green}
            txtColour={colors.green}
          />
        </View>
      </View>
    </View>
  );
};

export default {component: AddressScreen, name: 'AddressScreen'};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
    width: layout.width,
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'pink',
    width: layout.width,
    maxHeight: 60,
    borderBottomWidth: 1,
    borderColor: '#E2E2E2',
  },
  listContainer: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center',
    width: layout.width,
  },
  buttonContainer: {
    // flex: 2,
    width: layout.widthp,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 70,
    marginBottom: 10,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
  },
});

const eStyles = EStyleSheet.create({
  text: {
    alignSelf: 'center',
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: '1.125rem',
  },
});
