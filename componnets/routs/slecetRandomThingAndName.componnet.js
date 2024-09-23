import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Countdown from "./countdown.componnet";

const SelectRandomThings = ({ Names, data }) => {
  const [randomIndex, setRandomIndex] = useState(null);
  const [listDone, setListDone] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredNames = Names.filter((_, index) => index !== currentIndex);

  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  const [randomAnimal, setRandomAnimal] = useState("");
  const [randomNameForQ, setRandomNameForQ] = useState(
    Math.floor(Math.random() * Names.length)
  );
  const [getQPage, setGetQPage] = useState(false);
  const [getVote, setGetVote] = useState(false);
  const [showTheImposterPage, setShowTheImposterPage] = useState(false);
  const [imposter, setImposter] = useState("");
  const [randomAnimalList, setRandomAnimalList] = useState([]);
  const [voteData, setVoteData] = useState([]);
  const randomAnimals = [];
  const randomIndices = [];
  const navigation = useNavigation();

  const animals = data;



  const getRandomAnimals = () => {
    let lastRandomAnimalIndex;

    while (randomAnimals.length < 10) {
      const randomIndex = Math.floor(Math.random() * animals.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
        randomAnimals.push(animals[randomIndex]);
        lastRandomAnimalIndex = randomIndex;
      }
    }

    // Set the last random animal as the selected animal
    const selectedAnimal = randomAnimals[lastRandomAnimalIndex];

    return {
      randomAnimals,
      selectedAnimal,
    };
  };

  useEffect(() => {
    const { randomAnimals } = getRandomAnimals();
    const randomIndexForAnimal = Math.floor(
      Math.random() * randomAnimals.length
    );
    setRandomAnimal(randomAnimals[randomIndexForAnimal]);
    setRandomAnimalList(randomAnimals);
  }, []);

  useEffect(() => {
    const getRandomIndex = () => {
      let index;
      do {
        index = Math.floor(Math.random() * Names.length);
      } while (index === randomIndex);
      setRandomIndex(index);
    };

    getRandomIndex();
  }, [Names]);

  useEffect(() => {
    let newRandomNameForQ;
    do {
        newRandomNameForQ = Math.floor(Math.random() * Names.length);
    } while (newRandomNameForQ === currentIndex);
    
    setRandomNameForQ(newRandomNameForQ);
}, [randomNameForQ]);

  const handleNextPress = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < Names.length) {
      setCurrentIndex(nextIndex);
    } else {
      setListDone(true);
      setCurrentIndex(0);
    }
  };
  const handleNextPressQ = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < Names.length) {
      let randomIndexForQ;

      // Generate a random index different from currentIndex and randomNameForQ
      do {
        randomIndexForQ = Math.floor(Math.random() * Names.length);
      } while (
        randomIndexForQ === currentIndex ||
        randomIndexForQ === randomNameForQ ||
        randomIndexForQ === nextIndex
      );

      setRandomNameForQ(randomIndexForQ);
      setCurrentIndex(nextIndex);
    } else {
      setGetQPage(true);
      setCurrentIndex(0);
    }
  };

  const handleButtonPress = (name) => {
    const selectedName = Names.indexOf(name);
    setCurrentIndex(selectedName);
  };

  const handelVoteButtonPress = (name, pressedButtonName) => {
    setVoteData([...voteData, { username: name, vote: pressedButtonName }]);
    // Upload the voteData object or perform any other desired action with it
    const nextIndex = currentIndex + 1;
    if (nextIndex < Names.length) {
      let randomIndexForQ;
      setImposter(Names[randomIndex]);

      // Generate a random index different from currentIndex and randomNameForQ
      do {
        randomIndexForQ = Math.floor(Math.random() * Names.length);
      } while (
        randomIndexForQ === currentIndex ||
        randomIndexForQ === randomNameForQ ||
        randomIndexForQ === nextIndex
      );

      setRandomNameForQ(randomIndexForQ);
      setCurrentIndex(nextIndex);
    } else {
      setShowTheImposterPage(true);
    }
  };

  return (
    <View style={styles.container}>
      {buttonIsClicked ? (
        <>
          <Text style={styles.name}>{Names[currentIndex]}</Text>
          <Text style={styles.name}>
            {currentIndex === randomIndex ? "برا الطبخة" : "جوا الطبخة"}
          </Text>
          <Text style={styles.name}>
            {currentIndex === randomIndex
              ? "احزر الطبخة يا بطل"
              : `الطبخة: ${randomAnimal}`}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setButtonIsClicked(false);
              handleNextPress();
            }}
          >
            <Text style={styles.button}>التالي</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {listDone ? (
            <>
              {getQPage ? (
                <>
                  {getVote ? (
                    <>
                      {showTheImposterPage ? (
                        <>
                          <Countdown
                            duration={5}
                            imposter={imposter}
                            names={Names}
                            array={randomAnimalList}
                            item={randomAnimal}
                            voteData={voteData}
                            data={data}
                          />
                        </>
                      ) : (
                        <ScrollView
                          style={styles.containerScroll}
                          contentContainerStyle={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text style={styles.title}>صوت عزيزي</Text>
                          <Text style={styles.name}>
                            المّكون {Names[currentIndex]} صوت
                          </Text>
                          {Names.map((name, index) => {
                            if (index !== currentIndex) {
                              return (
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => {
                                    handelVoteButtonPress(
                                      Names[currentIndex],
                                      name
                                    );
                                  }}
                                >
                                  <Text style={styles.button}>{name}</Text>
                                </TouchableOpacity>
                              );
                            } else {
                              return null;
                            }
                          })}
                        </ScrollView>
                      )}
                    </>
                  ) : (
                    <>
                      {currentIndex === Names.length ? (
                        <Text style={styles.title}>Done</Text>
                      ) : (
                        <ScrollView
                          style={styles.containerScroll}
                          contentContainerStyle={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text style={styles.title}> اسأل الي بدك ياه</Text>
                          <Text style={styles.name}>
                            المّكون {Names[currentIndex]} اسأل
                          </Text>
                          {filteredNames.map((name, index) => (
                            <TouchableOpacity
                              key={index}
                              onPress={() => {
                                handleButtonPress(name);
                              }}
                            >
                              <Text style={styles.button}>{name}</Text>
                            </TouchableOpacity>
                          ))}
                          <TouchableOpacity
                            onPress={() => {
                              setCurrentIndex(0);
                              setGetVote(true);
                            }}
                          >
                            <Text style={styles.buttonVotePage}>
                              صوت يا سيدي
                            </Text>
                          </TouchableOpacity>
                        </ScrollView>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  <Text style={styles.title}>وقت الاسئلة</Text>
                  <Text style={styles.name}>
                    المّكون {Names[currentIndex]} اسأل المّكون{" "}
                    {Names[randomNameForQ]}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      handleNextPressQ();
                    }}
                  >
                    <Text style={styles.button}>التالي</Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          ) : (
            <>
              <Text style={styles.title}>{Names[currentIndex]}</Text>
              <Text
                style={styles.name}
              >{`اعطي الهاتف الى ${Names[currentIndex]} اكبس التالي عشان تعرف انت اذا جوا الطبخة ولا لا`}</Text>
              <TouchableOpacity
                onPress={() => {
                  setButtonIsClicked(true);
                }}
              >
                <Text style={styles.button}>التالي</Text>
              </TouchableOpacity>
            </>
          )}
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
  button: {
    borderRadius: 15,
    backgroundColor: "#ADD8E6",
    padding: 10,
    marginVertical: 10,
    color: "white",
    fontSize: 16,
    width: 150,
    height: 50,
    textAlign: "center",
  },
  buttonVotePage: {
    borderRadius: 15,
    backgroundColor: "#ADD8E6",
    padding: 10,
    marginVertical: 40,
    color: "white",
    fontSize: 16,
    width: 200,
    height: 50,
    textAlign: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
    color: "#ADD8E6",
  },
  message: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: "red",
  },
});

export default SelectRandomThings;
