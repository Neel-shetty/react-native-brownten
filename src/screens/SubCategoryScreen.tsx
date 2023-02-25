import React from 'react';
import {View, Dimensions, ActivityIndicator} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/ExploreComponents/CategoryCard';
import {useQuery} from 'react-query';
import {fetchSubCategories} from '../api/fetchSubCategories';

const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const SubCategoryScreen = ({navigation}: any) => {
  const {
    isLoading,
    error,
    data: categoriesFetched,
  } = useQuery('SubCategories', fetchSubCategories);

  return (
    <ScrollView style={styles.container}>
      <Header title="Sub Categories" />
      <View style={styles.searchBarBox}>
        {/* @ts-ignore */}
        <SearchBar navigation={navigation} navigateTo="SearchScreen" />
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

export default {component: SubCategoryScreen, name: 'SubCategoryScreen'};
