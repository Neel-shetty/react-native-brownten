import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import FoodCard from './FoodCard';
import SectionTitle from './SectionTitle';

const Section = ({goToPage, title}) => {
  return (
    <View>
      <View style={styles.localBox}>
        <SectionTitle title={title} linkPage={goToPage} />
      </View>
      <View style={styles.list}>
        <FlatList
          data={[1, 2, 3, 4]}
          renderItem={({item}) => {
            return <FoodCard />;
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
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
