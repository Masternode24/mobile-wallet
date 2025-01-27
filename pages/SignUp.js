import React from "react";
import {
  Text,
  Button,
  View,
  Icon,
  Item,
  Body,
  Left,
  Right,
  Toast,
} from "native-base";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
} from "react-native";
import Constants from "expo-constants";
import styles from "../Styles.js";
import { set, check } from "../wallet/pin.js";
import Images from "../Images.js";
import getLang from "../wallet/get-lang.js";
import * as SecureStore from "expo-secure-store";
import PickerSetLang from "../components/PickerSetLang.js";
import Header from "../components/Header";
import Input from "../components/InputSecure";
import StatusBar from "../components/StatusBar.js";

const buttonActive = (store) => {
  const lang = getLang(store);

  const changePage = (tab) => () => {
    store.tab = tab;
  };

  const signup = async () => {
    if (store.current.signUpInputPinField.length < 6) {
      store.current.signUpInputPinField = "";
      return Toast.show({ text: lang.validPin });
    }
    await localStorage.clear();
    set(store.current.signUpInputPinField);
    check(store.current.signUpInputPinField);
    await SecureStore.deleteItemAsync("localAuthToken");
    store.current.page = "newseed";
    store.current.newseedstep = "ask";
    store.current.signUpInputPinField = "";
    // store.current.page = "locked";
  };

  return (
    <Button block style={styles.btnVelasActive} onPress={signup}>
      <Text style={styles.textBtn}>{lang.continue}</Text>
    </Button>
  );
};

const buttonInactive = (store) => {
  const lang = getLang(store);
  const notice = () => {
    if (store.current.signUpInputPinField.length < 6) {
      store.current.signUpInputPinField = "";
      return Toast.show({ text: lang.validPin });
    }
  }
  return (
    <Button block style={styles.buttonInactive} onPress={notice}>
      <Text style={styles.buttonTextInactive}>{lang.continue}</Text>
    </Button>
  );
};

// const logIn = store => {
//   const logInBtn = async () => {
//     if (get() !== store.current.signUpInputPinField) {
//       store.current.signUpInputPinField = "";
//       return;
//     }
//     store.current.page = "newseed";
//   };
//   return (
//     <Button transparent style={styles.arrowHeaderLeft} onPress={logInBtn}>
//       <Icon name="ios-arrow-back" style={styles.arrowIcon} />
//     </Button>
//   );
// };

export default ({ store }) => {
  const lang = getLang(store);
  const changePage = (tab, visible) => () => {
    store.tab = tab;
    store.footerVisible = visible;
    store.current.signUpInputPinField = null;
  };

  const regexPin = /[0-9a-zA-Z]{6,}/;
  const validInputPinSignUp =
    !store.current.signUpInputPinField ||
    regexPin.test(store.current.signUpInputPinField);

  const buttonsChangeSignUp =
    validInputPinSignUp && store.current.signUpInputPinField
      ? buttonActive
      : buttonInactive;

  const handleChangePin = async (text) => {
    store.current.signUpInputPinField = text;
    // store.current.pinSave = store.current.signUpInputPinField;
  };
  const inputSuccessPin = (store) => {
    return (
      <Item style={styles.borderItem}>
        <Icon active name="lock" style={{ color: "#fff" }} />
        <Input
          value={store.current.signUpInputPinField}
          onChangeText={(text) => handleChangePin(text)}
          placeholder={lang.placeholderSignup}
        />
      </Item>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={style.container}
    >
      <ImageBackground source={Images.bg} style={styles.image}>
        {/* <Header transparent /> */}
      <StatusBar />
        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={style.inner}>
            <View style={{ alignSelf: "center" }}>
              <Image source={Images.logo} style={[styles.styleLogo, { alignSelf: "center" }]} />
              <View style={styles.styleVersion}>
                <Text
                  style={[styles.styleTxtSeparator, { textAlign: "center" }]}
                >
                  v.{Constants.manifest.version}
                </Text>
              </View>
              <Text style={styles.textH1Seed}>{lang.setupPin}</Text>
            </View>
            <View style={style.paddingBlock}>
              {inputSuccessPin(store)}
              {/* {!validInputPinSignUp && (
              <Text style={styles.error}>{lang.validPin}</Text>
            )} */}
              <View style={styles.marginBtn}>{buttonsChangeSignUp(store)}</View>
            </View>
            <View style={styles.marginBtn1}>{PickerSetLang({ store, width: '100%', align: 'center' })}</View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 0.7,
    justifyContent: "center",
  },
  marginBtn: {
    alignItems: "center",
    width: "100%",
  },
  paddingBlock: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
