import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  StyleSheet,
} from "react-native";
import SelectRandomThings from "./slecetRandomThingAndName.componnet";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  collection,
  deleteDoc,
  getDocs
} from "firebase/firestore";

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Result = ({ Names, voteData, imposter, gotTheThing, data }) => {
  const [totalScores, setTotalScores] = useState({});
  const [showSelectRandomThings, setShowSelectRandomThings] = useState(false);
  const [showFinshButton, setShowFinshButton] = useState(true);

  useEffect(() => {
    calculateTotalScores();
  }, [voteData, imposter, gotTheThing]);

  const calculateTotalScores = async () => {
    const updatedScores = {};

    for (const name of Names) {
      let score = await fetchPlayerScore(name);

      voteData.forEach((vote) => {
        if (vote.username === name && vote.vote === imposter) {
          score += 100;
        }
      });
      if (gotTheThing && name === imposter) {
        score += 100;
      }

      updatedScores[name] = score;
    }

    setTotalScores(updatedScores);
  };

  const fetchPlayerScore = async (name) => {
    const scoreRef = doc(db, "scores", name);

    try {
      const scoreDoc = await getDoc(scoreRef);
      if (scoreDoc.exists()) {
        return scoreDoc.data().score;
      }
    } catch (error) {
      console.log("Error fetching score:", error);
    }

    return 0;
  };

  const handleNextButtonPress = async () => {
    for (const name of Names) {
      const score = totalScores[name]; // Use the updated score
      await uploadScoreToFirestore(name, score);
    }

    setShowSelectRandomThings(true);
  };

  const uploadScoreToFirestore = async (name, newScore) => {
    const scoreRef = doc(db, "scores", name);

    try {
      const scoreDoc = await getDoc(scoreRef);

      if (scoreDoc.exists()) {
        // Document exists, update the score
        const oldScore = scoreDoc.data().score || 0;
        const updatedScore = newScore;
        await updateDoc(scoreRef, { score: updatedScore });
      } else {
        // Document doesn't exist, create a new document with the score
        await setDoc(scoreRef, { score: newScore });
      }
    } catch (error) {
      console.log("Error updating score:", error);
    }
  };

  const handelFinshButtonPress = async () => {
    // Delete the "scores" collection
    const scoresCollectionRef = collection(db, "scores");
    const scoresSnapshot = await getDocs(scoresCollectionRef);

    scoresSnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    setShowFinshButton(false);
  };

  return (
    <>
      {!showSelectRandomThings ? (
        <View style={styles.container}>
          <Text style={styles.title}>النتائج</Text>
          <ScrollView
            style={styles.containerScroll}
            contentContainerStyle={{ justifyContent: "center" , alignItems: 'center'}}
            >
            {Names.map((name, index) => (
              <View key={index} style={styles.playerContainer}>
                <Text style={styles.score}>{totalScores[name]}</Text>
                <Text style={styles.playerName}>{name}</Text>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={handleNextButtonPress}>
            <Text style={styles.button}>التالي</Text>
          </TouchableOpacity>
          {showFinshButton ?  (
            <TouchableOpacity onPress={handelFinshButtonPress}>
              <Text style={styles.button}>انهاء اللعبة</Text>
            </TouchableOpacity>
          ): null}
        </View>
      ) : (
        <SelectRandomThings Names={Names} data={data}/>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F5",
    alignItems: "center",
    marginBottom: 30,
  },
  containerScroll: {
    flex: 1,
    alignContent: "center",
    width: '80%'
  },
  contentContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ADD8E6",
  },
  playerContainer: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",

    alignItems: "center",
    width: "70%",
  },
  score: {
    fontSize: 30,
    marginRight: 10,
  },
  playerName: {
    fontSize: 30,
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
});

export default Result;
