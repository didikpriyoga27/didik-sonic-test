import React from 'react';

import AppContainer from './src/AppContainer';

if (__DEV__) {
  import('./reactotron');
}

function App(): JSX.Element {
  return <AppContainer />;
}

export default App;
