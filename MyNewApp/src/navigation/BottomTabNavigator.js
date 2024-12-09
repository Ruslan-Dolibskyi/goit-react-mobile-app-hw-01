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
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarLabel: "",
        tabBarStyle: {
          display: "flex",
        },
        tabBarItemStyle: {
          paddingTop: 12,
        },
      })}
    >
      <Tab.Screen
        name="Публікації"
        component={PostsScreen}
        options={({ navigation }) => ({
          title: "Posts Screen",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={styles.addButton}>
                <Ionicons size={24} name="grid" color={colors.white} />
              </View>
            ) : (
              <Ionicons name="grid" size={24} color="black" />
            ),
        })}
      />
      <Tab.Screen
        name="Створити Публікацію"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          title: "Create Post",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={styles.addButton}>
                <Ionicons name="add" size={24} color={colors.white} />
              </View>
            ) : (
              <Ionicons name="add" size={24} color="black" />
            ),
        })}
      />
      <Tab.Screen
        name="Профіль"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: "Profile",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={styles.addButton}>
                <Ionicons name="person" size={24} color={colors.white} />
              </View>
            ) : (
              <Ionicons name="person" size={24} color="black" />
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
