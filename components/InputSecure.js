import React, { useState } from "react";
import { Item, Input } from "native-base";
import styles from "../Styles.js";
import getLang from "../wallet/get-lang.js";
import Icon from "react-native-vector-icons/FontAwesome5";

export default ({placeholder, value, onChangeText, ...props}) => {
  const [hidePass, setHidePass] = useState(true);


  return (
    // <Item style={styles.borderItem}>
    //   <Icon active name="lock" style={{ color: "#fff" }} />
    <>
      <Input
        onChangeText={onChangeText}
        value={value}
        autoCompleteType="off"
        minLength={6}
        // autoFocus
        secureTextEntry={hidePass ? true : false}
        returnKeyType="done"
        placeholder={placeholder}
        keyboardType="default"
        placeholderTextColor="rgba(255,255,255,0.60)"
        style={styles.inputSize}
        selectionColor={"#fff"}
        keyboardAppearance="dark"
      />
      <Icon
        name={hidePass ? "eye-slash" : "eye"}
        size={15}
        color="white"
        onPress={() => setHidePass(!hidePass)}
      />
      </>
    // </Item>
  );
};
