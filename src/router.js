import React from 'react';
import {Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-ionicons';

import {FavoriteScreen, WatchlistScreen} from './Screens/FavoritesScreen';
import {HomeScreen, CategoryScreen} from './Screens/HomeScreen';
import SearchScreen from './Screens/SearchScreen';
import FilmScreen from './Screens/FilmScreen';
import ProfileScreen from './Screens/ProfileScreen';

import store from '../store';
import {Provider} from 'react-redux';

const Router = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const TopTab = createMaterialTopTabNavigator();
  const ListTabs = () => {
    return (
      <TopTab.Navigator
        screenOptions={{
          activeTintColor: '#fff',
          inactiveTintColor: '#fff',
          labelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
          tabBarStyle: {
            height: 45,
          },
          tabBarIndicatorStyle: {backgroundColor: 'black'},
        }}>
        <TopTab.Screen
          name="Favorite"
          component={FavoriteScreen}
          options={{
            tabBarIcon: ({size, color}) => (
              <Ionicons name="ios-heart" size={26} color={'#000'} />
            ),
          }}
        />
        <TopTab.Screen
          name="Watchlist"
          component={WatchlistScreen}
          options={{
            tabBarIcon: () => (
              <Ionicons name="ios-bookmark" size={28} color={'#000'} />
            ),
          }}
        />
      </TopTab.Navigator>
    );
  };

  const HomeStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          presentation: 'modal',
          animationEnabled: true,

          headerShown: false,
          gestureEnabled: false,
          gestureResponseDistance: Dimensions.get('window').height,
          gestureDirection: 'vertical',
        }}>
        <Stack.Screen
          name={'HomeScreen'}
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'CategoryScreen'}
          component={CategoryScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="FilmScreen"
          component={FilmScreen}
          options={{headerTransparent: true}}
        />
      </Stack.Navigator>
    );
  };
  const SearchStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          presentation: 'modal',
          headerShown: false,
          gestureEnabled: true,
          gestureResponseDistance: Dimensions.get('window').height,
          gestureDirection: 'vertical',
        }}>
        <Stack.Screen name="SearchStack" component={SearchScreen} />
        <Stack.Screen name="FilmScreen" component={FilmScreen} />
      </Stack.Navigator>
    );
  };
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            headerTitleStyle: {color: 'red'},
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({color, size}) => {
              let iconName;
              if (route.name === 'Home') iconName = 'home';
              else if (route.name === 'Profile') iconName = 'person';
              else if (route.name === 'Favorites') iconName = 'heart';
              else iconName = 'search';
              return <Ionicons name={iconName} size={28} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Search" component={SearchStack} />
          <Tab.Screen name="Favorites" component={ListTabs} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Router;
