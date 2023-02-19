import React, {useEffect} from 'react';
import {View, Dimensions, ActivityIndicator} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Header from '../../../components/Header';
import SearchBar from '../../../components/SearchBar';
import CategoryCard from '../../../components/ExploreComponents/CategoryCard';
import ImageTest from '../../../../assets/images/product_categories/bakery.png';
import {useQuery} from 'react-query';
import {fetchCategories} from '../../../api/fetchCategories';

const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const ExploreTab = ({navigation}) => {
  const {
    isLoading,
    error,
    data: categoriesFetched,
  } = useQuery('categories', fetchCategories);

  const ui_array = [
    {id: 0},
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6},
    {id: 7},
  ];

  return (
    <ScrollView style={styles.container}>
      <Header title="Find Products" />
      <View style={styles.searchBarBox}>
        <SearchBar navigation={navigation} navigateTo="" />
      </View>
      <View style={styles.body}>
        {isLoading ? (
          <ActivityIndicator size={'large'} color={'green'} />
        ) : (
          <FlatList
            data={categoriesFetched?.data?.data}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            numColumns={2}
            renderItem={({item}) => {
              return (
                <CategoryCard
                  key={item.id}
                  bgColour="pink"
                  borderColour="gray"
                  title={item.name}
                  image={item.image}
                  onPress={() => null}
                />
              );
            }}
          />
        )}
      </View>
      <View style={styles.scrollFooter} />
    </ScrollView>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: widthScreen,
    minHeight: heightScreen,
    backgroundColor: '$whiteColour',
  },
  searchBarBox: {
    paddingHorizontal: 25.0,
    marginBottom: 20.0,
  },
  body: {
    paddingHorizontal: 17.5,
  },
  scrollFooter: {
    marginBottom: heightScreen * 0.15,
  },
});

export default {component: ExploreTab, name: 'Explore'};
