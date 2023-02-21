import {FlatList, StyleSheet, View, ActivityIndicator} from 'react-native';
import React from 'react';
import FoodCard from './FoodCard';
import SectionTitle from './SectionTitle';
import {FlashList} from '@shopify/flash-list';

const Section = ({goToPage, title, items, loading}) => {
  if (loading) return <ActivityIndicator />;
  return (
    <View>
      <View style={styles.localBox}>
        <SectionTitle title={title} linkPage={goToPage} itemData={items} />
      </View>
      <View style={styles.list}>
        <FlashList
          data={items}
          renderItem={({item}) => {
            return <FoodCard image={item.cover_photo} name={item.name} />;
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={180}
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
