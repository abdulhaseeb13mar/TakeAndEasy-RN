/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import {Measurements} from '../Resuables/Measurement';
import {colors} from '../Resuables/frequentColors';
import WrapperScreen from '../Resuables/WrapperScreen';
import {connect} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationRef from '../Resuables/RefNavigation';
import UseHeader from '../Resuables/MyHeader';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  setFavAction,
  minusCart,
  plusCart,
  removeFavAction,
} from '../reduxStore/actions';

function Booking(props) {
  useEffect(() => {
    // checkIfFav();
  }, []);

  const [fav, setFav] = useState(false);
  const product = props.product;

  const checkIfFav = () => {
    for (let i = 0; i < props.favs.length; i++) {
      if (props.favs[i].id === product.id) {
        setFav(true);
        break;
      }
    }
  };

  const proceedToBookings = () => {
    props.setCurrentProductAction({...product});
    NavigationRef.Navigate('PersonalInfo');
  };

  const MyAddToCart = () => props.plusCart(product);

  const MyRemoveFromCart = () => {
    props.myCart[product.id].added !== 0 && props.minusCart(product);
  };

  const MyGotoCart = () => NavigationRef.NavigateAndReset('MyCart');

  const MyToggleFav = () => {
    fav ? props.removeFavAction(product.id) : props.setFavAction(product);
    setFav(!fav);
  };
  const MyGoBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <UseHeader
        leftIcon={Ionicons}
        leftIconName="chevron-back"
        leftIconAction={MyGoBack}
        rightIconAction={MyGotoCart}
        rightIcon={Feather}
        rightIconName="shopping-bag"
        Title=""
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <View
          style={{
            width: '100%',
            paddingHorizontal: Measurements.width * 0.02,
          }}>
          <ImageBackground
            source={product.images}
            style={{
              width: '100%',
              height: Measurements.height * 0.4,
            }}
            resizeMode="contain"
          />
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: colors.primary,
                fontSize: Measurements.width * 0.044,
                alignSelf: 'stretch',
                textAlignVertical: 'center',
                paddingHorizontal: Measurements.width * 0.02,
                borderRadius: 10,
                borderColor: colors.lightBackground,
                borderWidth: 1,
                elevation: 2,
                backgroundColor: 'white',
              }}>
              ${product.price}
            </Text>
            <View
              style={{
                alignSelf: 'stretch',
                paddingHorizontal: Measurements.width * 0.02,
                borderRadius: 10,
                borderColor: colors.lightBackground,
                borderWidth: 1,
                elevation: 2,
                backgroundColor: 'white',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: colors.primary,
                  fontSize: Measurements.width * 0.044,
                }}>
                {product.cal}
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: colors.lightGrey3,
                  textAlign: 'center',
                }}>
                Calories
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: 'black',
              fontSize: Measurements.width * 0.065,
              marginVertical: Measurements.height * 0.02,
              fontWeight: 'bold',
              width: Measurements.width * 0.8,
            }}>
            {product.productName}
          </Text>
          <Text
            style={{
              lineHeight: Measurements.width * 0.055,
              fontWeight: 'bold',
              color: colors.lightGrey1,
              width: Measurements.width * 0.75,
            }}>
            {product.discription}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: colors.primary,
            borderColor: colors.primary,
            borderWidth: 2,
            elevation: 2,
            width: Measurements.width * 0.25,
            alignSelf: 'flex-start',
            paddingVertical: Measurements.height * 0.012,
            borderTopRightRadius: 50,
            borderBottomRightRadius: 50,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingRight: Measurements.width * 0.03,
          }}>
          <AntDesign
            color="white"
            name="heart"
            size={Measurements.width * 0.08}
          />
        </View>
      </View>
      <View
        style={{
          backgroundColor: colors.primary,
          position: 'absolute',
          bottom: 0,
          right: 0,
          height: Measurements.height * 0.24,
          width: Measurements.width * 0.22,

          borderTopLeftRadius: 30,
          elevation: 3,
          ...(props.myCart[product.id] !== undefined &&
          props.myCart[product.id] !== 0
            ? {}
            : {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }),
        }}>
        {console.log(props.myCart[product.id])}
        {props.myCart[product.id] !== undefined &&
        props.myCart[product.id].added !== 0 ? (
          <View
            style={{
              height: '100%',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            {console.log('+ - ')}

            <TouchableOpacity onPress={MyAddToCart}>
              <AntDesign
                name="plus"
                color="white"
                size={Measurements.height * 0.04}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: Measurements.width * 0.08,
                color: 'white',
                fontWeight: 'bold',
              }}>
              {props.myCart[product.id].added}
            </Text>
            <TouchableOpacity onPress={MyRemoveFromCart}>
              <AntDesign
                name="minus"
                color="white"
                size={Measurements.height * 0.04}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={MyAddToCart}
            style={{
              alignSelf: 'stretch',
              width: Measurements.height * 0.24,
              transform: [{rotate: '270deg'}],
            }}>
            {console.log('add to cart ka ')}
            <Text
              style={{
                color: 'white',
                height: Measurements.width * 0.22,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: Measurements.width * 0.048,
                textAlignVertical: 'center',
              }}>
              ADD TO CART
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => {
  return {
    product: state.crntPrdtReducer,
    favs: state.favouritesReducer,
    myCart: state.ReducerCart.items,
  };
};

const border = {
  borderColor: 'red',
  borderWidth: 1,
};

export default connect(mapStateToProps, {
  setFavAction,
  removeFavAction,
  minusCart,
  plusCart,
})(React.memo(Booking));

const styles = StyleSheet.create({});
