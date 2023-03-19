import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
//@ts-ignore
import ProfileImage from '../../../assets/images/profile.png';
import {AccountIcons} from '../../helpers/Icons';
import AccountListItem from '../../components/AccountListItem';
import Button from '../../components/Button';
import AddressScreen from '../AddressScreen';
import AccountDetailsScreen from '../AccountDetailsScreen';
import OrdersScreen from '../OrdersScreen';
import {setLoggedIn} from '../../store/user';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch, useSelector} from 'react-redux';
import {useQuery} from 'react-query';
import {api} from '../../api';
import {RootState} from '../../store';
import SignIn from '../SignIn';
import {layout} from '../../constants/Layout';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
const AccountTab = ({navigation}: any) => {
  const dispatch = useDispatch();
  function logout() {
    console.log('logout running');
    dispatch(setLoggedIn(false));
    EncryptedStorage.removeItem('isLoggedIn');
    EncryptedStorage.removeItem('id');
  }
  function login() {
    navigation.navigate(SignIn.name);
  }

  // const loggedIn = useSelector((state: RootState) => state.user.loggedIn);

  const itemList = [
    {
      label: 'Orders',
      icon: <AccountIcons.OrdersIcon style={styles.icon} color={'#181725'} />,
      navigateTo: OrdersScreen.name,
    },
    {
      label: 'My Details',
      icon: (
        <AccountIcons.PersonalCardIcon style={styles.icon} color={'#181725'} />
      ),
      navigateTo: AccountDetailsScreen.name,
    },
    {
      label: 'Delivery Address',
      icon: <AccountIcons.PinIcon style={styles.icon} color={'#181725'} />,
      navigateTo: AddressScreen.name,
    },
  ];

  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
  console.log('🚀 ~ file: Account.tsx:67 ~ AccountTab ~ loggedIn:', loggedIn);

  const {data, error, isLoading} = useQuery(['profile', loggedIn], async () => {
    const id = await EncryptedStorage.getItem('id');
    return api.post('/user/profile', {user_id: id});
  });
  console.log(
    '🚀 ~ file: Account.tsx:57 ~ AccountTab ~ data:',
    data?.data,
    error?.response,
  );

  return (
    <>
      <ScrollView style={styles.scrollContainer}>
        {!loggedIn ? (
          <View
            style={{
              height: layout.height,
              // backgroundColor: 'pink',
              justifyContent: 'center',
              width: layout.width,
            }}>
            <View style={[styles.buttonBox]}>
              <Button
                onPress={login}
                text="Sign In"
                bgColour="#53B175"
                txtColour="white"
              />
            </View>
          </View>
        ) : (
          <>
            <View style={styles.headerContainer}>
              <Image
                style={styles.headerImage}
                source={
                  data?.data?.data?.image
                    ? {uri: data.data.data.image}
                    : ProfileImage
                }
              />
              <View style={styles.textBox}>
                <View style={styles.headerTitleBox}>
                  <Text style={styles.headerTitle}>
                    {isLoading ? 'loading..' : data?.data?.data?.name}
                  </Text>
                </View>
                <Text style={styles.headerSubtitle}>
                  {isLoading ? null : data?.data?.data.email}
                </Text>
              </View>
            </View>
            <View style={styles.list}>
              {itemList.map((item, index) => {
                return (
                  <AccountListItem
                    key={index}
                    label={item.label}
                    children={item.icon}
                    navigateTo={item.navigateTo}
                  />
                );
              })}
            </View>
            <View style={styles.buttonBox}>
              <Button
                onPress={logout}
                text="Log Out"
                bgColour="#F2F3F2"
                txtColour="#53B175"
              />
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
};

const styles = EStyleSheet.create({
  scrollContainer: {
    backgroundColor: '$whiteColour',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.06,
    paddingTop: screenHeight * 0.023,
    paddingBottom: screenHeight * 0.033,
    borderBottomWidth: 1.0,
    borderBottomColor: '$lightGreyColour',
  },
  headerImage: {
    width: screenHeight * 0.071,
    height: screenHeight * 0.071,
    borderRadius: 27.0,
  },
  textBox: {
    marginLeft: screenWidth * 0.05,
  },
  headerTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: '$gilroyNormal600',
    fontWeight: '600',
    fontSize: '1.125rem',
    color: '$blackColour',
    marginRight: screenWidth * 0.024,
  },
  headerSubtitle: {
    fontFamily: '$gilroyNormal',
    fontSize: '0.875rem',
    color: '$darkGreyColour',
  },
  headerIcon: {
    color: '$greenColour',
  },
  list: {
    paddingBottom: screenHeight * 0.058,
  },
  buttonBox: {
    paddingBottom: screenHeight * 0.027,
    paddingHorizontal: screenWidth * 0.06,
  },
  icon: {
    color: '#F00',
  },
});

export default {component: AccountTab, name: 'Account'};
