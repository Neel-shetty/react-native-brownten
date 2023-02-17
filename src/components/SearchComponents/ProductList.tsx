import {StyleSheet, View, FlatList} from 'react-native';
import React, {useState} from 'react';
import FoodCard from '../HomeScreenComponents/FoodCard';

const ProductList = () => {
  const [result, setResult] = useState();
  console.log(
    '🚀 ~ file: ProductList.tsx:8 ~ ProductList ~ setResult',
    setResult,
  );
  console.log('🚀 ~ file: ProductList.tsx:8 ~ ProductList ~ result', result);
  return (
    <View style={styles.root}>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}
        renderItem={() => <FoodCard />}
        numColumns={2}
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  root: {},
});
