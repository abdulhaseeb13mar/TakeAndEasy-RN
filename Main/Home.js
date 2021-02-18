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
import Data from '../dummyData';
import Loop from '../Resuables/looping';
import RefNavigation from '../Resuables/RefNavigation';
import {connect} from 'react-redux';
import {setCurrentProductAction} from '../reduxStore/actions';
import UseHeader from '../Resuables/MyHeader';
import Feather from 'react-native-vector-icons/Feather';

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
  const GotoCart = () => RefNavigation.NavigateAndReset('MyCart');
  const MyGoToSingleProduct = (item) => {
    props.setCurrentProductAction(item);
    RefNavigation.Navigate('SingleProduct');
  };
  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <ScrollView bounces={false} style={{flex: 1}}>
        <UseHeader
          leftIcon={Feather}
          leftIconName="shopping-bag"
          leftIconAction={GotoCart}
          rightIconAction={GotoCart}
          rightIcon={Feather}
          rightIconName="search"
          Title="Take and Easy"
        />
        <Text
          style={{
            // ...border,
            paddingLeft: Measurements.width * 0.04,
            fontSize: Measurements.width * 0.065,
            fontWeight: 'bold',
          }}>
          Let's Eat
        </Text>
        <Text
          style={{
            // ...border,
            paddingLeft: Measurements.width * 0.04,
            fontSize: Measurements.width * 0.065,
            fontWeight: 'bold',
          }}>
          {currentCat.catagoryName}
        </Text>
        <View style={styles.listingWrapper}>
          <Loop
            data={categories}
            renderItem={({item}) => (
              <Tabs item={item} currentCat={currentCat} changeTab={changeTab} />
            )}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              backgroundColor: colors.primary,
              color: 'white',
              fontSize: Measurements.width * 0.06,
              paddingHorizontal: Measurements.width * 0.05,
              paddingVertical: Measurements.height * 0.008,
              borderTopRightRadius: 50,
              borderBottomRightRadius: 50,
            }}>
            Special {currentCat.catagoryName}
          </Text>
        </View>
        <View style={{marginVertical: Measurements.height * 0.015}}>
          {tabProducts.length > 0 &&
            tabProducts.map((item, index) => {
              return (
                <MyFilteredTile
                  key={index}
                  item={item}
                  currentCat={currentCat}
                  MyGoToSingleProduct={MyGoToSingleProduct}
                />
              );
            })}
        </View>
      </ScrollView>
    </WrapperScreen>
  );
}

const Tabs = ({item, currentCat, changeTab}) => {
  return (
    <TouchableOpacity
      onPress={() => changeTab(item)}
      style={{
        ...styles.HomeTabsWrapper,
        backgroundColor:
          item.catagoryName === currentCat.catagoryName
            ? colors.primary
            : colors.lightGrey4,
      }}>
      <ImageBackground
        source={item.images}
        style={{
          width: Measurements.width * 0.38,
          height: Measurements.height * 0.15,
        }}
        resizeMode="contain"
      />
      <View
        style={{
          width: '100%',
          height: Measurements.height * 0.15,
          position: 'relative',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Text
          style={{
            alignSelf: 'stretch',
            width: Measurements.height * 0.15,
            textAlign: 'center',
            transform: [{rotate: '270deg'}],
            fontWeight: 'bold',
            fontSize: Measurements.width * 0.045,
            color:
              item.catagoryName === currentCat.catagoryName ? 'white' : 'black',
          }}>
          {item.catagoryName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const MyFilteredTile = ({item, MyGoToSingleProduct, currentCat}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Measurements.height * 0.02,
      }}>
      <TouchableOpacity
        onPress={() => MyGoToSingleProduct(item)}
        style={{
          borderWidth: 1,
          // paddingVertical: Measurements.height * 0.02,
          paddingLeft: Measurements.width * 0.03,
          width: Measurements.width * 0.85,
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          elevation: 4,
          borderColor: colors.lightBackground,
          overflow: 'hidden',
        }}>
        <View
          style={{
            width: '66%',
            alignSelf: 'stretch',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}>
          <View style={{width: '100%'}}>
            <Text
              style={{
                fontSize: Measurements.width * 0.05,
                color: colors.primary,
                fontWeight: 'bold',
              }}>
              {item.productName}
            </Text>
            <Text
              style={{
                color: colors.lightGrey3,
                fontWeight: 'bold',
              }}>
              {currentCat.catagoryName}
            </Text>
          </View>
          <Text
            style={{
              width: '100%',
              fontSize: Measurements.width * 0.045,
              color: 'black',
              fontWeight: 'bold',
            }}>
            ${item.price}
          </Text>
        </View>
        <View
          style={{
            width: '34%',
            marginLeft: Measurements.width * 0.08,
          }}>
          <ImageBackground
            source={item.images}
            style={{
              width: '100%',
              height: Measurements.height * 0.15,
            }}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </View>
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
    paddingVertical: Measurements.width * 0.02,
    borderRadius: 20,
    elevation: 2,
    // ...border,
  },
  divider2: {
    borderColor: colors.lightGrey3,
    borderWidth: 1,
    width: '60%',
  },
  divider: {display: 'flex', alignItems: 'center', marginTop: 5},
});

export default connect(null, {setCurrentProductAction})(Home);
