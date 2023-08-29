import { ThemeProvider } from 'styled-components/native';
import {
  useFonts, Roboto_400Regular, Roboto_700Bold 
} from '@expo-google-fonts/roboto'

import theme from './src/theme'

import { Groups } from './src/screens/Groups';
import { Loading } from '@components/Loading';
import { StatusBar } from 'react-native';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  if (fontError) {
    return null
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {fontsLoaded ? (
        <Groups />
      ) : (
        <Loading />
      )}
    </ThemeProvider>
  );
}
