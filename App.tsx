import 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigator from './src/Navigator/Navigator';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';

import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://ea7d59c08c774e958c3db5040a736a87@o4504861291839488.ingest.sentry.io/4504861294985216',
  tracesSampleRate: 1.0,
});

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

export default Sentry.wrap(App);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
