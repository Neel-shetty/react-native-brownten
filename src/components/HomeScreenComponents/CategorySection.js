import {FlatList, StyleSheet, View, ActivityIndicator} from 'react-native';
import React from 'react';
import FoodCard from './FoodCard';
import SectionTitle from './SectionTitle';
import {useQuery} from 'react-query';
import {fetchCategories} from '../../api/fetchCategories';
import CategoryCard from '../ExploreComponents/CategoryCard';
import CategorySectionTitle from './CategorySectionTitle';
import {FlashList} from '@shopify/flash-list';

const CategorySection = ({title}) => {
  const {
    isLoading,
    error,
    data: categoriesFetched,
  } = useQuery('categories', fetchCategories);

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
            return <CategoryCard title={item.name} image={item.image} />;
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
