import React from 'react';
import { Provider as StoreProvider, useSelector } from 'react-redux';
import { PaperProvider, Text, useTheme } from 'react-native-paper';
import { store } from './src/store/store';
import { lightTheme, darkTheme } from './src/theme/theme';
import { View, StatusBar } from 'react-native';

// We will create and import RootNavigator in the next phase
// import RootNavigator from './src/navigation/RootNavigator';

const ThemedApp = () => {
  // Note: To make TypeScript happy for now, we add `: any` to the state
  const themeMode = useSelector((state: any) => state.theme.mode);
  const currentTheme = themeMode === 'dark' ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={currentTheme}>
      {/* This is a temporary placeholder until we build our navigation */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: currentTheme.colors.background }}>
        <StatusBar barStyle={currentTheme.dark ? 'light-content' : 'dark-content'} />
        <Text>Setup Complete. Ready for Phase 3.</Text>
      </View>
    </PaperProvider>
  );
};

const App = () => {
  return (
    <StoreProvider store={store}>
      <ThemedApp />
    </StoreProvider>
  );
};

export default App;