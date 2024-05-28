import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import EmployeeDetailScreen from '../screens/EmployeeDetailScreen';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    EmployeeDetail: EmployeeDetailScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

export default createAppContainer(AppNavigator);
