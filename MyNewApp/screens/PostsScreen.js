import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { colors } from "../styles/global";
import Post from "../components/Post";

const data = [
  {
    id: "1",
    pictureUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    pictureName: "Карпатські гори восени",
    comments: [
      {
        id: "1",
        author: "Олександр",
        comment: "Неймовірний краєвид! Де саме це місце?",
        dateTime: "12 жовтня, 2023 | 14:20",
      },
    ],
    locality: "Карпати, Україна",
    geoLocation: {
      latitude: 48.2652,
      longitude: 24.5235,
    },
  },
  {
    id: "2",
    pictureUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/80-391-0151_Kyiv_St.Sophia%27s_Cathedral_RB_18_2_%28cropped%29.jpg/1280px-80-391-0151_Kyiv_St.Sophia%27s_Cathedral_RB_18_2_%28cropped%29.jpg",
    pictureName: "Софійський собор у Києві",
    comments: [
      {
        id: "2",
        author: "Марія",
        comment: "Завжди мріяла відвідати це місце!",
        dateTime: "05 вересня, 2023 | 10:15",
      },
    ],
    locality: "Київ, Україна",
    geoLocation: {
      latitude: 50.4501,
      longitude: 30.5234,
    },
  },
  {
    id: "3",
    pictureUrl:
      "https://operahouse.od.ua/wp-content/uploads/2020/07/lytvynenko_sboku_vesherom.jpg",
    pictureName: "Одеський оперний театр",
    comments: [
      {
        id: "3",
        author: "Іван",
        comment: "Архітектура вражає! Коли найкраще відвідати?",
        dateTime: "22 серпня, 2023 | 18:45",
      },
    ],
    locality: "Одеса, Україна",
    geoLocation: {
      latitude: 46.4825,
      longitude: 30.7233,
    },
  },
  {
    id: "4",
    pictureUrl: "https://wallart.ua/wplg/4772-orig.jpg",
    pictureName: "Поля соняшників",
    comments: [
      {
        id: "4",
        author: "Світлана",
        comment: "Дуже красиво! Де це можна побачити?",
        dateTime: "30 липня, 2023 | 20:10",
      },
    ],
    locality: "Херсонська область, Україна",
    geoLocation: {
      latitude: 46.6357,
      longitude: 32.6169,
    },
  },
  {
    id: "5",
    pictureUrl:
      "https://www.ukraine-is.com/wp-content/uploads/2016/12/%D0%A4%D0%BE%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D0%B8-%D0%A3%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D1%8B-10.png",
    pictureName: "Замок Паланок у Мукачеві",
    comments: [
      {
        id: "5",
        author: "Дмитро",
        comment: "Історичне місце з багатою історією!",
        dateTime: "15 червня, 2023 | 12:30",
      },
    ],
    locality: "Мукачево, Україна",
    geoLocation: {
      latitude: 48.4391,
      longitude: 22.7177,
    },
  },
  {
    id: "6",
    pictureUrl:
      "https://img.tsn.ua/cached/721/tsn-f31867ea2500d8c162f8e1b3822736e1/thumbs/428x268/04/c0/7c77d58c9f1e2af43e8d7fee7238c004.jpeg",
    pictureName: "Водоспад Шипіт у Карпатах",
    comments: [
      {
        id: "6",
        author: "Олена",
        comment: "Чудове місце для відпочинку на природі!",
        dateTime: "10 травня, 2023 | 09:25",
      },
    ],
    locality: "Пилипець, Україна",
    geoLocation: {
      latitude: 48.6908,
      longitude: 23.272,
    },
  },
  {
    id: "7",
    pictureUrl:
      "https://inside-ua.com/files/places/ploscha-rinok-1.500x625.webp?090a5e3aa54d9d149c0fb05eca628d9b",
    pictureName: "Площа Ринок у Львові",
    comments: [
      {
        id: "7",
        author: "Катерина",
        comment: "Львів завжди чарівний, особливо ввечері.",
        dateTime: "25 квітня, 2023 | 19:00",
      },
    ],
    locality: "Львів, Україна",
    geoLocation: {
      latitude: 49.8397,
      longitude: 24.0297,
    },
  },
  {
    id: "8",
    pictureUrl:
      "https://prykarpattyatour.com/upload/items/307/big/festival-povitryanih-kul-ta-den-mista-v-kamyanci-podilskomu2.jpg",
    pictureName: "Кам'янець-Подільська фортеця",
    comments: [
      {
        id: "8",
        author: "Андрій",
        comment: "Вражаюча фортеця з цікавою історією!",
        dateTime: "12 березня, 2023 | 15:40",
      },
    ],
    locality: "Кам'янець-Подільський, Україна",
    geoLocation: {
      latitude: 48.6845,
      longitude: 26.5855,
    },
  },
  {
    id: "9",
    pictureUrl:
      "https://moow.life/files/uploads/images/4c89cc96b245ca60731e30302594eca7.jpg",
    pictureName: "Нічне місто Київ",
    comments: [
      {
        id: "9",
        author: "Наталія",
        comment: "Нічні вогні міста виглядають чудово!",
        dateTime: "05 лютого, 2023 | 21:15",
      },
    ],
    locality: "Київ, Україна",
    geoLocation: {
      latitude: 50.4501,
      longitude: 30.5234,
    },
  },
  {
    id: "10",
    pictureUrl: "https://km-oblrada.gov.ua/wp-content/uploads/2024/08/2337.jpg",
    pictureName: "Печерища в Бакоті",
    comments: [
      {
        id: "10",
        author: "Ігор",
        comment: "Прекрасний краєвид і тиша!",
        dateTime: "20 січня, 2023 | 14:20",
      },
    ],
    locality: "Бакота, Україна",
    geoLocation: {
      latitude: 48.5844,
      longitude: 27.1524,
    },
  },
];

const avatarUrl = require("../assets/avatar.png");

const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState(data);

  const navigateToComments = (item) => {
    navigation.navigate("Comments", { item });
  };
  const navigateToMap = (item) => {
    navigation.navigate("Map", { item });
  };

  useEffect(() => {
    if (route.params?.user) {
      console.log({ user: route.params.user });
    }
    if (route.params?.post) {
      setPosts((prev) => [...prev, route.params.post]);
    }
  }, [route.params?.post, route.params?.user]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={avatarUrl} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 13, fontWeight: "500" }}>NickName</Text>
          <Text style={{ fontSize: 11, fontWeight: "400" }}>
            {route?.params?.user?.email || "user@example.com"}
          </Text>
        </View>
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <Post
            pictureUrl={item.pictureUrl}
            pictureName={item.pictureName}
            comments={item.comments}
            locality={item.locality}
            geoLocation={item.geoLocation}
            navigateToComments={() => navigateToComments(item)}
            navigateToMap={() => navigateToMap(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.white,
    gap: 32,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.light_gray,
    backgroundColor: colors.light_gray,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
});

export default PostsScreen;
