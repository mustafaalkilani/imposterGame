import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Result from "./results.componnet";

const SelectItem = ({ Names, array, imposter, item, voteData, data }) => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  const [renderOtherComponent, setRenderOtherComponent] = useState(false);
  const [gotTheThing, setGottheThing] = useState(false);
  const handleButtonPress = (name) => {
    setSelectedButton(name);
    if (name === item) {
      console.log("correct");
      setGottheThing(true);
    } else {
      console.log("you are bad");
      setGottheThing(false);
    }
    const timer = setTimeout(() => {
      setRenderOtherComponent(true);
    }, 4000);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.containerScroll}
        contentContainerStyle={{ justifyContent: "center" , alignItems: 'center'}}
      >
        {!renderOtherComponent && (
          <>
            <Text style={styles.name}>
              اخي الدخيل: {imposter} اختر الطبخة الصحيحة
            </Text>
            {array.map((oneArray) => (
              <TouchableOpacity
                key={oneArray}
                onPress={() => {
                  handleButtonPress(oneArray);
                  setButtonIsClicked(true);
                }}
              >
                <Text
                  style={[
                    styles.button,
                    buttonIsClicked && {
                      backgroundColor:
                        oneArray === item
                          ? "green"
                          : selectedButton === oneArray
                          ? "red"
                          : "#ADD8E6",
                    },
                  ]}
                >
                  {oneArray}
                </Text>
              </TouchableOpacity>
            ))}
          </>
        )}

        {renderOtherComponent && (
          <Result
            Names={Names}
            voteData={voteData}
            imposter={imposter}
            gotTheThing={gotTheThing}
            data={data}
          />
        )}
      </ScrollView>
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
    alignContent: "center",
  },
  button: {
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    color: "white",
    fontSize: 16,
    width: 150,
    height: 50,
    textAlign: "center",
    backgroundColor: "#ADD8E6",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
});

export default SelectItem;
