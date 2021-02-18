import React from 'react';
import {View, StyleSheet} from 'react-native';
import WrapperScreen from '../Resuables/WrapperScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Measurements} from '../Resuables/Measurement';
import {colors} from '../Resuables/frequentColors';
import NavigationRef from '../Resuables/RefNavigation';
import {FilteredTile} from './Home';
import {connect} from 'react-redux';
import UseHeader from '../Resuables/MyHeader';
import Loop from '../Resuables/looping';
import {setCurrentProductAction} from '../reduxStore/actions';

function MyFavourite(props) {
  const GoToSingleProduct = (item) => {
    props.setCurrentProductAction(item);
    NavigationRef.Navigate('SingleProduct');
  };

  const goBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen style={{backgroundColor: colors.lightGrey4}}>
      <KeyboardAwareScrollView style={styles.container}>
        <UseHeader
          leftIcon={AntDesign}
          Title="FAVOURITES"
          leftIconName="arrowleft"
          leftIconAction={goBack}
        />
        <View style={{marginVertical: Measurements.height * 0.015}}>
          {props.favourites.length > 0 && (
            <Loop
              horizontal={false}
              data={props.favourites}
              renderItem={({item}) => (
                <FilteredTile
                  item={item}
                  GoToSingleProduct={GoToSingleProduct}
                />
              )}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => {
  return {
    favourites: state.favouritesReducer,
  };
};
export default connect(mapStateToProps, {setCurrentProductAction})(MyFavourite);

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
