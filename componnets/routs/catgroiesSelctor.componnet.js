import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";


const data = [
  { id: 1, title: "الحيوانات", image:"https://images.unsplash.com/photo-1683143726325-ee14e56ab69c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=778&q=80"},
  { id: 2, title: "Photo 2", image: "https://images.unsplash.com/photo-1683143726325-ee14e56ab69c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=778&q=80" },
  { id: 3, title: "Photo 3", image: "https://images.unsplash.com/photo-1683143726325-ee14e56ab69c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=778&q=80" },
  { id: 4, title: "Photo 4", image: "https://images.unsplash.com/photo-1683143726325-ee14e56ab69c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=778&q=80" },
  { id: 5, title: "Photo 5", image: "https://images.unsplash.com/photo-1683143726325-ee14e56ab69c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=778&q=80" },
];

const Item = ({ title, image, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Image style={styles.image} source={{ uri: image }} />
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

const SelectPage = () => {
  const navigation = useNavigation();

  const goToTheNextPage = (title) => {
    navigation.navigate("SelectPage",  { title: title });
  };

  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      image={item.image}
      onPress={() => goToTheNextPage(item.title)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F5",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  item: {
    backgroundColor: "#e6e6e6",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    alignItems: "center",
    width: windowWidth - 32,
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    marginTop: 8,
    marginLeft: 16,
    fontWeight: "bold",
    color: "#333",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});

export default SelectPage;
