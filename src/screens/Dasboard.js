import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  RefreshControl,
  Button,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {PieChart} from 'react-native-chart-kit';
import CarouselCards from '../components/carousel-card/CarouselCards';
import * as actions from '../store/Actions/index';
import {connect} from 'react-redux';
import {themePurple} from '../assets/colors/colors';
import LottieView from 'lottie-react-native';

const image = require('../assets/images/login_bg.png');
const {height, width} = Dimensions.get('window');

const dashboardStatus = [
  {
    id: '1',
    label: '1D',
    checked: true,
  },
  {
    id: '2',
    label: '1W',
    checked: false,
  },
  {
    id: '3',
    label: '1M',
    checked: false,
  },
  {
    id: '4',
    label: '3M',
    checked: false,
  },
  {
    id: '5',
    label: '6M',
    checked: false,
  },
  {
    id: '6',
    label: '1Y',
    checked: false,
  },
];

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const data = {
  labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  datasets: [
    {
      data: [20, 45, 28, 80, 50, 43, 90],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 3, // optional
    },
  ],
};

const Item = ({item, title, check, onPress, index}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        // console.log('object')
        onPress(item, index);
      }}>
      {check ? (
        <LinearGradient
          colors={['#7124BC', '#437AD8', '#05F0FF']}
          style={style.gradient_btn_list}
          start={{y: 0.0, x: -0.05}}
          angleCenter={{x: 5, y: 0}}
          end={{y: 0.0, x: 1.2}}>
          <Text style={style.list_label}>{title}</Text>
        </LinearGradient>
      ) : (
        <Text style={style.list_label}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const Dashboard = ({UserReducer, getTotalInvestmentAndEarning}) => {
  let API_DATA = {
    email: UserReducer?.userData?.email,
  };
  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

  const [checkedState, setCheckState] = useState(true);
  const accessToken = UserReducer?.accessToken;
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      getDashboardData();
    });
  }, []);

  const getDashboardData = async () => {
    setIsLoading(true);
    await getTotalInvestmentAndEarning(API_DATA, accessToken);
    setIsLoading(false);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  const data1 = [
    {
      name: 'Walmart',
      population: Number(UserReducer?.totalWalmart),
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: 'white',
      legendFontSize: 15,
    },
    {
      name: 'Amazon',
      population: Number(UserReducer?.totalAmazon),
      color: themePurple,
      legendFontColor: 'white',
      legendFontSize: 15,
    },
  ];
  const data2 = [
    {
      name: 'Earnings',
      population: Number(UserReducer?.totalEarnings),
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: 'white',
      legendFontSize: 15,
    },
    {
      name: 'Investments',
      population: Number(UserReducer?.totalInvestments),
      color: themePurple,
      legendFontColor: 'white',
      legendFontSize: 15,
    },
  ];

  
  return (
    <ImageBackground source={image} resizeMode="cover" style={style.login_bg}>
      <View style={{height: STATUS_BAR_HEIGHT, backgroundColor: themePurple}}>
        <StatusBar
          translucent
          backgroundColor={themePurple}
          barStyle="light-content"
        />
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View
            style={{
              marginTop: height * 0.35,
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: width * 0.03,
              width: width * 0.63,
            }}>
            <LottieView
              speed={1}
              style={style.lottieStyle}
              autoPlay
              loop
              source={require('../assets/lottie/purple-loading-2.json')}
            />
            <Text
              style={{
                marginTop: height * -0.15,
                color: 'white',
                fontSize: width * 0.07,
                fontFamily: 'Poppins-Bold',
              }}>
              Fetching Data..
            </Text>
          </View>
        ) : (
          <>
            <View style={{marginTop: 20}}>
              <Text style={style.main_title}>Dashboard</Text>
              <View style={style.card_main}>
                <LinearGradient
                  colors={['#7124BC', '#437AD8', '#05F0FF']}
                  style={style.gradient_card}
                  start={{y: 0.0, x: -0.05}}
                  angleCenter={{x: 5, y: 0}}
                  end={{y: 0.0, x: 1.2}}>
                  <Icon name="pie-chart" color="#fff" style={style.card_icon} />
                  <Text style={style.card_value}>
                    {`$${UserReducer?.totalInvestments}`}
                  </Text>
                  <Text style={style.card_title}>Total</Text>
                  <Text style={style.card_title}>Investments</Text>
                </LinearGradient>
                <LinearGradient
                  colors={['#7124BC', '#437AD8', '#05F0FF']}
                  style={style.gradient_card}
                  start={{y: 0.0, x: -0.05}}
                  angleCenter={{x: 5, y: 0}}
                  end={{y: 0.0, x: 1.2}}>
                  <Icon name="pie-chart" color="#fff" style={style.card_icon} />
                  <Text
                    style={
                      style.card_value
                    }>{`$${UserReducer?.totalEarnings}`}</Text>
                  <Text style={style.card_title}>Total</Text>
                  <Text style={style.card_title}>Earnings</Text>
                </LinearGradient>
              </View>
            </View>

            {/* Walmart and Amazon Product Pie Chart  */}
            <PieChart
              data={data1}
              width={width * 0.9}
              height={height * 0.3}
              chartConfig={chartConfig}
              accessor={'population'}
              backgroundColor={'transparent'}
              paddingLeft={'0'}
              center={[width * 0.02, height * 0.01]}
              absolute
            />

            {/* Earnings and Investments Chart */}
            <PieChart
              data={data2}
              width={width * 0.9}
              height={height * 0.3}
              chartConfig={chartConfig}
              accessor={'population'}
              backgroundColor={'transparent'}
              paddingLeft={'0'}
              center={[width * 0.02, height * 0.01]}
              absolute
            />
          </>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const style = StyleSheet.create({
  lottieStyle: {
    height: height * 0.38,
    // backgroundColor: 'red',
    // position: 'absolute',
    // top:100,
    marginTop: height * -0.055,
    // zIndex: 99999,
    // left: width * 0.04,
  },
  login_bg: {
    flex: 1,
    alignItems: 'center',
    width: width,
    height: height,
  },
  main_title: {
    fontSize: width * 0.055,
    color: 'white',
    marginBottom: 25,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  card_main: {
    flexDirection: 'row',
    width: width * 0.9,
    justifyContent: 'space-between',
  },
  gradient_card: {
    width: width * 0.42,
    borderRadius: 10,
    padding: width * 0.05,
  },
  card_icon: {
    fontSize: width * 0.055,
    marginBottom: width * 0.04,
  },
  chart_card: {
    overflow: 'hidden',
    width: width * 0.9,
    backgroundColor: 'white',
    borderRadius: 30,
    paddingTop: 20,
    marginTop: height * 0.04,
  },
  card_value: {
    fontSize: width * 0.06,
    marginBottom: 3,
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },
  card_title: {
    fontSize: width * 0.04,
    marginBottom: 0,
    fontFamily: 'Poppins-Regular',
    color: 'white',
    lineHeight: width * 0.04,
  },
  gradient_btn_list: {
    borderRadius: 30,
  },
  list_label: {
    fontSize: width * 0.04,
    fontFamily: 'Poppins-Medium',
    borderRadius: 30,
    color: 'white',
    paddingLeft: width * 0.03,
    paddingTop: width * 0.01,
    paddingRight: width * 0.03,
    paddingBottom: width * 0.01,
  },
  chart_title: {
    color: '#737D93',
    fontSize: width * 0.04,
    fontFamily: 'Poppins-Medium',
    paddingLeft: width * 0.06,
  },
  chart_detail: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: width * 0.06,
    marginTop: height * 0.01,
    marginBottom: height * 0.04,
    fontFamily: 'Poppins-Medium',
  },
  chart_detail_value: {
    color: '#212325',
    fontSize: width * 0.06,
    fontFamily: 'Poppins-Medium',
  },
  chart_detail_value2: {
    color: '#458F5A',
    backgroundColor: '#ECF5EE',
    fontSize: width * 0.045,
    fontFamily: 'Poppins-Medium',
    marginLeft: 10,
    padding: 8,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  products_title: {
    color: 'white',
    fontSize: width * 0.06,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 30,
    marginBottom: 20,
  },
  // chart_title : {},
  // chart_title : {},
});

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, actions)(Dashboard);
