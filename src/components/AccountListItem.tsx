import React from 'react';
import {TouchableOpacity, View, Text, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {AccountIcons} from '../helpers/Icons';
import {useNavigation} from '@react-navigation/native';
import MapScreen from '../screens/MapScreen';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
interface AccountListItemProps {
  label: string;
  children: JSX.Element;
  navigateTo?: string;
}

const AccountListItem = ({
  label,
  children,
  navigateTo,
}: AccountListItemProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        //@ts-expect-error
        navigation.navigate(navigateTo);
      }}
      style={styles.container}>
      <View style={styles.content}>
        {children}
        <Text style={styles.text}>{label}</Text>
      </View>
      <AccountIcons.RightArrowIcon
        style={styles.arrowRight}
        color={'#181725'}
      />
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  container: {
    paddingVertical: screenHeight * 0.02,
    paddingHorizontal: screenWidth * 0.06,
    borderBottomWidth: 1.0,
    borderBottomColor: '$lightGreyColour',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: '$gilroyNormal600',
    fontWeight: '600',
    fontSize: '1rem',
    color: '$blackColour',
    marginLeft: screenWidth * 0.048,
  },
  arrowRight: {},
});

export default AccountListItem;
