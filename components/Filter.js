import React, {useState} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
    TouchableOpacity
  } from 'react-native';
import {
widthPercentageToDP as wp,
heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Filter = (props) =>{
    // filter options
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const applyFilters = () => {
        let filters = {
            day: day,
            month: month,
            year: year,
            taxon_name:props.query
        }
        Object.keys(filters).forEach(key => {
            if (filters[key] === '') {
              delete filters[key];
            }
          });
          props.applyParams(filters);
          props.collapse(true);
          props.search(props.query, filters);
    }

    const clearFilters = () => {
        let filters = {
            day: '',
            month: '',
            year: '',
            taxon_name:''
        }
        setDay('');
        setMonth('');
        setYear('');
        props.applyParams(filters);
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Filter Options</Text>
            <View style={styles.filterOption}>
                <Text>Exact Day</Text>
                <TextInput style={styles.textInput} placeholder='DD' value={day} onChangeText={setDay}></TextInput>
            </View>
            <View style={styles.filterOption}>
                <Text>Exact Month</Text>
                <TextInput style={styles.textInput} placeholder='MM' value={month} onChangeText={setMonth}></TextInput>
            </View>
            <View style={styles.filterOption}>
                <Text>Exact Year</Text>
                <TextInput style={styles.textInput} placeholder='YYYY' value={year} onChangeText={setYear}></TextInput>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={[styles.submit, styles.button]} onPress={()=>applyFilters()}>
                    <Text style={[styles.buttonText, {color:'white'}]}>Update Search</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.reset, styles.button]} onPress={()=> clearFilters()}>
                    <Text style={styles.buttonText}>Reset Filters</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#eeedef',
        padding:10,
        borderWidth:1,
        borderColor:'darkgray',
        marginRight:10,
        marginLeft:10,
    },
    title:{
        fontSize:17,
        fontWeight:'600'
    },
    filterOption:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:5,
        marginBottom:5
    },
    textInput:{
        backgroundColor:'white',
        padding:5
    },
    submit:{
        backgroundColor:'#3379b7'
    },
    reset:{
        backgroundColor:'white'
    },
    button:{
        borderColor:'darkgray',
        borderWidth:1,
        padding:10,
        margin:5
    },
    buttonText:{
        fontSize:16
    },
    footer:{
        flexDirection:'row',
    }
});

export default Filter;