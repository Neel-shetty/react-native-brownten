import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
} from 'react-native';
import React from 'react';
import FoodCard from './FoodCard';
import SectionTitle from './SectionTitle';
// import {FlashList} from '@shopify/flash-list';
import {ProductPreviewType} from '../../screens/tabs/Home';

interface SectionProps {
  items: ProductPreviewType[];
  loading: boolean;
  goToPage: string;
  title: string;
}

const Section = ({goToPage, title, items, loading}: SectionProps) => {
  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View>
      <View style={styles.localBox}>
        <SectionTitle title={title} linkPage={goToPage} itemData={items} />
      </View>
      <View style={styles.list}>
        <FlatList
          data={items}
          renderItem={({item}) => {
            console.log(item, '1,2');
            return <Text>abc</Text>;
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          // estimatedItemSize={180}
        />
      </View>
    </View>
  );
};

export default Section;

const styles = StyleSheet.create({
  localBox: {
    paddingHorizontal: 25.0,
  },
  list: {
    paddingLeft: 20,
  },
});
