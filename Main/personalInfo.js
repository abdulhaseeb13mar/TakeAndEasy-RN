/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import WrapperScreen from '../Resuables/WrapperScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Measurements} from '../Resuables/Measurement';
import {colors} from '../Resuables/frequentColors';
import {Button, Overlay} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {isFormValid} from '../Resuables/validation';
import NavigationRef from '../Resuables/RefNavigation';
import {setUserInfoAction} from '../reduxStore/actions';
import Toast from 'react-native-root-toast';

const ConfirmOrder = (props) => {
  const [firstName, setFirstName] = useState('');
  const [firstNameErrMsg, setFirstNameErrMsg] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameErrMsg, setLastNameErrMsg] = useState('');
  const [email, setEmail] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneErrMsg, setPhoneErrMsg] = useState('');
  const [address, setAddress] = useState('');
  const [addressErrMsg, setAddressErrMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const product = props.product;

  const Hire = () => {
    const formValidResponse = isFormValid(
      firstName,
      lastName,
      email,
      phone,
      address,
    );
    if (!formValidResponse.status) {
      errorMsgHandler(formValidResponse.errCategory, formValidResponse.errMsg);
    } else {
      CallApi();
      setUserInfoAction({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        address: address,
      });
    }
  };

  const ShowToast = (msg) => {
    Toast.show(msg, {
      backgroundColor: colors.secondary,
      textColor: 'white',
      opacity: 1,
      position: -60,
    });
  };

  const CallApi = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        'https://reactnativeapps.herokuapp.com/customers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            phonenumber: phone,
            address: address,
            email: email,
            appname: 'Ball Collection',
          }),
        },
      );
      const response = await res.json();
      setLoading(false);
      response.status ? setShowModal(true) : ShowToast('Some error occurred');
    } catch (error) {
      console.log(error);
    }
  };

  const errorMsgHandler = (errCategory, errMsg) => {
    if (errCategory === 'email') {
      setEmailErrMsg(errMsg);
      setFirstNameErrMsg('');
      setLastNameErrMsg('');
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'firstname') {
      setFirstNameErrMsg(errMsg);
      setLastNameErrMsg('');
      setEmailErrMsg('');
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'lastname') {
      setLastNameErrMsg(errMsg);
      setEmailErrMsg('');
      setFirstNameErrMsg('');
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'phone') {
      setPhoneErrMsg(errMsg);
      setFirstNameErrMsg('');
      setLastNameErrMsg('');
      setEmailErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'address') {
      setAddressErrMsg(errMsg);
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setLastNameErrMsg('');
      setEmailErrMsg('');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    NavigationRef.Push('Home');
  };

  const changeFirstName = (t) => setFirstName(t);
  const changeLastName = (t) => setLastName(t);
  const changeEmail = (t) => setEmail(t);
  const changePhone = (t) => setPhone(t);
  const changeAddress = (t) => setAddress(t);
  const goBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen style={{backgroundColor: colors.lightBackground2}}>
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
        <View style={styles.bookingDetailsCenterOverlay}>
          <TouchableOpacity
            onPress={goBack}
            style={styles.bookingDetailsWrapper}>
            <ImageBackground
              source={product.images}
              style={styles.TileImage}
              imageStyle={{borderRadius: 10}}
              resizeMode="contain"
            />
            <View style={styles.DetailWrapper}>
              <Text style={styles.ProductName}>{product.productName}</Text>
              <View style={styles.detailInner2}>
                <Text style={styles.detailprice}>${product.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.personalInfoWrapper}>
          <Text style={styles.personalInfoHeader}>Contact Info</Text>
        </View>
        <View style={styles.PersonalInfoWrapper}>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: firstNameErrMsg ? 'red' : colors.primary,
              }}>
              FIRST NAME <Text> {firstNameErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <Feather
                name="user"
                size={Measurements.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="First Name"
                style={styles.Input}
                onChangeText={changeFirstName}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: lastNameErrMsg ? 'red' : colors.primary,
              }}>
              LAST NAME <Text> {lastNameErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <Feather
                name="user"
                size={Measurements.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Last Name"
                style={styles.Input}
                onChangeText={changeLastName}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: emailErrMsg ? 'red' : colors.primary,
              }}>
              EMAIL<Text> {emailErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <Feather
                name="mail"
                size={Measurements.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Email"
                style={styles.Input}
                onChangeText={changeEmail}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: phoneErrMsg ? 'red' : colors.primary,
              }}>
              PHONE<Text> {phoneErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <Feather
                name="phone"
                size={Measurements.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Phone Number"
                keyboardType="number-pad"
                style={styles.Input}
                onChangeText={changePhone}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: addressErrMsg ? 'red' : colors.primary,
              }}>
              ADDRESS<Text> {addressErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <Feather
                name="map-pin"
                size={Measurements.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Address"
                style={styles.Input}
                multiline={true}
                onChangeText={changeAddress}
              />
            </View>
          </View>
        </View>
        <View style={styles.ConfirmButtonWrapper}>
          <Button
            title="CONFIRM ORDER"
            raised
            buttonStyle={styles.confirmButton}
            titleStyle={{color: 'white', fontWeight: 'bold'}}
            containerStyle={styles.confirmButtonContainer}
            onPress={Hire}
            loading={loading}
          />
        </View>
        <Overlay
          isVisible={showModal}
          onBackdropPress={closeModal}
          animationType="fade">
          <View style={styles.ModalWrapper}>
            <FontAwesome
              name="check-circle"
              size={Measurements.width * 0.25}
              color={colors.primary}
            />
            <Text style={styles.ModalHeadText}>THANK YOU!</Text>
            <Text style={styles.ModalSubText}>
              Your Order has been confirmed
            </Text>
          </View>
        </Overlay>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    product: state.currentProductReducer,
  };
};

