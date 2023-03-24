import {StyleSheet, View} from 'react-native';
import React from 'react';
// import MapView from 'react-native-maps';

const MapScreen = () => {
  return (
    <View style={styles.root}>
      {/* <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> */}
    </View>
  );
};

export default {name: 'MapScreen', component: MapScreen};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
