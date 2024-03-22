import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {persistQueryClient} from '@tanstack/react-query-persist-client';
import {useColorScheme} from 'nativewind';
import React from 'react';
import {Platform, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';

import AppNavigation from './shared/navigation/AppNavigation';

enableScreens();

export default function AppContainer() {
  const {colorScheme} = useColorScheme();
  const isDark = colorScheme === 'dark';

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        networkMode: 'online',
        retry: false,
      },
    },
  });

  const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
  });

  persistQueryClient({
    queryClient,
    persister: asyncStoragePersister,
    dehydrateOptions: {
      shouldDehydrateQuery: query => {
        const shouldPersist = (query?.meta?.persist as boolean) ?? false;
        return shouldPersist;
      },
    },
  });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar
            barStyle={Platform.select({
              ios: isDark ? 'light-content' : 'dark-content',
              android: 'light-content',
            })}
          />
          <AppNavigation />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
