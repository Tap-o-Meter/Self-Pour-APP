import React from 'react';
import Main from './src/main';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import store from './src/redux/store';
import NfcManager from 'react-native-nfc-manager';
import RNBootSplash from 'react-native-bootsplash';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

function App() {
  const [hasNFC, setHasNFC] = React.useState(null);

  React.useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 1000);

    async function checkNfc() {
      const supported = await NfcManager.isSupported();
      if (supported) await NfcManager.start();
      setHasNFC(supported);
    }

    checkNfc();
  }, []);


  return (
    <Provider store={store.configureStore()}>
      <Main />
    </Provider>
  );
}

export default App;
