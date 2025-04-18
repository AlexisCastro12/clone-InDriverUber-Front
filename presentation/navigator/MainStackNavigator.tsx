import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/login/LoginScreen";
import RegisterScreen from "../screens/auth/register/RegisterScreen";
import { AuthProvider } from "../context/AuthContext";
import { container } from "../../di/container";
import RolesScreen from "../screens/roles/RolesScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ClientHomeScreen from "../screens/client/home/ClientHomeScreen";
import DriverHomeScreen from "../screens/driver/home/DriverHomeScreen";
import AdminHomeScreen from "../screens/admin/home/AdminHomeScreen";
import ClientSearchMapScreen from "../screens/client/searchMap/ClientSearchMapScreen";

export type RootStackParamList = {
  //Pantallas que se mostrarán
  LoginScreen: undefined;
  RegisterScreen: undefined;
  RolesScreen: undefined;
  ClientHomeScreen: undefined;
  DriverHomeScreen: undefined;
  AdminHomeScreen: undefined;
  ClientSearchMapScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();

export const MainStackNavigator = () => {
  const authUseCases = container.resolve('authUseCases');
  
  return (
    <AuthProvider authUseCases={authUseCases}>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="RegisterScreen"
          component={RegisterScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="RolesScreen"
          component={RolesScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ClientHomeScreen"
          component={ClientDrawerNavigator}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DriverHomeScreen"
          component={DriverHomeScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="AdminHomeScreen"
          component={AdminHomeScreen}
        />
      </Stack.Navigator>
    </AuthProvider>
  );
};

const ClientDrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="ClientSearchMapScreen">
      <Drawer.Screen name='ClientSearchMapScreen' component={ClientSearchMapScreen} />
    </Drawer.Navigator>
  );
};