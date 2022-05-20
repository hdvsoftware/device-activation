import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import { ApiClient } from './generated/api';
import { CustomApiClient } from './shared/CustomApiClient';
import Login from './views/login';
import CustomerList from './views/customer/customer-list';
import CustomerDetail from './views/customer/customer-detail';

const AppStack = createStackNavigator();
export default function App() {
  ApiClient.instance = new CustomApiClient();
  ApiClient.instance.basePath = "http://localhost:8080";

  return(
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: true }}>
        <AppStack.Screen name="Login" component={Login} options={{ title: "Device activatie app" }} />
        <AppStack.Screen name="CustomerList" component={CustomerList} options={{ title: "Omgevingen" }} />
        <AppStack.Screen name="CustomerDetail" component={CustomerDetail} options={{ title: "Omgeving details" }} />

      </AppStack.Navigator>
    </NavigationContainer>
  );
}