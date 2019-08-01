import React from "react";
import { View, StyleSheet, Button, AsyncStorage, Alert } from "react-native";
import { GoogleSignin } from "react-native-google-signin";
import SnackContext from "../../../context/SnackContext";
import TextContent from "../TextContent";
import RadioBtn from "../RadioBtn";
import Header from "../Header";

const userPageStyle = StyleSheet.create({
  userParent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
});
class DisplaySnackToUser extends React.Component {
  static contextType = SnackContext;
  componentDidMount() {
    // this.context.checkIfUserSignedIn();
    //this.context.getPersistedData();
    this.context.getSnack();
    this.context.getVote();
  }

  render() {
    return (
      <SnackContext.Consumer>
        {context => (
          <View>
            <Button
              title="Sign Out"
              onPress={async () => {
                await context.signOut();

                this.props.navigation.navigate("LoginPage");
              }}
            />

            {context.currentUser && (
              <Header>{"Welcome " + context.currentUser.name}</Header>
            )}

            <View style={userPageStyle.userParent}>
              <TextContent>Today's snack</TextContent>
              <TextContent>{context.snackName}</TextContent>
              <TextContent>Would you like to have it?</TextContent>
              <RadioBtn />
              <Button
                title="Submit my Vote"
                onPress={() => {
                  context.storeVote();
                  //  this.props.navigation.navigate("LandingPage");
                }}
              />
            </View>
          </View>
        )}
      </SnackContext.Consumer>
    );
  }
}

export default DisplaySnackToUser;
