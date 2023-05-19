import React, { useEffect, useState } from "react";
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
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Add your Firebase configuration here
const firebaseConfig = {
  apiKey: "AIzaSyCDLZBgltvio0vF_nSnVDX03Z9IDtkYQMU",
  authDomain: "outofcook.firebaseapp.com",
  projectId: "outofcook",
  storageBucket: "outofcook.appspot.com",
  messagingSenderId: "755923868479",
  appId: "1:755923868479:web:b52ba752211030994a918a",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use the existing app
}

const SelectPage = () => {
  const navigation = useNavigation();
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
    const fetchFirestoreData = async () => {
      try {
        const firestore = firebase.firestore();
        const collectionRef = firestore.collection("dataform");

        const snapshot = await collectionRef.get();
        const data = snapshot.docs.map((doc) => doc.data());

        setFetchedData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFirestoreData();
  }, []);

  const goToTheNextPage = (title) => {
    navigation.navigate("SelectPage", { title: title });
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
        data={fetchedData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const Item = ({ title, image, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Image style={styles.image} source={{ uri: image }} />
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

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