export default connect(mapStateToProps, {setUserInfoAction})(
  React.memo(ConfirmOrder),
);

const styles = StyleSheet.create({
  detailprice: {
    color: colors.lightGrey3,
    fontSize: 15,
    fontWeight: '700',
  },
  detailInner2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    width: Measurements.width * 0.35,
  },
  TileImage: {
    width: Measurements.width * 0.3,
    height: Measurements.width * 0.35,
  },
  ModalSubText: {
    fontSize: Measurements.width * 0.045,
    color: colors.darkGray,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ModalHeadText: {
    fontSize: Measurements.width * 0.09,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ModalWrapper: {
    paddingVertical: Measurements.height * 0.04,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: Measurements.width * 0.8,
  },
  confirmButtonContainer: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    padding: Measurements.height * 0.018,
  },
  ConfirmButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Measurements.width * 0.035,
    marginBottom: Measurements.height * 0.02,
  },
  Input: {
    width: Measurements.width * 0.81,
    height: Measurements.height * 0.065,
  },
  inputIcon: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: Measurements.width * 0.09,
    color: colors.primary,
  },
  personalInfoInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingHorizontal: Measurements.width * 0.02,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.lightGrey2,
  },
  personalInfoHeadingName: {
    fontSize: 13,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  singlePersonalInfoWrapper: {
    marginVertical: 10,
  },
  PersonalInfoWrapper: {
    marginHorizontal: Measurements.width * 0.035,
    marginVertical: 20,
  },
  personalInfoHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  personalInfoWrapper: {
    marginHorizontal: Measurements.width * 0.035,
  },
  bookingDetailsWrapper: {
    borderColor: colors.primary,
    borderWidth: 2,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    marginVertical: Measurements.height * 0.01,
    backgroundColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  ProductName: {
    color: colors.secondary,
    fontSize: 18,
    fontWeight: 'bold',
    width: Measurements.width * 0.35,
  },
  DetailWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: Measurements.width * 0.06,
    position: 'relative',
  },
  bookingDetailsCenterOverlay: {
    marginBottom: Measurements.height * 0.01,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {flex: 1},
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: Measurements.width * 0.03,
    paddingVertical: Measurements.height * 0.018,
  },
});
