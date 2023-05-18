import React, { useState } from "react";
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

const MainPage = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [textInputValue, setTextInputValue] = useState("");
  const [textList, setTextList] = useState([]);
  const [renderSelectRandomThing, setRenderSelectRandomThing] = useState(false);
  const catgroiesSelctor = route.params.title;
  const navigation = useNavigation();

  const goToTheNextPage = () => {
    setRenderSelectRandomThing(true);
  };

  const handleAddText = () => {
    setModalVisible(false);
    setTextList([...textList, textInputValue]);
    setTextInputValue("");
  };

  const handleCancel = () => {
    setModalVisible(false);
    setTextInputValue("");
  };

  const handleRemoveText = (index) => {
    const list = [...textList];
    list.splice(index, 1);
    setTextList(list);
  };

  return (
    <View style={styles.container}>
      {renderSelectRandomThing ? (
        <SelectRandomThings Names={textList}/>
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
    marginBottom: 20,
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
