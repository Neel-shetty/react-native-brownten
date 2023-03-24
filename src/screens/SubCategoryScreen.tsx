import React, {useEffect} from 'react';
import {View, Dimensions, ActivityIndicator} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import {useQuery} from 'react-query';
import {fetchSubCategories} from '../api/fetchSubCategories';
import SearchScreen from './SearchScreen';
import {useRoute} from '@react-navigation/native';
import SubCategoryCard from '../components/SubCategoryScreenComponents/SubCategoryCard';
import {layout} from '../constants/Layout';

const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const SubCategoryScreen = ({navigation}: any) => {
  const route: any = useRoute();
  const {isLoading, data: categoriesFetched} = useQuery(
    'SubCategories',
    async () => {
      return await fetchSubCategories(route?.params?.category_id);
    },
  );
  console.log(
    '🚀 ~ file: SubCategoryScreen.tsx:19 ~ SubCategoryScreen ~ categoriesFetched:',
    categoriesFetched?.data?.data,
  );

  useEffect(() => {
    return () => {};
  }, []);

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
            //@ts-ignore
            data={categoriesFetched?.data?.data}
            // keyExtractor={item => item.id}
            scrollEnabled={false}
            renderItem={({item, index}) => {
              return (
                <SubCategoryCard
                  index={index}
                  length={categoriesFetched?.data?.data.length}
                  key={item.id}
                  title={item.name}
                  image={item.image}
                  onPress={() => {
                    navigation.navigate(SearchScreen.name, {
                      link: '/sub/category/wise/products',
                      fieldName: 'slug',
                      fieldValue: item.slug,
                      autoFocus: false,
                    });
                  }}
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
    width: layout.width,
  },
  scrollFooter: {
    marginBottom: heightScreen * 0.15,
  },
});

export default {component: SubCategoryScreen, name: 'SubCategoryScreen'};
