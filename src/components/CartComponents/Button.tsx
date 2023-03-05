import React from 'react';
import {View} from 'react-native';
import {
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useSelector} from 'react-redux';
import {layout} from '../../constants/Layout';

const {height: screenHeight} = Dimensions.get('screen');
interface ButtonProps {
  text: string;
  bgColour: string;
  txtColour: string;
  onPress: () => void;
  loading?: boolean;
  value: number;
}
const Button = ({
  text,
  bgColour,
  txtColour,
  onPress,
  loading = false,
  value,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, {backgroundColor: bgColour}]}>
      {loading ? (
        <ActivityIndicator color={'white'} />
      ) : (
        <View style={styles.textContainer}>
          <Text style={[styles.buttonText, {color: txtColour}]}>{text}</Text>
          <Text style={[styles.buttonText, {color: txtColour}]}>{value}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 19.0,
    paddingVertical: screenHeight * 0.027,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '$greenColour',
  },
  buttonText: {
    fontFamily: '$gilroyNormal600',
    color: 'white',
    fontSize: '1.125rem',
    lineHeight: '1.25rem',
    height: '1.25rem',
  },
  textContainer: {
    flexDirection: 'row',
    width: layout.width * 0.8,
    justifyContent: 'space-between',
  },
});

export default Button;
