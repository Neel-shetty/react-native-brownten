//@ts-nocheck
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {layout} from '../../constants/Layout';
import {api} from '../../api';
import {useNavigation} from '@react-navigation/native';
import SearchScreen from '../../screens/SearchScreen';
import {colors} from '../../constants/colors';

const ImageBg = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);

  const navigation = useNavigation();

  const ref = useRef();

  async function getImages() {
    api
      .post('/banners')
      .then(res => {
        // console.log(res.data);
        setImages(res.data.data);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    getImages();
  }, []);

  useEffect(() => {
    let interval = null;
    if (autoScroll) {
      interval = setInterval(() => {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= images.length) {
          nextIndex = 0;
        }
        setCurrentIndex(nextIndex);
        ref.current.scrollToIndex({
          animated: true,
          index: nextIndex,
        });
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [autoScroll, currentIndex, images]);

  return (
    <View style={styles.root}>
      <View>
        <Animated.FlatList
          ref={ref}
          data={images}
          renderItem={({item}) => {
            return (
              <Animated.View
                key={item.id}
                style={{flex: 1, width: layout.widthp, overflow: 'hidden'}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(SearchScreen.name, {
                      link: '/banner/products',
                      fieldName: 'product_id',
                      fieldValue: item.id,
                      autoFocus: false,
                    })
                  }>
                  {/* <View style={styles.bannerTextContainer}> */}
                  <Text style={styles.bannerText}>{item.title}</Text>
                  <Text style={styles.bannerText2}>{item.title2}</Text>
                  {/* </View> */}
                  <Image
                    source={{uri: item.image}}
                    style={{height: layout.widthp / 3, width: '100%'}}
                    // resizeMode="contain"
                  />
                </TouchableOpacity>
              </Animated.View>
            );
          }}
          keyExtractor={item => {
            item.image;
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          getItemLayout={(data, index) => ({
            length: layout.widthp,
            offset: layout.widthp * index,
            index,
          })}
          snapToInterval={layout.widthp}
          decelerationRate="fast"
          bounces={false}
          pagingEnabled
          onScroll={e => {
            // const x = e.nativeEvent.contentOffset.x;
            // if (
            //   Math.floor(Math.floor(x) / Math.floor(layout.widthp)) >
            //     currentIndex ||
            //   Math.floor(Math.floor(x) / Math.floor(layout.widthp)) === 0
            // ) {
            //   setCurrentIndex(
            //     Math.floor(Math.floor(x) / Math.floor(layout.widthp))
            //   );
            // }
            // setAutoScroll(false);
          }}
          windowSize={1}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          removeClippedSubviews={true}
          viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: layout.widthp,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: "turquoise",
          // height: 30,
        }}>
        {/* {images.map((item, index) => {
          return (
            <View
              key={item.image}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: currentIndex == index ? '#93e3fe' : 'gray',
                marginLeft: 5,
                marginBottom: 15,
                // position: "absolute",
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}></View>
          );
        })} */}
      </View>
    </View>
  );
};

export default ImageBg;

const styles = StyleSheet.create({
  root: {
    width: layout.width * 0.9,
    backgroundColor: 'white',
    alignSelf: 'center',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: layout.widthp / 3,
    borderRadius: 10,
    elevation: 6,
    shadowRadius: 5,
    shadowOpacity: 0.25,
    borderWidth: 1,
    borderColor: '#edf0f3',
    overflow: 'hidden',
    marginTop: 20,
  },
  bannerText: {
    position: 'absolute',
    zIndex: 1,
    fontSize: 15,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    paddingTop: 10,
    paddingLeft: 10,
    width: layout.widthp / 2,
  },
  bannerText2: {
    position: 'absolute',
    zIndex: 1,
    fontSize: 12,
    color: 'black',
    fontFamily: 'Poppins-Medium',
    paddingBottom: 10,
    paddingLeft: 10,
    bottom: 0,
    width: layout.widthp / 2,
  },
  bannerTextContainer: {
    width: layout.widthp / 2,
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    height: layout.widthp / 3,
  },
});
