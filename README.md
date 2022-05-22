# Getting Started with Podcastplayer


## Setup
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 

In the project directory, run:
### `npm install`


### Add search functionality to Podcastplayer (optional)
You can use the Podcastplayer to read RSS. If you want to, you can also use it to search available Podcasts from an API.
To connect the podcastplayer to Podchaser: 
1. Subscribe at https://www.podchaser.com/ and get a client_id and a client_secret. 
2. To get a token, send a post request to the endpoint https://api.podchaser.com/graphql with GraphQL body:
```
mutation {
    requestAccessToken(
        input: {
            grant_type: CLIENT_CREDENTIALS
            client_id: "[your client id]"
            client_secret: "[your client secret]"
        }
    ) {
        access_token
       }
   }`
```
5. Create .env file in the project directory and add the line `REACT_APP_PODCHASER_ACCESS_TOKEN=[your token]`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
