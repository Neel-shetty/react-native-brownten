import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Image} from 'react-native';
import {Text, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {launchImageLibrary} from 'react-native-image-picker';

const {height: heightScreen} = Dimensions.get('screen');

interface InputProps {
  image:
    | {
        fileName: string;
        fileSize: number;
        height: number;
        type: string;
        uri: string;
        width: number;
      }
    | undefined;
  setImage: any;
  label: string;
}

const ImageInput = ({image, setImage, label}: InputProps) => {
  async function selectImage() {
    const result = await launchImageLibrary({mediaType: 'photo'});
    console.log('🚀 ~ file: ImageInput.tsx:18 ~ selectImage ~ result', result);
    //@ts-expect-error
    setImage(result?.assets[0]);
  }
  return (
    <>
      <Text style={styles.inputLabel}>{label}</Text>
      <TouchableOpacity onPress={selectImage}>
        <View style={styles.inputContainer}>
          <Text style={[styles.input, image && {color: 'black'}]}>
            Select Image
          </Text>
          <Image
            source={{
              uri: image
                ? image.uri
                : 'https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg',
            }}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = EStyleSheet.create({
  inputLabel: {
    fontSize: '1rem',
    lineHeight: '1rem',
    height: '1rem',
    fontFamily: '$gilroyMedium',
    color: '$darkGreyColour',
  },
  inputContainer: {
    paddingVertical: heightScreen * 0.012,
    borderBottomWidth: 1.0,
    borderBottomColor: '$lightGreyColour',
    marginBottom: heightScreen * 0.022,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    fontFamily: '$gilroyMedium',
    fontSize: '1.125rem',
    lineHeight: '1.125rem',
    paddingVertical: heightScreen * 0.012,
    // borderBottomWidth: 1.0,
    // borderBottomColor: '$lightGreyColour',
    // marginBottom: heightScreen * 0.022,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 30,
  },
});

export default ImageInput;
