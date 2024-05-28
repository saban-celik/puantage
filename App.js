import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import EmployeeDetailScreen from './screens/EmployeeDetailScreen';
import EmployeeNote from './screens/EmployeeNote';
import NoteScreen from './screens/NoteScreen';
import AddEmployeeScreen from './screens/AddEmployeeScreen';
import colors from './constants/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Kişiler' }}
      />
      <Stack.Screen 
        name="EmployeeDetail" 
        component={EmployeeDetailScreen} 
        options={{ title: 'Çalışan Detayları' }}
      />
      <Stack.Screen 
        name="AddEmployee" 
        component={AddEmployeeScreen} 
        options={{ title: 'Yeni Çalışan Ekle' }}
      />
    </Stack.Navigator>
  );
}

function NoteStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="EmployeeNote" 
        component={EmployeeNote} 
        options={{ title: 'Notlar' }}
      />
      <Stack.Screen 
        name="Note" 
        component={NoteScreen} 
        options={{ title: 'Not Detayları' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'people-outline';
            } else if (route.name === 'EmployeeNote') {
              iconName = 'create-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.inactiveTintColor,
          tabBarStyle: {
            backgroundColor: colors.white,
            borderTopColor: colors.border,
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeStack} 
          options={{ headerShown: false, tabBarLabel: 'Kişiler' }} 
        />
        <Tab.Screen 
          name="EmployeeNote" 
          component={NoteStack} 
          options={{ headerShown: false, tabBarLabel: 'Notlar' }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
