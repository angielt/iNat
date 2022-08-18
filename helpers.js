import { URL, URLSearchParams } from 'react-native-url-polyfill';

let url = 'https://api.inaturalist.org/v1'

export function getObservations(query, params){

    return fetch(url + '/observations' + params, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}