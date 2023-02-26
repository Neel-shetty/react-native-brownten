import {FlatList, StyleSheet, View, ActivityIndicator} from 'react-native';
import React from 'react';
import FoodCard from './FoodCard';
import SectionTitle from './SectionTitle';
import {useQuery} from 'react-query';
import {fetchHomeSubCategories} from '../../api/fetchHomeSubCategories';
import CategoryCard from '../ExploreComponents/CategoryCard';
import CategorySectionTitle from './CategorySectionTitle';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';
import SearchScreen from '../../screens/SearchScreen';

const CategorySection = ({title}) => {
  const {
    isLoading,
    error,
    data: categoriesFetched,
  } = useQuery('homeSubCategories', fetchHomeSubCategories);

  const navigation = useNavigation();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <View style={styles.localBox}>
        <CategorySectionTitle title={title} />
      </View>
      <View style={styles.list}>
        <FlashList
          data={categoriesFetched.data.data}
          renderItem={({item}) => {
            return (
              <CategoryCard
                title={item.name}
                image={item.image}
                onPress={() => {
                  navigation.navigate(SearchScreen.name, {
                    link: '/category/wise/products',
                    fieldName: 'slug',
                    fieldValue: item.slug,
                    autoFocus: false,
                  });
                }}
              />
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={180}
        />
      </View>
    </View>
  );
};

export default CategorySection;

const styles = StyleSheet.create({
  localBox: {
    paddingHorizontal: 25.0,
  },
  list: {
    paddingLeft: 20,
  },
});
