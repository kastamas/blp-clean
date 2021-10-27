import { AppRegistry } from 'react-native';
import App from './app/App';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import 'react-native-get-random-values';

GoogleSignin.configure();

AppRegistry.registerComponent('main', () => App);
