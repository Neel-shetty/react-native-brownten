import React from 'react';
import {Text, View, ScrollView, Dimensions, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Section from '../../components/HomeScreenComponents/Section';
import Banner from '../../components/HomeScreenComponents/Banner';
import SearchBarHeader from '../../components/HomeScreenComponents/SearchBarHeader';
// import Header from '../../components/HomeScreenComponents/Header';

const {width: widthScreen, height: heightScreen} = Dimensions.get('window');

const Home = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      {/* <Header /> */}
      <SearchBarHeader />
      <Banner />
      <Section title={'Test section'} />
      <Section title={'Test section'} />
      <Section title={'Test section'} />
      <Section title={'Test section'} />
      <View style={styles.scrollFooter} />
    </ScrollView>
  );
};

const styles = EStyleSheet.create({
  localBox: {
    paddingHorizontal: 25.0,
  },
  container: {
    width: widthScreen,
    minHeight: heightScreen,
    paddingTop: 35.0,
    backgroundColor: '$whiteColour',
  },

  searchBox: {
    marginTop: 20.0,
  },
  horizontalScroll: {
    paddingLeft: 20.0,
  },
  scrollFooter: {
    marginBottom: heightScreen * 0.15,
  },
});

export default {component: Home, name: 'Home'};
