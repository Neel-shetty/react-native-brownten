import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React from 'react';
import CategoryCard from '../ExploreComponents/CategoryCard';
import CategorySectionTitle from './CategorySectionTitle';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';
import SearchScreen from '../../screens/SearchScreen';
import {useQuery} from 'react-query';
import {api} from '../../api';

interface BrandType {
  id: number;
  name: string;
  slug: string;
  image: string;
  created_at: string;
  updated_at: string;
}

const BrandSection = ({title}: {title: string}) => {
  const {
    isLoading,
    error,
    data: brandsFetched,
  } = useQuery('topBrands', async () => {
    const response = await api.post('/brands');
    return response.data.data as BrandType[];
  });

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
          data={brandsFetched}
          renderItem={({item}) => {
            return (
              <CategoryCard
                title={item.name}
                image={item.image}
                onPress={() => {
                  navigation.navigate(SearchScreen.name, {
                    link: '/brand/products',
                    fieldName: 'id',
                    fieldValue: item.id,
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

export default BrandSection;

const styles = StyleSheet.create({
  localBox: {
    paddingHorizontal: 25.0,
  },
  list: {
    paddingLeft: 20,
  },
});
