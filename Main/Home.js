/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import WrapperScreen from '../Resuables/WrapperScreen';
import {colors} from '../Resuables/frequentColors';
import {Measurements} from '../Resuables/Measurement';
import {Avatar} from 'react-native-elements';
import Data from '../dummyData';
import Loop from '../Resuables/looping';
import Entypo from 'react-native-vector-icons/Entypo';
import RefNavigation from '../Resuables/RefNavigation';
import {connect} from 'react-redux';
import {setCurrentProductAction} from '../reduxStore/actions';
import Image from 'react-native-fast-image';
import Icon from '../pics/icon.jpg';
import SearchBar from '../Resuables/searchingBar';

function Home(props) {
  useEffect(() => {
    changeTab(Data.catagory[0]);
  }, []);
  const [categories, setCategories] = useState(Data.catagory);
  const [currentCat, setCurrentCat] = useState(Data.catagory[0]);
  const [tabProducts, setTabProducts] = useState([]);

  const changeTab = (tab) => {
    setCurrentCat(tab);
    const filteredProducts = Data.product.filter(
      (item) => item.catagoryId === tab.id,
    );
    setTabProducts(filteredProducts);
  };

  const GotoSearch = () => RefNavigation.Navigate('SearchStones');
  const GoToFavourites = () => RefNavigation.Navigate('Favourite');
  const GoToSingleProduct = (item) => {
    props.setCurrentProductAction(item);
    RefNavigation.Navigate('SingleProduct');
  };
  return (
    <WrapperScreen style={{backgroundColor: colors.lightGrey4}}>
      <ScrollView bounces={false} style={{flex: 1}}>
        <View style={styles.H_1}>
          <TouchableOpacity onPress={GoToFavourites}>
            <Entypo
              name="heart-outlined"
              color={colors.primary}
              size={Measurements.height * 0.035}
            />
          </TouchableOpacity>
          <View style={{width: '70%'}}>
            <Text style={styles.H_2}>Location</Text>
            <Text style={styles.H_3}>San Francisco CA 94133</Text>
          </View>
          <View>
            <Avatar rounded size={Measurements.height * 0.05} source={Icon} />
          </View>
        </View>
        <TouchableOpacity style={styles.SearchBarWrapper} onPress={GotoSearch}>
          <SearchBar editable={false} />
        </TouchableOpacity>
        <View style={styles.listingWrapper}>
          <Loop
            data={categories}
            renderItem={({item}) => (
              <Tabs item={item} currentCat={currentCat} changeTab={changeTab} />
            )}
          />
        </View>
        <View style={styles.divider}>
          <View style={styles.divider2} />
        </View>
        <View style={{marginVertical: Measurements.height * 0.015}}>
          {tabProducts.length > 0 && (
            <Loop
              horizontal={false}
              data={tabProducts}
              renderItem={({item}) => (
                <FilteredTile
                  item={item}
                  GoToSingleProduct={GoToSingleProduct}
                />
              )}
            />
          )}
        </View>
      </ScrollView>
    </WrapperScreen>
  );
}

const Tabs = ({item, currentCat, changeTab}) => {
  return (
    <TouchableOpacity
      style={styles.HomeTabsWrapper}
      onPress={() => changeTab(item)}>
      <View
        style={{
          ...styles.tab1,
          backgroundColor:
            item.catagoryName === currentCat.catagoryName
              ? colors.primary
              : colors.secondary,
        }}>
        <Image
          source={
            item.catagoryName === currentCat.catagoryName
              ? item.iconsW
              : item.iconsG
          }
          style={styles.tab2}
        />
      </View>
      <Text
        style={{
          ...styles.HomeTabsText,
          color:
            item.catagoryName === currentCat.catagoryName
              ? colors.primary
              : colors.primary,
          opacity: item.catagoryName === currentCat.catagoryName ? 1 : 0.6,
          fontSize:
            item.catagoryName === currentCat.catagoryName
              ? Measurements.width * 0.045
              : Measurements.width * 0.04,
        }}>
        {item.catagoryName}
      </Text>
    </TouchableOpacity>
  );
};

export const FilteredTile = ({item, GoToSingleProduct}) => {
  return (
    <TouchableOpacity
      onPress={() => GoToSingleProduct(item)}
      style={styles.FT_1}>
      <View style={styles.FT_2}>
        <View style={styles.FT_3}>
          <Text style={styles.FT_4}>{item.productName}</Text>
          <Text style={styles.FT_5}>{item.address}</Text>
        </View>
        <Text style={styles.FT_6}>${item.price}</Text>
      </View>
      <View style={styles.FT_7}>
        <ImageBackground
          source={item.images}
          style={styles.FT_8}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  FT_8: {
    width: Measurements.width * 0.27,
    height: Measurements.height * 0.158,
  },
  FT_7: {
    backgroundColor: colors.lightBackground2,
    borderRadius: 11,
    position: 'absolute',
    height: '100%',
    width: Measurements.width * 0.33,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  FT_6: {
    color: colors.primary,
    fontSize: Measurements.width * 0.048,
    fontWeight: 'bold',
  },
  FT_5: {
    width: Measurements.width * 0.5,
    color: colors.primary,
    fontSize: Measurements.width * 0.038,
    fontWeight: 'bold',
    opacity: 0.6,
    marginVertical: Measurements.height * 0.015,
  },
  FT_4: {
    width: Measurements.width * 0.5,
    color: colors.primary,
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Didot-Bold',
  },
  FT_3: {
    width: Measurements.width * 0.5,
    minHeight: Measurements.height * 0.15,
    height: Measurements.height * 0.15,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  FT_2: {
    borderRadius: 11,
    backgroundColor: colors.secondary,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingBottom: Measurements.width * 0.03,
    paddingRight: Measurements.width * 0.03,
    paddingTop: Measurements.height * 0.02,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  FT_1: {
    width: Measurements.width * 0.91,
    height: Measurements.height * 0.25,
    paddingVertical: Measurements.width * 0.04,
    paddingLeft: Measurements.width * 0.05,
    position: 'relative',
    marginTop: Measurements.width * 0.05,
  },
  tab2: {
    width: Measurements.width * 0.15,
    height: Measurements.width * 0.15,
  },
  tab1: {
    padding: Measurements.width * 0.02,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  H_3: {
    textAlign: 'center',
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  H_2: {
    textAlign: 'center',
    color: colors.primary,
    opacity: 0.6,
    fontWeight: 'bold',
  },
  H_1: {
    width: '100%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Measurements.width * 0.06,
    paddingVertical: Measurements.height * 0.02,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  SearchBarWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Measurements.height * 0.003,
  },
  HomeTabsText: {
    fontWeight: 'bold',
  },
  HomeTabsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: Measurements.width * 0.03,
    paddingHorizontal: Measurements.width * 0.02,
    paddingTop: Measurements.width * 0.02,
  },
  divider2: {
    borderColor: colors.lightGrey3,
    borderWidth: 1,
    width: '60%',
  },
  divider: {display: 'flex', alignItems: 'center', marginTop: 5},
});

export default connect(null, {setCurrentProductAction})(Home);
