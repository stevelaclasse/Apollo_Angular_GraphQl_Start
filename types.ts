import { type } from 'os'

export type Location = {
id: number;
name: string;
serial: number;
}

export type LocationInput = {
    name: string;
    }

export type MyQuery ={
    allLocations: Location[];
}

export type MyMutation ={
    createLocation:Location;
}

export type MySubscription = {
    subscribedLocations : Location[]
}
