/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import WrapperScreen from '../Resuables/WrapperScreen';
import {Measurements} from '../Resuables/Measurement';
import NavigationRef from '../Resuables/RefNavigation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SearchBar from '../Resuables/searchingBar';
import Data from '../dummyData';
import {MyFilteredTile} from './Home';
import {connect} from 'react-redux';
import {
  setFavAction,
  removeFavAction,
  setCurrentProductAction,
} from '../reduxStore/actions';
import UseHeader from '../Resuables/MyHeader';

function Search(props) {
  const [searchText, setSearchText] = useState('');

  const RenderSearchedResult = () => {
    var SearchedItems = Data.product.filter((item) =>
      item.productName.toLowerCase().includes(searchText.toLowerCase()),
    );
    return SearchedItems.length === 0 ? (
      <Text style={{fontWeight: 'bold'}}>No Search Found...</Text>
    ) : (
      CardRender(SearchedItems)
    );
  };

  const MyGoToSingleProduct = (item) => {
    props.setCurrentProductAction(item);
    NavigationRef.Navigate('SingleProduct');
  };

  const CardRender = (Arr) => {
    return Arr.map((item) => (
      <MyFilteredTile
        key={item.id}
        item={{...item}}
        MyGoToSingleProduct={MyGoToSingleProduct}
        currentCat={{
          catagoryName:
            Data.catagory[parseInt(item.catagoryId) - 1].catagoryName,
        }}
      />
    ));
  };
  const MyGoBack = () => NavigationRef.GoBack();

  const changeSearchText = (t) => setSearchText(t);
  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <UseHeader
        leftIcon={AntDesign}
        Title="SEARCH"
        leftIconName="arrowleft"
        leftIconAction={MyGoBack}
      />
      <View style={styles.SearchBarWrapper}>
        <View style={{width: '85%'}}>
          <SearchBar changeSearchText={changeSearchText} />
        </View>
      </View>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.TilesWrapper}>
          {searchText !== ''
            ? RenderSearchedResult()
            : CardRender(Data.product)}
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => ({
  favs: state.toggleFav,
});

export default connect(mapStateToProps, {
  setCurrentProductAction,
  setFavAction,
  removeFavAction,
})(Search);

const styles = StyleSheet.create({
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: Measurements.width * 0.03,
    paddingVertical: Measurements.height * 0.018,
  },
  TilesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  SearchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Measurements.height * 0.003,
  },
  container: {flex: 1},
});
