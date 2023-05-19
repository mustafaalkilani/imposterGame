import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Vibration,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import SelectItem from './selecteItem.componnet';

const Countdown = ({ duration, imposter, names, array, item, voteData, data }) => {
  const [remainingTime, setRemainingTime] = useState(duration);
  const [countdownFinished, setCountdownFinished] = useState(false);
  const [renderOtherComponent, setRenderOtherComponent] = useState(false);
  useEffect(() => {
    let intervalId;

    if (remainingTime > 0) {
      intervalId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setCountdownFinished(true);
      const pattern = [1000, 500, 1000, 500, 1000];
      Vibration.vibrate(pattern, true);

      setTimeout(() => {
        // After a delay, stop the vibration and show the animation
        Vibration.cancel();
        // Perform any additional logic or state updates before showing the animation
      }, 5000); // Adjust the delay as needed
    }

    return () => {
      clearInterval(intervalId);
      Vibration.cancel(); // Cancel the vibration when the component is unmounted
    };
  }, [remainingTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${seconds}`;
  };

  return (
    <>
    {!renderOtherComponent ? (
      <>
      <View style={styles.container}>
        {countdownFinished ? (
          <Animatable.View
            animation="fadeIn"
            duration={1000}
            style={styles.animationContainer}
          >
            <>
              <Text style={styles.animationText}>الي برا الطبخة هو :</Text>
              <Text style={styles.animationTextImposter}>{imposter}</Text>
              <TouchableOpacity
                onPress={() => {
                  // Perform the desired action on button press
                  setRenderOtherComponent(true);
                }}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <Text style={styles.button}>التالي</Text>
              </TouchableOpacity>
            </>
          </Animatable.View>
        ) : (
          <Text style={styles.countdownText}>{formatTime(remainingTime)}</Text>
        )}
      </View>
      </>
    ): <SelectItem Names={names} array={array} imposter={imposter} item={item} voteData={voteData} data={data}/>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  countdownText: {
    fontSize: 56,
    fontWeight: "bold",
    color: "#FFA07A",
  },
  animationText: {
    fontSize: 31,
    fontWeight: "bold",
    color: "#FFA07A",
  },
  animationTextImposter: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#ADD8E6",
    textAlign: "center",
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

export default Countdown;
