/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import WrapperScreen from '../Resuables/WrapperScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SearchBar from '../Resuables/searchingBar';
import Data from '../dummyData';
import {Measurements} from '../Resuables/Measurement';
import {colors} from '../Resuables/frequentColors';
import NavigationRef from '../Resuables/RefNavigation';
import {FilteredTile} from './Home';
import {connect} from 'react-redux';
import {setCurrentProductAction} from '../reduxStore/actions';

function Search(props) {
  useEffect(() => {
    // RenderTiles(Data.catagory);
  }, []);
  const [searchText, setSearchText] = useState('');

  const RenderSearchedResult = () => {
    var SearchedItems = Data.product.filter((item) =>
      item.productName.toLowerCase().includes(searchText.toLowerCase()),
    );
    return SearchedItems.length === 0 ? (
      <Text style={{fontWeight: 'bold'}}>No Stones Found...</Text>
    ) : (
      RenderTiles(SearchedItems)
    );
  };

  const RenderTiles = (Arr) => {
    return Arr.map((item) => (
      <FilteredTile
        key={item.id}
        item={item}
        GoToSingleProduct={GoToSingleProduct}
      />
    ));
  };

  const GoToSingleProduct = (item) => {
    props.setCurrentProductAction(item);
    NavigationRef.Navigate('SingleProduct');
  };

  const goBack = () => NavigationRef.GoBack();

  const changeSearchText = (t) => setSearchText(t);
  return (
    <WrapperScreen style={{backgroundColor: colors.lightGrey4}}>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={goBack}>
            <AntDesign
              name="arrowleft"
              color={colors.darkGray}
              size={Measurements.width * 0.08}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.SearchBarWrapper}>
          <SearchBar changeSearchText={changeSearchText} />
        </View>
        <View style={styles.TilesWrapper}>
          {searchText !== ''
            ? RenderSearchedResult()
            : RenderTiles(Data.product)}
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

export default connect(null, {setCurrentProductAction})(Search);

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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  SearchBarWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Measurements.height * 0.003,
  },
  container: {flex: 1},
});
