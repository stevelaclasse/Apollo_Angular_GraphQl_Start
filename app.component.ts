import { Component,OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Location,MyQuery,MyMutation,MySubscription, LocationInput} from './types'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  constructor (private apollo:Apollo){}
  //Token for authentification, just a parameter for our Queries, Mutation and Subscription
  sso: string

  //Location for Mutation
  location : Location

  //Locations for Subscriptions
  allSubscribedLocations: Location[]  //Raw Data Array received from server
  allSubscribedLocationsArray = [] //converted data into Array of Location


  //Location for the Queries
  newLocations: Location[]; //for Query 1
  Locations: Observable<Location[]>; //For Query 2
  allLocations : Location[] //for Query 3

  myLocationInput : LocationInput


  ngOnInit() {

this.sso = ""  //value of the Token
//Query

//Query 1
 this.apollo.query<MyQuery>({
  query: gql`
  query locations($sso: String!){
    allLocations(ssoToken: $sso)
    {
      id,
      name
    }
  }`,
  variables: {
    sso: this.sso
  }
}).subscribe(({data}) => {
  this.newLocations = data.allLocations;
  console.log('Data received Query 1: ' , data.allLocations);
}); 


//Query 2
this.Locations = this.apollo.watchQuery<MyQuery>({
  query: gql`
  query locations($sso: String!){
    allLocations(ssoToken: $sso)
    {
      id,
      name
    }
  }`,
  variables: {
    sso: this.sso
  }
}).valueChanges.pipe(
  map(result => result.data.allLocations)
); 


//Query 3
this.apollo.watchQuery<MyQuery>({
  query: gql`
  query locations($sso: String!){
    allLocations(ssoToken: $sso)
    {
      id,
      name
    }
  }`,
  variables: {
    sso: this.sso
   },
}).valueChanges.subscribe(({data})=>{
  this.allLocations = data.allLocations;
  console.log('Data received Query 3: ' , data.allLocations);
}); 



//Mutation

this.myLocationInput = {name:"Par"}

this.apollo.mutate<MyMutation>({
  mutation : gql`
  mutation location($sso: String!,$myLocationInput:LocationInput!){
    createLocation(ssoToken: $sso, locationInput:$myLocationInput)
    {
      id,
      name
    }
  }`,
  variables: {
    sso: this.sso,
    myLocationInput:this.myLocationInput
  }
} 
  
).subscribe(({ data }) => {
  this.location = data.createLocation;
  console.log('added data', data.createLocation);
},(error) => {
  console.log('there was an error sending the query', error);
});




//Subscription
this.apollo.subscribe({
  query : gql`
  subscription subscribedLocations($sso: String!){
    subscribeAllLocations(ssoToken: $sso)
    {
      id,
      name
    }
  }`,
  variables: {
    sso: this.sso
  }
}).subscribe(res => {
  this.allSubscribedLocations = (res.data as any );
  
  this.allSubscribedLocationsArray = []

  for( let i in this.allSubscribedLocations) {  
  this.allSubscribedLocationsArray.push(this.allSubscribedLocations[i]);
}

this.allSubscribedLocationsArray = this.allSubscribedLocationsArray[0]
  console.log("Data Recieved From Subscription:",this.allSubscribedLocationsArray)
  
}); 


  }
  title = 'frontend-test';
}
