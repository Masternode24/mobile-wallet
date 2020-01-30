import * as React from "react";
import { View, Text, StatusBar, SafeAreaView } from "react-native";
import { observable } from "mobx";
import { observer } from "mobx-react";
//import Store from "./Store.js";
import pages from "./Pages.js";
import styles from "./Styles.js";
import StartPage from "./pages/StartPage";
//import web3t from './web3t.js';
import Store from './wallet/data-scheme.js';
import web3 from './wallet/web3.js';
import { saved } from './wallet/seed.js';
//console.log(web3);

const store = observable(Store);
const web3t = web3(store);


const Main = observer(({ store }) => {
  const page = pages[store.current.page];
  if (!page) {
    return (
      <View style={{alignItems: 'stretch', justifyContent: 'center', flex: 1, backgroundColor: '#fff'}}>
        <Text>Page {store.current.page} not found</Text>
      </View>
    );
  }
  return page({ store, web3t });
});

const footerVisible = () => {
  store.footerVisible = false;
};


export default class AppReady extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: true
    };
  }

  componentDidMount() {
    store.current.page = saved === true ? "locked" : "register";


    if (true)  { // debug

      store.signUpInputMailField = "a.stegno@gmail.com";
      store.signUpInputPasswordField = "asdfasdf234234WWW";

    }
  }


  render() {
    if (this.state.ready === false) {
      return <StartPage store={store} />;
    }
    return (
      <Main store={store} />
    );
  }
}
