import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SelectRandomThings from "./slecetRandomThingAndName.componnet";
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


const MainPage = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [textInputValue, setTextInputValue] = useState("");
  const [textList, setTextList] = useState([]);
  const [renderSelectRandomThing, setRenderSelectRandomThing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const catgroiesSelctor = route.params.title;
  const navigation = useNavigation();
  const [fetchedData, setFetchedData] = useState('');
  const [isNameListEmptyAfterPressing, setIsNameListEmptyAfterPressing] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const firestore = firebase.firestore();
        const collectionRef = firestore.collection("categories");
        const doc = await collectionRef.doc(catgroiesSelctor).get();
        if (doc.exists) {
          const data = doc.data();
          setFetchedData(data.items)
          // Process the data here if needed
        } else {
          console.log("Document not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const goToTheNextPage = () => {
    if (textList.length <= 2) {
      setIsNameListEmptyAfterPressing(false);
      console.log('empty')
    } else {
      setIsNameListEmptyAfterPressing(true);
      setRenderSelectRandomThing(true);
      
    }
  };

  const handleAddText = () => {
    if(textInputValue.trim() === '') {
      setErrorMessage('الرجاء اضافة اسم')
    } else {
      setModalVisible(false);
      setTextList([...textList, textInputValue]);
      setTextInputValue("");
      setErrorMessage('');
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setTextInputValue("");
    setErrorMessage('');
  };

  const handleRemoveText = (index) => {
    const list = [...textList];
    list.splice(index, 1);
    setTextList(list);
  };

  return (
    <View style={styles.container}>
      {renderSelectRandomThing ? (
        <SelectRandomThings Names={textList} data={fetchedData}/>
      ) : (
        <>
          <Text style={styles.title}>ادخل ثلاث اسماء على الاقل</Text>
          <ScrollView
            style={styles.containerScroll}
            contentContainerStyle={{ justifyContent: "center" }}
          >
            {textList.map((text, index) => (
              <View key={index} style={styles.textContainer}>
                <Text style={styles.text}>{text}</Text>
                <TouchableOpacity onPress={() => handleRemoveText(index)}>
                  <MaterialIcons name="remove" size={30} color="#ADD8E6" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <MaterialIcons name="person" size={30} color="#fff" />
          </TouchableOpacity>
          {isNameListEmptyAfterPressing === true ? <Text style={styles.error}>الرجاء اضافة اسماء</Text>: null}
          <TouchableOpacity
            style={styles.confiremButton}
            onPress={goToTheNextPage}
          >
            <Text style={styles.modalButtonText}>استمر</Text>
          </TouchableOpacity>
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>أضف اسماً جديداً</Text>
                {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
                <TextInput
                  style={styles.modalInput}
                  onChangeText={(text) => setTextInputValue(text)}
                  value={textInputValue}
                  />
                  <View style={styles.modalButtonsContainer}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.modalCancelButton]}
                    onPress={handleCancel}
                  >
                    <Text style={styles.modalButtonText}>الغاء</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.modalAddButton]}
                    onPress={handleAddText}
                  >
                    <Text style={styles.modalButtonText}>اضافة</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF0F5",
  },
  containerScroll: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFF0F5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  textContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ddd",
  },
  text: {
    fontSize: 16,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ADD8E6",
    justifyContent: "center",
    alignItems: "center",
  },
  confiremButton: {
    position: "absolute",
    bottom: 20,
    right: 150,
    width: 100,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#ADD8E6",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: Dimensions.get("window").width * 0.8,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  error: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10
  },
  modalInput: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    width: "40%",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  modalCancelButton: {
    backgroundColor: "#ccc",
  },
  modalAddButton: {
    backgroundColor: "#ADD8E6",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MainPage;
