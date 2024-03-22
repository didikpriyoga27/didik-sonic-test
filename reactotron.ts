/* eslint-disable no-console */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeModules} from 'react-native';
import Reactotron from 'reactotron-react-native';

const scriptURL = NativeModules.SourceCode.scriptURL;
const scriptHostname = scriptURL.split('://')[1].split(':')[0];

Reactotron?.setAsyncStorageHandler?.(AsyncStorage)
  .configure({host: scriptHostname})
  .useReactNative({
    asyncStorage: false,
    networking: {
      ignoreUrls: /symbolicate/,
    },
    editor: false,
    errors: {veto: () => false},
    overlay: false,
  })
  .connect();

const yeOldeConsoleLog = console.log;

console.log = (...args: any[]) => {
  yeOldeConsoleLog(...args);

  Reactotron.display({
    name: 'CONSOLE.LOG',
    value: args.length === 1 ? args[0] : args,
    preview: JSON.stringify(args),
  });
};
