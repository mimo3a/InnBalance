{/**
    *This is still work in progress.
    *The database is already filled with the places you can find in InnBalance/src/data/places.json
    *It is yet to replace the AsyncStorage that we are currently using. 
     */}

const baseURL = 'https://innbalance-default-rtdb.europe-west1.firebasedatabase.app/';
const placeData = require('../data/places.json');

export async function uploadAllPlaces(){
    try {
        placeData.forEach(uploadPlace);
    } catch (error) {
        console.log('An error occured while trying to upload all data to firebase.', error);
    }
}

export async function uploadPlace(placeData){
    try {
        const res = await fetch(`${baseURL}/place.json`,{
            method: 'POST',
            body: JSON.stringify(placeData),
        });
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.log('An error occured while trying to upload data to firebase.', error);
    }
}

export async function getAllPlaces(){
    try {
        const res = await fetch(`${baseURL}/place.json`);
        const data = await res.json();
        
        const places = Object.keys(data).map(key => {
            const placeEntry = data[key];
            placeEntry.id = key;
            return placeEntry;
        })
        return places;

    } catch (error) {
        console.log('An error occured while trying to get all data from firebase', error);
    }
}
//TBD
//updatePlace()
//deletePlace()
