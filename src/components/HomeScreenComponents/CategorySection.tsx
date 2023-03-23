import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {fetchHomeSubCategories} from '../../api/fetchHomeSubCategories';
import CategoryCard from '../ExploreComponents/CategoryCard';
import CategorySectionTitle from './CategorySectionTitle';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';
import SearchScreen from '../../screens/SearchScreen';
import {useQuery} from 'react-query';
import ExploreTabs from '../../Navigator/ExploreTabs';

interface CategoryType {
  id: number;
  orderby: number;
  name: string;
  slug: string;
  image: string;
  created_at: string;
  updated_at: string;
}

const CategorySection = ({title}: {title: string}) => {
  const {
    isLoading,
    error,
    data: categoriesFetched,
  } = useQuery('homeSubCategories', fetchHomeSubCategories);

  const navigation: any = useNavigation();

  if (isLoading || error) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <View style={styles.localBox}>
        <CategorySectionTitle linkPage={''} title={title} />
      </View>
      <View style={styles.list}>
        <FlashList
          data={categoriesFetched?.data?.data as CategoryType[]}
          renderItem={({item}) => {
            return (
              <CategoryCard
                title={item.name}
                image={item.image}
                onPress={() => {
                  navigation.navigate(ExploreTabs.name, {
                    screen: SearchScreen.name,
                    params: {
                      link: '/category/wise/products',
                      fieldName: 'slug',
                      fieldValue: item.slug,
                      autoFocus: false,
                    },
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
