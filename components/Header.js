import React from "react";
  import { Container, Header, Left, Body, Right, Title, Icon, Button, Thumbnail, Text} from "native-base";
import IdentIcon from "../components/Identicon.js";
import BackButton from "../components/BackButton.js";
import StatusBar from "../components/StatusBar.js";
import styles from "../Styles.js";

export default (props) => {
  return (
    <>
      <Header style={[props.transparent ? {backgroundColor: "transparent", borderBottomColor: "transparent"} : styles.headerBg, styles.marginTopAndroid]} androidStatusBarColor="black" noShadow={false}>
        <Left>
          {props.onBack && (
            <BackButton onBack={props.onBack} style={props.greenBack ? styles.leftBtnColor : {color: "#fff"}} />
            )}
        </Left>
        <Body>
          <Title style={props.smallTitle ? styles.headerTitleSmall : styles.headerTitle}>{props.title}</Title>
        </Body>
        <Right>
          {props.identIcon && (
            <IdentIcon
            {...props}
            address={props.identIcon}
            size={20}
            backgroundColor={"rgba(22, 26, 63, 1)"}
            //   marginRight={15}
            />
            )}
          {props.addWalletIcon && (
            <Button
            transparent
            onPress={props.onForward}
            >
              <Icon name="md-create" style={styles.refreshHeaderIcon} />
            </Button>
          )}
          {props.coin && (
            <Thumbnail square small source={{uri: props.coin}} />
            
            )}
        </Right>
      </Header>
      <StatusBar />
    </>
  );
};
