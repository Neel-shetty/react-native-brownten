import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {layout} from '../../constants/Layout';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../constants/colors';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';

const source = {
  html: `
<p><strong>Overview</strong><br />\r\nDove Care &amp; Protect Beauty Bar removes 99% germs and moisturizes skin with its gentle plant based cleansers. Removing germs can be tough on your skin, but Dove Care &amp; Protect is different from ordinary soaps. With plant-based cleansers and Dove&rsquo;s &frac14; moisturising cream, Dove Care &amp; Protect beauty bar effectively washes away germs while also protecting skin from dryness. Dove Care &amp; Protect beauty bar helps to replenish moisture that is lost during the cleansing process &ndash; where a regular soap bar might leave your skin feeling dry and tight, Dove Care &amp; Protect effectively washes away germs and the classic moisturizing, pH-balanced formula of Dove bars will leave skin softer, smoother and more glowing. It remove germs &amp; moisturise your skin with the 100% caring formula of Dove Care &amp; Protect beauty bar. Dove Care &amp; Protect gives you a gentle yet&nbsp;effective cleanse&nbsp;as it is mild on the skin. It is suitable for sensitive skin too. For best results, lather up your Dove Care &amp; Protect Beauty bathing bar and massage the smooth, creamy lather over your face and body before rinsing thoroughly. Regular soap may dry out your skin, but the moisturizing formula of Dove bars will leave skin softer, smoother and more glowing. So washing away germs doesn&#39;t mean you need to compromise on your skin&#39;s nourishment.</p>\r\n\r\n<p><strong>Key Features</strong><br />\r\n- Perfect Dual Cleanse :&nbsp;&nbsp;Dove Care &amp; Protect washes away germs while not&nbsp;compromising&nbsp;on the nourishment of your skin, making it an ideal cleanser.<br />\r\n- 100% Caring Formula : With plant-based cleansers, Dove Care &amp; Protect gently removes 99% germs&nbsp;and moisturises skin for hours.<br />\r\n- Soft, Glowing Skin : With 1/4 moisturising cream, Dove Care &amp; Protect effectively protects your skin from dryness.<br />\r\n- ph Balanced : Dove Care &amp; Protect gives you a gentle yet&nbsp;effective cleanse&nbsp;as it is mild on the skin but tough on the germs and will not strip the skin its moisture.<br />\r\n- Dove Care &amp; Protect beauty bar helps to replenish moisture that is lost during the cleansing process<br />\r\n- For All Skin Types, Including Sensitive Skin : Frequent washing with ordinary soap may be harsh for sensitive skin. Dove is different.</p>\r\n\r\n<p><strong>Ingredients</strong><br />\r\nSodium Cocoyl Isethionate, Stearic Acid, Sodium Palmate, Sodium Stearate, Water, Sodium Isethionate, Lauric Acid, Sodium C14-16 Olefin Sulfonate, Sodium Palm Kernelate, Perfume, Sodium Chloride, Dipropylene Glycol, Glycerin, Zinc Oxide, Titanium Dioxide, Tetrasodium EDTA, Tetrasodium Etidronate, Propylene Glycol, Camellia Sinensis Leaf Powder, Xanthan Gum, Lactic Acid, Sodium Benzoate, Potassium Sorbate, Alpha-lsomethyl lonone, Benzyl Alcohol, Cinnamyl Alcohol, Citral, Citronellol, Coumarin, Geraniol, Hexyl Cinnamal, Limonene, Linalool, CI 42090, CI 19140.</p>\r\n\r\n<p><strong>How to Use</strong><br />\r\n- Take Dove bar onto your wet hands and rub hands to lather up. Work into a rich, creamy lather and then gently massage the smooth, creamy lather over your face and body before rinsing thoroughly</p>\r\n\r\n<p><strong>Care Instructions</strong><br />\r\n- Store in a cool &amp; dry place<br />\r\n- Use before 24 months from manufacturing date. Keep out of reach of children unless under adult supervision. Avoid contact with eyes.</p>",
`,
};

const Details = () => {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.titleSubContainer}>
            <Text style={styles.title}>Red apple</Text>
            <AntDesign name="hearto" size={24} color={'#7C7C7C'} />
          </View>
          <Text style={styles.info}>1kg, Price</Text>
        </View>
        <View style={styles.secondContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => null}
              style={styles.quantityContainer}>
              <Icon name="minus" size={24} color={'#B3B3B3'} />
            </TouchableOpacity>
            <View style={styles.button}>
              <Text style={styles.quantity}>1</Text>
            </View>
            <TouchableOpacity
              onPress={() => null}
              style={styles.quantityContainer}>
              <Icon name="plus" size={24} color={colors.green} />
            </TouchableOpacity>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>$4.99</Text>
          </View>
        </View>
      </View>
      <View style={styles.flex}>
        <Info />
      </View>
    </ScrollView>
  );
};

const Info = () => {
  const systemFonts = [
    ...defaultSystemFonts,
    'Poppins-SemiBold',
    'Poppins-Regular',
  ];
  return (
    <View style={{width: layout.widthp}}>
      <RenderHtml
        contentWidth={layout.widthp}
        source={source}
        tagsStyles={{
          strong: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 20,
            color: 'black',
          },
          p: {
            fontFamily: 'Poppins-Medium',
            color: '#7C7C7C',
            fontSize: 15,
          },
        }}
        systemFonts={systemFonts}
      />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    // flex: 1,
    // backgroundColor: 'pink',
  },
  detailContainer: {
    // flex: 1,
  },
  flex: {
    // flex: 2,
  },
  titleContainer: {
    height: 100,
    // backgroundColor: 'pink',
    width: layout.widthp,
  },
  titleSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: 'black',
  },
  info: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  button: {
    borderColor: '#F0F0F0',
    borderWidth: 1,
    // width: 40,
    // height: 40,
    borderRadius: 15,
    // padding: 16,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityContainer: {
    marginHorizontal: 15,
  },
  quantity: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  secondContainer: {
    width: layout.widthp,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: 'black',
  },
  detailTitleContainer: {
    paddingVertical: 5,
  },
  detailTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: 'black',
  },
  detail: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#7C7C7C',
  },
});
