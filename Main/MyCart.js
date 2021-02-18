/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {
  setFavAction,
  minusCart,
  plusCart,
  removeFavAction,
  setCurrentProductAction,
} from '../reduxStore/actions';
import WrapperScreen from '../Resuables/WrapperScreen';
import {Measurements} from '../Resuables/Measurement';
import {colors} from '../Resuables/frequentColors';
import NavigationRef from '../Resuables/RefNavigation';
import {Button} from 'react-native-elements';
import UseHeader from '../Resuables/MyHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MyFilteredTile} from './Home';
import Data from '../dummyData';

export const Cart = (props) => {
  const goBack = () => NavigationRef.Navigate('Home');

  const CartArray = Object.keys(props.myCart);

  const MyGoToSingleProduct = (item) => {
    props.setCurrentProductAction(item);
    NavigationRef.Navigate('SingleProduct');
  };

  const infoScreen = () => NavigationRef.Navigate('PersonalInfoTakenEasy');
  const MyAddToCart = (i) => props.plusCart(i);

  const MyRemoveFromCart = (i) => {
    props.myCart[i.id].added !== 0 && props.minusCart(i);
  };

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        <UseHeader
          leftIcon={Ionicons}
          leftIconName="chevron-back"
          leftIconAction={goBack}
          Title="Cart"
        />
        <ScrollView>
          <View style={styles.TilesWrapper}>
            {CartArray.length > 0 ? (
              CartArray.map((id, index) => {
                const item = props.myCart[id];
                return (
                  <MyFilteredTile
                    key={index}
                    item={item}
                    currentCat={{
                      catagoryName:
                        Data.catagory[parseInt(item.catagoryId) - 1]
                          .catagoryName,
                    }}
                    MyGoToSingleProduct={MyGoToSingleProduct}
                    plusCart={MyAddToCart}
                    minusCart={MyRemoveFromCart}
                    isCart={true}
                  />
                );
              })
            ) : (
              <Text style={styles.mycart_TE1}>Your cart is empty...</Text>
            )}
          </View>
        </ScrollView>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.mycart_TE2}>
            <View style={styles.mycart_TE3}>
              <Text style={styles.mycart_TE4}>Total Amount:</Text>
              <Text style={styles.mycart_TE5}>${props.total}</Text>
            </View>
            <View style={styles.mycart_TE6}>
              <Button
                raised
                disabled={props.total < 1}
                onPress={infoScreen}
                title="PROCEED TO CHECKOUT"
                titleStyle={styles.mycart_TE7}
                buttonStyle={styles.mycart_TE8}
                containerStyle={{width: '100%'}}
              />
            </View>
          </View>
        </View>
      </View>
    </WrapperScreen>
  );
};

const styles = StyleSheet.create({
  mycart_TE8: {
    paddingVertical: Measurements.height * 0.015,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  mycart_TE7: {
    fontSize: Measurements.width * 0.05,
    color: colors.primary,
    fontWeight: 'bold',
  },
  mycart_TE6: {
    paddingVertical: Measurements.height * 0.018,
    width: '80%',
  },
  mycart_TE5: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: Measurements.width * 0.05,
    backgroundColor: 'white',
    padding: 3,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  mycart_TE4: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: Measurements.width * 0.035,
  },
  mycart_TE3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '75%',
    marginTop: Measurements.height * 0.015,
  },
  mycart_TE2: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Measurements.height * 0.02,
  },
  mycart_TE1: {
    width: '100%',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  TilesWrapper: {
    paddingTop: Measurements.height * 0.025,
  },
});

const mapStateToProps = (state) => ({
  myCart: state.ReducerCart.items,
  total: state.ReducerCart.totalAmount,
  favs: state.toggleFav,
});

export default connect(mapStateToProps, {
  setFavAction,
  removeFavAction,
  minusCart,
  plusCart,
  setCurrentProductAction,
})(Cart);
