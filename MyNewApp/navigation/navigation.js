import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/global";
import RegistrationScreen from "../screens/RegistrationScreen";
import LoginScreen from "../screens/LoginScreen";
import PostsScreen from "../screens/PostsScreen";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MapScreen from "../screens/MapScreen";
import CommentsScreen from "../screens/CommentsScreen";
import LogoutButton from "../components/LogoutButton";
import BackButton from "../components/BackButton";
import { monitorAuthState, logoutUser } from "../firebase";

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const PostsStack = createStackNavigator();

const Navigation = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = monitorAuthState((user) => {
      setIsUserLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogOut = async () => {
    try {
      await logoutUser();
      setIsUserLoggedIn(false);
    } catch (error) {
      alert("Помилка виходу: " + error.message);
    }
  };

  const forwardBackButton = (navigation) => (
    <View style={{ paddingLeft: 16 }}>
      <BackButton onPress={() => navigation.goBack()} />
    </View>
  );

  const logOut = () => (
    <View style={{ paddingRight: 16 }}>
      <LogoutButton onPress={handleLogOut} />
    </View>
  );

  const TabNavigator = () => (
    <Tabs.Navigator
      initialRouteName="PostsStack"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => (
          <Ionicons
            name={getTabIcon(route.name, focused)}
            size={focused ? 32 : 24}
            color={color}
          />
        ),
        tabBarActiveTintColor: colors.orange,
        tabBarInactiveTintColor: colors.black_primary_opacity,
        tabBarLabel: () => null,
      })}
    >
      <Tabs.Screen
        name="PostsStack"
        component={PostsStackNavigator}
        options={{
          title: "Публікації",
          headerRight: logOut,
        }}
      />
      <Tabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          title: "Створити публікацію",
          tabBarStyle: { display: "none" },
          headerLeft: () => forwardBackButton(navigation),
        })}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tabs.Navigator>
  );

  const AuthStackNavigator = () => (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );

  const PostsStackNavigator = () => (
    <PostsStack.Navigator
      initialRouteName="Posts"
      screenOptions={{
        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },
      }}
    >
      <PostsStack.Screen
        name="Posts"
        component={PostsScreen}
        options={{ headerShown: false }}
      />
      <PostsStack.Screen
        name="Map"
        component={MapScreen}
        options={({ navigation }) => ({
          title: "Мапа",
          headerLeft: () => forwardBackButton(navigation),
        })}
      />
      <PostsStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={({ navigation }) => ({
          title: "Коментарі",
          headerLeft: () => forwardBackButton(navigation),
        })}
      />
    </PostsStack.Navigator>
  );

  return isUserLoggedIn ? <TabNavigator /> : <AuthStackNavigator />;
};

const getTabIcon = (routeName, focused) => {
  const icons = {
    PostsStack: focused ? "grid" : "grid-outline",
    CreatePosts: focused ? "add" : "add-outline",
    Profile: focused ? "person" : "person-outline",
  };
  return icons[routeName] || "help-circle-outline";
};

export default Navigation;
