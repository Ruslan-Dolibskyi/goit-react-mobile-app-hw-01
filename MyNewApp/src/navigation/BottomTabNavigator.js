import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../../styles/global";
import PostsScreen from "../screens/PostsScreen";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Публікації"
        component={PostsScreen}
        options={({ navigation }) => ({
          title: "Posts Screen",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="grid"
              size={32}
              color={focused ? colors.orange : "black"}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Створити Публікацію"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          title: "Create Post",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="add"
              size={32}
              color={focused ? colors.orange : "black"}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Профіль"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              size={32}
              color={focused ? colors.orange : "black"}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  addButton: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.orange,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BottomTabNavigator;
