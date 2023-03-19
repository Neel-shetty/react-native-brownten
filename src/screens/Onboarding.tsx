import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '../components/Button';
import SignIn from './SignIn';
import {layout} from '../constants/Layout';

const backgroundImage = require('../../assets/images/onboarding-background.png');
const logo = require('../../assets/images/home_screen/brownten-logo.png');

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
interface OnboardingProps {
  navigation: any;
}

const Onboarding = ({navigation}: OnboardingProps) => {
  const nextScreen = () => {
    console.log('pressed');
    navigation.navigate(SignIn.name);
  };

  return (
    <>
      <Image style={styles.backgroundImage} source={backgroundImage} />
      <View style={styles.footer}>
        {/* <Image style={styles.logoImage} source={logoImage} /> */}
        <Image
          style={{height: 75, width: layout.width, marginVertical: 20}}
          source={logo}
          resizeMode="cover"
        />
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.title}>to Brownten</Text>
        <Text style={styles.subtitle}>
          {/* Get your groceries in as fast as one hour */}
        </Text>
        <Button
          onPress={() => nextScreen()}
          bgColour="#53B175"
          txtColour="#FFF"
          text="Get Started"
        />
        {/* <Btn
          title="test"
          onPress={() => {
            console.log('pressed');
          }}
        /> */}
      </View>
    </>
  );
};

const styles = EStyleSheet.create({
  backgroundImage: {
    width: screenWidth,
    resizeMode: 'cover',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: screenWidth,
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.073,
    paddingBottom: screenHeight * 0.057,
  },
  logoImage: {
    marginBottom: screenHeight * 0.039,
  },
  title: {
    fontFamily: '$gilroyNormal600',
    fontSize: '3rem',
    lineHeight: '3rem',
    height: '3rem',
    color: '$whiteColour',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: screenHeight * 0.021,
    marginBottom: screenHeight * 0.045,
    fontFamily: '$gilroyMedium',
    color: 'rgba(252, 252, 252, 0.7)',
    fontSize: '1rem',
    lineHeight: '1rem',
  },
});

export default {component: Onboarding, name: 'Onboarding'};
