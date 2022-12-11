import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from './components/AuthContext/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image, Text } from 'react-native';
import ForgotpasswordScreen from './components/ForgotpasswordScreen';
import RegisterScreen from './components/RegisterScreen';

import Main_HiraganScreen from './components/hiragana/Main_HiraganScreen';
import Main_KatakanaScreen from './components/katakana/Main_KatakanaScreen';
import Practice from './components/HKComponents/practice';
import Theory from './components/HKComponents/theory';
import Result from './components/HKComponents/result';
import Kanji_1 from './components/kanji/Kanji_1';
import DrawScreen from './components/kanji/DrawScreen';
import KanjiTheory from './components/kanji/kanjiTheory';
import WebViewScreen from './components/kanji/webview';

import Chat from './components/Chat';

// Таб навигация
import Main from './components/Main';
import Shop from './components/Shop';
import Language from './components/Lang';
import Profile from './components/Profile';

// Названия экранов навигации
const home = "Home";
const language = "Lang";
const shop = "Shop";
const profile = "Profile";

// Экраны не относятся к таб навигации
import LoginScreen from './components/LoginScreen';
import FirstLoginScreen from './components/FirstLoginScreen';
import CheckEmailScreen from './components/Checkemail'

export const Navigate = () => {

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const initialLoginState = {
    isLoading: true,
    name: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          name: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          name: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          name: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (email, password, token, photo, name, date) => {
      try {
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('password', password);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('photo', photo);
        await AsyncStorage.setItem('name', name);
        await AsyncStorage.setItem('date', date);
        // console.log('date --------- ' + photo)
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGIN', id: email, userToken: token });
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('password');
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('photo');
        await AsyncStorage.removeItem('name');
        await AsyncStorage.removeItem('date');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {

    }
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken }); //в action передается userToken который берется из локального хранилища, если его там нету то он undefined
    }, 2500);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{ height: 200, resizeMode: "contain", backgroundColor: "#ffffff" }}
          source={require('./assets/fuji.png')}
        />
        <Text style={{ fontSize: 18, marginTop: 20, color: '#494949' }}>JAPANGO</Text>
        <Text style={{ fontSize: 20, marginTop: 0, color: '#494949' }}>日本語</Text>
      </View>
    );
  }

  const TabStack = () => {
    return (
      <Tab.Navigator
        initialRouteName={home}
        screenOptions={({ route }) => ({
          title: '',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === home) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === language) {
              iconName = focused ? 'apps' : 'apps-outline';

            } else if (rn === shop) {
              iconName = focused ? 'pricetags' : 'pricetags-outline';

            } else if (rn === profile) {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={24} color={color} />;
          },
          tabBarActiveTintColor: '#442C2E',
          tabBarInactiveTintColor: '#442C2E',
          tabBarStyle: {
            height: 60,
            paddingTop: 10,
            borderTopWidth: 0,
            backgroundColor: '#FEEAE6',
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 4,
            shadowOffset: {
              width: 0,
              height: 2
            },
          }
        })}>
        <Tab.Screen options={{ headerShown: false }} name={home} component={Main} />
        {/* <Tab.Screen options={{ headerShown: false }} name={language} component={Language} /> */}
        {/* <Tab.Screen options={{ headerShown: false }} name={shop} component={Shop} /> */}
        <Tab.Screen options={{ headerShown: false }} name={profile} component={Profile} />
      </Tab.Navigator>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      {loginState.userToken !== null ? (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="App">
          <Stack.Screen name="Tab" component={TabStack} /*options={{ animationEnabled: false, }}*/ />
          <Stack.Screen name="Main_HiraganScreen" component={Main_HiraganScreen} /*options={{ animationEnabled: false, }}*/ />
          <Stack.Screen name="Main_KatakanaScreen" component={Main_KatakanaScreen} /*options={{ animationEnabled: false, }}*/ />
          <Stack.Screen name="Practice" component={Practice} options={[{ animationEnabled: false }, { animationTypeForReplace: 'pop' }]} />
          <Stack.Screen name="Theory" component={Theory} />
          <Stack.Screen name="Result" component={Result} />
          <Stack.Screen name="Kanji_1" component={Kanji_1} />
          <Stack.Screen name="DrawScreen" component={DrawScreen} />
          <Stack.Screen name="KanjiTheory" component={KanjiTheory} />
          <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      )
        :
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="App">
          <Stack.Screen name="firstLoginScreen" component={FirstLoginScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="forgot" component={ForgotpasswordScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="CheckEmailScreen" component={CheckEmailScreen} />
        </Stack.Navigator>
      }
    </AuthContext.Provider>
  )
};