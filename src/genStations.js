// @flow

import type {Location} from './genLocation';

type Mode = "Tube" | "Overground" | "DLR";

export type Station = $ReadOnly<{
    name: string,
    modes: $ReadOnlyArray<Mode>,
}>;

export default async function genStations(location: Location): Promise<$ReadOnlyArray<Station>> {
    const apiUrl = `https://api.tfl.gov.uk/StopPoint/?lat=${location.lat}&lon=${location.lon}&stopTypes=NaptanMetroStation&radius=1000`;
    try {
        const data = await fetch(apiUrl);
        const body = await data.json();
        return filterNulls(body.stopPoints.map(parseStations));
    } catch(err) {
        throw new Error(`Couldn't fetch nearest stations`);
    }
}

function parseStations(station): ?Station {
    if (station != null) {
        const {commonName: name, modes} = station;
        if (name != null && modes != null) {
           return ({
               name,
               modes: filterNulls(modes.map(getModeEnum)),
           });
        }
    }
    return null;
}

function getModeEnum(mode): ?Mode {
    if (typeof mode !== 'string') return null;
    switch(mode.toLowerCase()) {
        case 'tube':
            return 'Tube';
        case 'overground':
            return 'Overground';
        case 'dlr':
            return 'DLR';
        default:
            return null;
    }
}

function filterNulls(arrayWithNulls: $ReadOnlyArray<any>): $ReadOnlyArray<any> {
    return arrayWithNulls.filter(element => element != null);
}