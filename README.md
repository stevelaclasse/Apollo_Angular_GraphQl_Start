# Apollo_Angular_GraphQl_Start

Here i am just going to give my configuration and code for the GraphQl client Apollo with Angular.

The indications of the official documentation did'nt worked for me and it tooks me a while to find a working code for the Query, Mutation and Subscription.

It is supposed that you already have running GraphQl where Queries, Mutations and Subscriptions.

I will just paste the content of the 4 most used files when you start a new project:

- graphql.module.ts

- app.module.ts

- app.component.ts

- (just a small part) app.component.html

To this 4 files i have added the file 'types.ts' for testing.

To eventually use my files you may have to create a new Angular Project (ng new name_of_your_project) and in the project directory add Apollo (ng add apollo-angular).

For my example:

- The query allLocations on the server is returning an array of Location
- The mutation createLocation is returning the new created Location
- The subscription subscribeAllLocations is returning an array of Location every time one Location is created, updaded or deleted

Hope it helps someone starting with the GraphQl client Apollo with ANgular !!
