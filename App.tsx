import React, { useEffect } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as Font from 'expo-font';

import Navigation from './src/navigation';

const App = () => {
  useEffect(() => {
    const loadFonts = async () => {
      // Load the Google Font asynchronously
      await Font.loadAsync({
        'JakartaSansExtraLight': require('./assets/fonts/PlusJakartaSans-ExtraLight.ttf'),
        'JakartaSansLight': require('./assets/fonts/PlusJakartaSans-Light.ttf'),
        'JakartaSansRegular': require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
        'JakartaSansMedium': require('./assets/fonts/PlusJakartaSans-Medium.ttf'),
        'JakartaSansSemiBold': require('./assets/fonts/PlusJakartaSans-SemiBold.ttf'),
        'JakartaSansBold': require('./assets/fonts/PlusJakartaSans-Bold.ttf'),
        'JakartaSansExtraBold': require('./assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
      });
    }

    loadFonts();
  }, []);

  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}

export default App;
