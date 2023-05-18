import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainPage from "./componnets/routs/mainPage.componnet";
import SelectPage from "./componnets/routs/catgroiesSelctor.componnet";
const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#FFF0F5", // Set your desired background color here
            },
            headerTintColor: "#000000", // Set the text color of the header
            headerTitleStyle: {
              fontWeight: "bold", // Set the font weight of the header title
            },
          }}
        >
          <Stack.Screen
            name="selectPage"
            component={SelectPage}
            options={{ title: "اختر التصنيف" }}
          />
          <Stack.Screen
            name="SelectPage"
            component={MainPage}
            options={{ title: "الاسماء" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
