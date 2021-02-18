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

  const GotoSearch = () => RefNavigation.Navigate('SearchTakenEasy');
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
          rightIconAction={GotoSearch}
          rightIcon={Feather}
          rightIconName="search"
          Title="Take and Easy"
        />
        <Text style={styles.home_TE1}>Let's Eat</Text>
        <Text style={styles.home_TE2}>{currentCat.catagoryName}</Text>
        <View style={styles.listingWrapper}>
          <Loop
            data={categories}
            renderItem={({item}) => (
              <Tabs item={item} currentCat={currentCat} changeTab={changeTab} />
            )}
          />
        </View>
        <View style={styles.home_TE3}>
          <Text style={styles.home_TE4}>Special {currentCat.catagoryName}</Text>
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
        style={styles.home_TE5}
        resizeMode="contain"
      />
      <View style={styles.home_TE6}>
        <Text
          style={{
            ...styles.home_TE7,
            color:
              item.catagoryName === currentCat.catagoryName ? 'white' : 'black',
          }}>
          {item.catagoryName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const MyFilteredTile = ({
  item,
  MyGoToSingleProduct,
  currentCat,
  plusCart,
  minusCart,
  isCart,
}) => {
  return (
    <View style={styles.home_TE8}>
      <TouchableOpacity
        onPress={() => MyGoToSingleProduct(item)}
        style={styles.home_TE9}>
        <View style={styles.home_TE10}>
          <View style={{width: '100%'}}>
            <Text style={styles.home_TE11}>{item.productName}</Text>
            <Text style={styles.home_TE12}>{currentCat.catagoryName}</Text>
          </View>
          <Text style={styles.home_TE13}>${item.price}</Text>
        </View>
        <View style={styles.home_TE14}>
          <ImageBackground
            source={item.images}
            style={styles.home_TE15}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
      {isCart && (
        <View style={styles.home_TE16}>
          <View style={styles.home_TE17}>
            <TouchableOpacity onPress={() => minusCart(item)}>
              <Feather
                name="minus-circle"
                size={Measurements.width * 0.05}
                color="white"
              />
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', color: 'white'}}>
              {item.added}
            </Text>
            <TouchableOpacity onPress={() => plusCart(item)}>
              <Feather
                name="plus-circle"
                size={Measurements.width * 0.05}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  home_TE17: {
    flexDirection: 'row',
    marginVertical: Measurements.height * 0.013,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  home_TE16: {
    width: '40%',
    marginTop: -5,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 3,
    paddingHorizontal: Measurements.width * 0.03,
    paddingVertical: Measurements.height * 0.003,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  home_TE15: {
    width: '100%',
    height: Measurements.height * 0.15,
  },
  home_TE14: {
    width: '34%',
    marginLeft: Measurements.width * 0.08,
  },
  home_TE13: {
    width: '100%',
    fontSize: Measurements.width * 0.045,
    color: 'black',
    fontWeight: 'bold',
  },
  home_TE12: {
    color: colors.lightGrey3,
    fontWeight: 'bold',
  },
  home_TE11: {
    fontSize: Measurements.width * 0.05,
    color: colors.primary,
    fontWeight: 'bold',
  },
  home_TE10: {
    width: '66%',
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  home_TE9: {
    borderWidth: 1,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  home_TE8: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Measurements.height * 0.02,
  },
  home_TE7: {
    alignSelf: 'stretch',
    width: Measurements.height * 0.15,
    textAlign: 'center',
    transform: [{rotate: '270deg'}],
    fontWeight: 'bold',
    fontSize: Measurements.width * 0.045,
  },
  home_TE6: {
    width: '100%',
    height: Measurements.height * 0.15,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  home_TE5: {
    width: Measurements.width * 0.38,
    height: Measurements.height * 0.15,
  },
  home_TE1: {
    paddingLeft: Measurements.width * 0.04,
    fontSize: Measurements.width * 0.065,
    fontWeight: 'bold',
  },
  home_TE2: {
    paddingLeft: Measurements.width * 0.04,
    fontSize: Measurements.width * 0.065,
    fontWeight: 'bold',
  },
  home_TE3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  home_TE4: {
    backgroundColor: colors.primary,
    color: 'white',
    fontSize: Measurements.width * 0.06,
    paddingHorizontal: Measurements.width * 0.05,
    paddingVertical: Measurements.height * 0.008,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
});

export default connect(null, {setCurrentProductAction})(Home);
