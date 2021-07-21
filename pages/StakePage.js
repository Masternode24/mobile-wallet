import React from "react";
import { Container, Text, Content, List, ListItem, Grid, Col, Row} from "native-base";
import Footer from "./Footer.js";
import { StyleSheet, Dimensions, View, RefreshControl, ActivityIndicator, Modal, Platform } from "react-native";
import { Observer } from "mobx-react"
import getLang from "../wallet/get-lang.js";
import Images from "../Images.js";
import StakeItem from "../components/StakeItem.js";
import Header from "../components/Header.js";
import StakeBar from "../components/StakeBar.js";
// import Spinner from "../components/Spinner.js";
import { SkypeIndicator } from 'react-native-indicators';

export default ({ store, web3t, props }) => {
  const { stakingStore } = store;
  const changePage = (tab, validatorAddress) => () => {
    stakingStore.openedValidatorAddress = validatorAddress;
    store.current.page = tab;
  };

  // if (!stakingStore.validators) {
  //   return <Spinner/>;
  // }


  // if (stakingStore.isRefreshing) {
  //   const lang = getLang(store);
  //   return (
  //   <>
  //     <Container>
  //       <Header title={lang.titleStake || "Stake"} />
  //         <View style={style.modalBackground}>
  //           <View style={[style.activityIndicatorWrapper, {backgroundColor: "#ffffff30"}]}>
  //             <ActivityIndicator color={"white"} size={'large'}/>
  //           </View>
  //         </View>
  //       <Footer store={store}></Footer>
  //     </Container>
  //   </>
  //   )
  // }

  const lang = getLang(store);

  const EmptyList = () => {
    return (
      <View style={style.listItemStyle}>
        <Text style={style.styleSubTitle}>{lang.nothingToShow}</Text>
      </View>
    );
  };
  const refreshStakeItem = () => {
    stakingStore.reloadWithRetry();
  };
  
  return (
    <Container>
      <Header title={lang.titleStake || "Stake"} />
      <StakeBar/>
      <Content style={{ backgroundColor: Images.velasColor4 }}
      refreshControl={
        <RefreshControl
        refreshing={false}
        onRefresh={refreshStakeItem}
        tintColor="transparent"
        />
      }
      >
        <Observer>{() => {
          const filterStake = stakingStore.getStakedValidators();
          const filterTotalStaked = stakingStore.getNotStakedValidators();

          if (!filterStake || !filterTotalStaked || stakingStore.isRefreshing) {
            return (
              <Content contentContainerStyle={{flex: 1, alignItems: 'center',}}  >
                <View style={{marginTop: 10}}>
                  <SkypeIndicator color={"white"}/>
                </View>
              </Content>
            );
          }
          const renderItemsMyStake = filterStake.map((el) => (
            <StakeItem
              key={el.address}
              typeBadge={el.status}
              address={el.address}
              myStake={el.myStake}
              apr={el.apr}
              onPress={changePage("detailsValidator", el.address)}
              store={store}
              isStaked
            />
          ));
          const renderItemsTotalValidators = filterTotalStaked.map((el) => (
            <StakeItem
              key={el.address}
              typeBadge={el.status}
              address={el.address}
              totalStaked={el.activeStake}
              apr={el.apr}
              onPress={changePage("detailsValidator", el.address)}
              store={store}
            />
          ));
          return (
            <List key={Date.now()}>
              <ListItem itemHeader noBorder>
                <Text style={style.titleText}>
                  {lang.itemStakedTitle || "Staked Validators"}
                </Text>
              </ListItem>
              {!renderItemsMyStake.length ? <EmptyList /> : renderItemsMyStake}
              <ListItem itemHeader noBorder>
                <Text style={style.titleText}>
                  {lang.itemValidatorsTitle || "Other Validators"}
                </Text>
              </ListItem>
              {!renderItemsTotalValidators.length ? <EmptyList /> : renderItemsTotalValidators}
            </List>
          )
        }}</Observer>
      </Content>
      <Footer store={store}></Footer>
    </Container>
  );
};

const style = StyleSheet.create({
  titleText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Fontfabric-NexaBold",
    // marginRight: 10
  },
  listItemStyle: {
    marginHorizontal: 20,

    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  styleSubTitle: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Fontfabric-NexaRegular",
  },
  modalBackground: {
    flex: 1,
    // alignItems: "center",
    // flexDirection: "row",
    // justifyContent: "center",
    backgroundColor: Images.velasColor4
  },
  activityIndicatorWrapper: {
    flex: 1,
    backgroundColor: "#00000030",
    height: 100,
    width: 100,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  containerIndicator: {
    flex: 1,
    justifyContent: "center"
  },
  horizontalIndicator: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }

});
