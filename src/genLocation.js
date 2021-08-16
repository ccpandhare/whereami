// @flow

import geolocator from 'geolocator';

export type Location = $ReadOnly<{
    lat: number,
    lon: number,
}>;

export default function genLocation(): Promise<Location> {
   return new Promise<Location>((resolve, reject) => {
    geolocator.locate({
        enableHighAccuracy: true,
        timeout: 5000,
        maximumWait: 5000,
        maximumAge: 0,
        desiredAccuracy: 100,
        fallbackToIP: true,
    }, (err, location) => {
        if (err) {
            reject(err);
        } else {
            const {coords: {latitude: lat, longitude: lon}} = location;
            resolve({lat, lon});
        }
    });
    })
}