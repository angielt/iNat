import React, {useState} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import {
widthPercentageToDP as wp,
heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ObservationCard = ({name, url}) =>{
    console.log(name)
    return(
        <View style={[styles.card, styles.shadowProp]} accessible={true} accessibilityLabel={'photo of '+name}>
            <Image
                style = {styles.image}
                source={url}
            />
            <View style={styles.description}>
                <Text style={styles.descriptionTitle} accessible={true}>{name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
card:{
    backgroundColor:'white',
    paddingBottom:10,
    margin:5,
    borderWidth:0.5,
    borderColor:'darkgray'
},
image:{
    height:wp(80),
    width:wp(80)
},
description:{
    height:50
},
descriptionTitle:{
    fontSize:18,
    fontWeight:'500',
    padding:10
},
shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
},
});

export default ObservationCard;