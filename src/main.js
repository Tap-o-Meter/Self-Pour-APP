import React from 'react';
import {useSelector} from 'react-redux';
import { UserBottomTab } from './components/navigator';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Game, Main, TapInfo, Splash, LockScreen, Details, Staff} from './screens';

function App() {
  const {theresData} = useSelector(state => state.beerReducer);

  const LogInStack = createStackNavigator();
  const LoggedStack = createStackNavigator();
  const PouringStack = createStackNavigator();

  const Tab = createBottomTabNavigator();

  const cardModalStyle = {
    gestureEnabled: true,
    // presentation: 'modal',
    // animation: 'slide_from_bottom',
    // transparentCard: true,
    presentation: 'transparentModal',
    headerShown: false,
  };

  const MainStack = () => {
    return (
      <LoggedStack.Navigator>
        <LoggedStack.Screen
          name="LockScreen"
          component={LockScreen}
          options={{headerShown: false}}
        />
        <LoggedStack.Screen
            name="Main"
            children={UserTabs}
            options={{headerShown: false}}
            />
        {/* <LoggedStack.Screen name="Notifications" component={Notifications} />
            <LoggedStack.Screen name="Profile" component={Profile} />
            <LoggedStack.Screen name="Settings" component={Settings} /> */}
      </LoggedStack.Navigator>
    );
  };

  const LogIn = () => {
    return (
      <LogInStack.Navigator>
        <LogInStack.Screen
          name="splash"
          component={Splash}
          options={{headerShown: false}}
        />
      </LogInStack.Navigator>
    );
  };

  const UserTabs = () => {
    // tabBar={props => <MyTabBar {...props} />}
    return (
      <Tab.Navigator tabBar={props => <UserBottomTab {...props} />}>
        <Tab.Screen name="UserTabs" children={Pouring} options={{headerShown: false}} />
      </Tab.Navigator>
    );
  };

  const Pouring = () => {
    return (
      <PouringStack.Navigator>
        <PouringStack.Screen
          name="List"
          component={Main}
          options={{headerShown: false}}
        />
        <PouringStack.Screen
          name="Staff"
          component={Staff}
          options={{headerShown: false}}
        />
        {/* <PouringStack.Screen
          name="tap-info"
          component={TapInfo}
          options={{headerShown: false, ...cardModalStyle}}
          animation="slide_from_bottom"
        /> */}
        <PouringStack.Screen
          name="tap-info"
          component={Details}
          options={{headerShown: false}}
        />
      </PouringStack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {theresData ? <MainStack /> : <LogIn />}
    </NavigationContainer>
  );
}
export default App;
