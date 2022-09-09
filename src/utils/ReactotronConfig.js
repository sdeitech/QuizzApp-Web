import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux as reduxPlugin } from 'reactotron-redux';

const instance = Reactotron
    .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
    .configure({ name: 'Murabo' })
    .useReactNative() // add all built-in react native plugins
    .use(reduxPlugin())
    .configure() // controls connection & communication settings
    .connect(); // let's connect!

// if (__DEV__) {
//     Reactotron.connect()
//     Reactotron.clear()
// }

Reactotron.onCustomCommand('test', () => console.tron.log('This is an example'))

console.tron = Reactotron

export default instance;
