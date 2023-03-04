import 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigator from './src/Navigator/Navigator';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider loading={null} store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={styles.root}>
            <Navigator />
          </GestureHandlerRootView>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
