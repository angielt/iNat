/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  FlatList,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { URL, URLSearchParams } from 'react-native-url-polyfill';
import Collapsible from 'react-native-collapsible';
import { getObservations } from './helpers';
import ObservationCard from './components/ObservationCard';
import Filter from './components/Filter';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [query, updateQuery] = useState('');
  const [params, updateParams] = useState({});
  const [data, setData] = useState('');
  const [error, setError] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true); // Filter form toggle
  const [isLoading, setIsLoading] = useState(false); // Spinner toggle

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const search = async (query, params) =>{
    let paramsObj = params
    if(query.length != 0){
        paramsObj = {
            ...params,
            taxon_name:query
        }
    }
    // converting paramsObj to Url paramete string
    let parameters = new URLSearchParams(paramsObj);
    let stringParams = '?'+parameters.toString();

    setIsLoading(true) 

    // fetch
    getObservations(query, stringParams)
    .then((response) => response.json())
    .then((json) => {
        setData(json.results)
        setIsLoading(false)
    })
    .catch((error) => console.error("Error" + error))
  }

  // callback for Filter
  const applyParams = (params) =>{
    updateParams(params)
  }

  // Render observation for FlatList
  const renderItem = ({ item }) => {
      let photos = item.photos;
      let url  = require('./assets/image-unavailable.jpg')
      let name = 'Unknown'
      if(photos.length != 0){
          url = photos[0].url
          url = url.replace('square', 'medium');
          url = {uri: url}
      }
      if(item.taxon != undefined){
          name = item.taxon.name
      }
      return(
        <ObservationCard name={name} url={url} ></ObservationCard>
      )
  };

  return (
    <SafeAreaView style={[backgroundStyle, {flex:1}]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} accessible={true} accessibilityLabel='Phone Status bar'/>
        <View 
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            flex:1,
            padding:10
          }}>
            <View style={styles.header}>
              <Text style={styles.title} 
                    accessible={true} 
                    accessibilityLabel='Observations' 
                    accessibilityRole='header'>
                        Observations
                </Text>
              <TouchableOpacity style={[styles.filterButton, styles.button]} 
                                onPress={()=> setIsCollapsed(!isCollapsed)} 
                                accessible={true} 
                                accessibilityLabel="Filter Options Button" 
                                accessibilityHint='opens filter options dropdown form below search' 
                                accessibilityRole='togglebutton' 
                                expanded={isCollapsed}>
                  <Text style={styles.buttonText} accessibilityLabel="Filter Button">Filters</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.searchBar}>
                <TextInput style={styles.search} 
                            placeholder='Search' 
                            value={query} 
                            onChangeText={updateQuery} 
                            accessible={true} 
                            accessibilityLabel='Search Bar' 
                            accessibilityRole='search'></TextInput>
                <TouchableOpacity  style={[styles.searchButton, styles.button]} 
                                    onPress={()=>{ search(query, params)}} 
                                    accessible={true} 
                                    accessibilityLabel="Search ahah">
                    <Text style={styles.buttonText}>Go</Text>
                </TouchableOpacity>
            </View>
            <Collapsible collapsed={isCollapsed} 
                            style={styles.filterCollapsible} 
                            accessible={true} 
                            accessibilityLabel='Filter Dropdown'>
                <Filter applyParams={applyParams} collapse={setIsCollapsed} search={search} query={query}></Filter>
            </Collapsible>
            {
                (isLoading) ? 
                <ActivityIndicator style={styles.spinner} 
                                    size="large" 
                                    accessible={true} 
                                    accessibilityLabel='Loading' 
                                    accessibilityRole='progressbar'>                    
                </ActivityIndicator>
                :
                <FlatList contentContainerStyle={styles.cardList} data={data} renderItem={renderItem} keyExtractor={(item)=> item.id}></FlatList>

            }
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    cardList:{
        flexDirection:'column',
        alignItems:'center'
    },
    title:{
        fontSize:30,
    },
    header:{
        padding:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    button:{
        padding:10,
    },
    buttonText:{
        color:'white',
        fontSize:15,
        fontWeight:'600'
    },
    searchBar:{
        padding:10,
        paddingBottom:5,
        flexDirection:'row',
    },
    search:{
        padding:10,
        flexGrow:2,
        borderWidth:1,
        borderColor:'darkgray',
        marginRight:5
    },
    searchButton:{
        backgroundColor:'green',
        paddingLeft:15,
        paddingRight:15
    },
    filterButton:{
        backgroundColor:'gray'
    },
    filterCollapsible:{
      
    },
    spinner:{
        paddingTop:40
    }
});

export default App;
