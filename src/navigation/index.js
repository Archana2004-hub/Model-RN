import React from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { C } from '../theme';
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import ProductsScreen from '../screens/ProductsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Tabs Navigation (Favorites & Profile only for customers) - floating pill tab bar
function Tabs() {
  const { user, cartCount } = useApp();
  const customer = user.role === 'customer';
  const icon = (n) => ({ tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? n : `${n}-outline`} size={24} color={color} /> });
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false, tabBarShowLabel: false, tabBarActiveTintColor: C.primary, tabBarInactiveTintColor: C.grey,
      tabBarStyle: { position: 'absolute', left: 18, right: 18, bottom: 16, height: 64, borderRadius: 32, backgroundColor: C.navy, borderTopWidth: 0, elevation: 10, paddingBottom: 0, paddingTop: 0 },
      tabBarItemStyle: { height: 64, justifyContent: 'center' },
    }}>
      <Tab.Screen name="Shop" component={ProductsScreen} options={icon('storefront')} />
      {customer && <Tab.Screen name="Favorites" component={FavoritesScreen} options={icon('heart')} />}
      <Tab.Screen name="Cart" component={CartScreen} options={{ ...icon('cart'), tabBarBadge: cartCount || undefined, tabBarBadgeStyle: { backgroundColor: C.primary } }} />
      {customer && <Tab.Screen name="Profile" component={ProfileScreen} options={icon('person')} />}
    </Tab.Navigator>
  );
}

function DrawerContent(props) {
  const { user, signOut } = useApp();
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ paddingHorizontal: 18, paddingVertical: 20 }}>
        <Image source={require('../../assets/products/logo.png')} style={{ width: 64, height: 64 }} />
        <Text style={{ color: '#fff', fontWeight: '800', fontSize: 20, marginTop: 8 }}>{user.name}</Text>
        <Text style={{ color: C.primary, fontWeight: '800', fontSize: 12, marginTop: 2 }}>{user.role.toUpperCase()}</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem label="Log Out" labelStyle={{ color: '#fff', fontWeight: '700' }} icon={({ size }) => <Ionicons name="log-out-outline" size={size} color={C.red} />} onPress={signOut} />
    </DrawerContentScrollView>
  );
}

// Drawer Navigation
function MainDrawer() {
  return (
    <Drawer.Navigator drawerContent={(p) => <DrawerContent {...p} />} screenOptions={{
      headerStyle: { backgroundColor: C.navy }, headerTintColor: '#fff', headerShadowVisible: false,
      drawerStyle: { backgroundColor: C.navy }, drawerActiveBackgroundColor: C.primary, drawerActiveTintColor: '#fff', drawerInactiveTintColor: '#C8CAD8',
    }}>
      <Drawer.Screen name="FreshCart" component={Tabs}
        options={{ drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} /> }} />
    </Drawer.Navigator>
  );
}

// Stack Navigation (root: auth flow + details screens)
export default function RootNavigator() {
  const { user } = useApp();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Auth" component={AuthScreen} options={{ title: '', headerTransparent: true, headerTintColor: '#fff' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainDrawer} options={{ headerShown: false }} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: '', headerTransparent: true, headerTintColor: C.navy, headerShadowVisible: false }} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile', headerStyle: { backgroundColor: C.cream }, headerTintColor: C.navy, headerShadowVisible: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
