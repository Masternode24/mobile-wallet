import React from "react";
import {
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Button,
  View,
  Title,
  Icon,
  Content,
  Header
} from "native-base";
import styles from "../Styles.js";
import { ScrollView, StatusBar } from "react-native";
import StandardLinearGradient from "../components/StandardLinearGradient.js";
import RefreshControl from "../components/RefreshControl.js";
import Toast from "@rimiti/react-native-toastify";
// import StatusBar from "../components/StatusBar.js";

//
import dash from '../registry/dash.json';
import etc from '../registry/etc.json';
import eth from '../registry/eth.json';
import ltc from '../registry/ltc.json';
import usdt from '../registry/usdt.json';
import usdt_erc20 from '../registry/usdt_erc20.json';
import walletsFuncs from '../wallet/wallets-funcs.js';
//

const coinItems = [ dash, etc, eth, ltc, usdt, usdt_erc20 ];


const renderCoin = (store, web3t) => (item) => {

     const tokens = walletsFuncs(store, web3t).wallets.map((x) => x.coin.token);

     const addItem = () => {
        web3t.installQuick(item, (err, data) => {
            console.log("install", err, data);
            store.current.page = "wallets";
        })
     }

     const deleteItem = () => {
        web3t.uninstall(item.token, (err, data) => {
            store.current.page = "wallets";
        })  
     }

     const isAdded = tokens.indexOf(item.token) > -1;

     const currentAction = isAdded ? deleteItem : addItem;
     const currentIcon = isAdded ? "ios-remove" : "ios-add";


     return (
      <ListItem
          thumbnail
          style={styles.mbListItem}
          onPress={currentAction}
          key={item.token}
        >
          <Left>
            <Thumbnail source={{uri: item.image}} />
          </Left>
          <Body>
          <Text note/>
            <Text style={styles.amountView}>
              {item.token.toUpperCase()}
            </Text>
            <Text note/>
          </Body>
          <Right>
            <Button transparent onPress={currentAction}>
              <Icon name={currentIcon} style={styles.iconBtn} />
            </Button>
          </Right>
        </ListItem>
    )
  }



export default ({ store, web3t }) => {
  const changePage = (tab) => () => {
    store.current.page = tab;
  };

  const calcUsd = 0;
  const refreshToken = async bool => {

  };
  const checkType = type => {
    switch (type) {
      case "USD":
        return <Text style={styles.textCurrency}>$</Text>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.viewFlex}>
      {/* <StatusBar /> */}
      <StandardLinearGradient>
        <RefreshControl swipeRefresh={refreshToken}>
          <Header transparent style={styles.mtIphoneX}>
          <Left style={styles.viewFlex}>
            <Button
              transparent
              style={styles.arrowHeaderLeft}
              onPress={changePage("wallets")}
            >
              <Icon name="ios-arrow-back" style={[styles.arrowHeaderIconBlack, {color: '#fff'}]} />
            </Button>
          </Left>
            <Body style={styles.viewFlex}>
              <Title style={styles.title1}>Manage Wallets</Title>
            </Body>
            {/* <Right style={styles.viewFlex}><Button transparent><Icon name="ios-add" style={{color: '#fff'}}></Icon></Button></Right> */}
            <Right style={styles.viewFlex} />
          </Header>
          <StatusBar barStyle="light-content" />
        </RefreshControl>
      </StandardLinearGradient>
      <View style={styles.viewMonoWallets}>
        <View style={styles.viewPt} />
        <ScrollView>
          <Content>
            <List>
              {coinItems.map(renderCoin(store, web3t))}
            </List>
          </Content>
        </ScrollView>
      </View>
    </View>
  );
};
