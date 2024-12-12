import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const MapScreen = ({ route }) => {
  const { item } = route.params;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: item?.geoLocation?.latitude ?? 0,
          longitude: item?.geoLocation?.longitude ?? 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={15}
        onMapReady={() => console.log("onMapReady")}
        onRegionChange={() => console.log("onMapReady")}
      >
        <Marker
          title={item?.pictureName}
          coordinate={{
            latitude: item?.geoLocation?.latitude ?? 0,
            longitude: item?.geoLocation?.longitude ?? 0,
          }}
          description={item?.locality}
        />
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  mapStyle: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});
export default MapScreen;
