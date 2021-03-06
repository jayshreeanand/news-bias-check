# News Bias Check

BiasCheck is a Decentralised application to help combat fake news and reduce bias in information consumption. It has a chrome extension that uses APIs on a backend canister deployed on IC network which shows bias/accuracy info about all news articles online.

The chrome extension works across various social media and news sites and shows information about bias and accuracy of the article.

# Architecture

<img width="950" src="https://user-images.githubusercontent.com/5363211/174948788-134ff32e-7a4c-48b6-86df-11159631e9e5.jpeg"/>

# Project Setup

By default, creating a new project adds this README and some template files to your project directory. You can edit these template files to customize your project and to include your own code to speed up the development cycle.

To get started, you might want to explore the project directory structure and the default configuration file. Working with this project in your development environment will not affect any production deployment or identity tokens.

To learn more before you start working with news bias check, see the following documentation available online:

- [Quick Start](https://sdk.dfinity.org/docs/quickstart/quickstart-intro.html)
- [SDK Developer Tools](https://sdk.dfinity.org/docs/developers-guide/sdk-guide.html)
- [Motoko Programming Language Guide](https://sdk.dfinity.org/docs/language-guide/motoko.html)
- [Motoko Language Quick Reference](https://sdk.dfinity.org/docs/language-guide/language-manual.html)
- [JavaScript API Reference](https://erxue-5aaaa-aaaab-qaagq-cai.raw.ic0.app)

If you want to start working on your project right away, you might want to try the following commands:

```bash
cd dnews/
dfx help
dfx config --help
```

## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, your application will be available at `http://localhost:8000?canisterId={asset_canister_id}`.

Additionally, if you are making frontend changes, you can start a development server with

```bash
npm start
```

Which will start a server at `http://localhost:8080`, proxying API requests to the replica at port 8000.

### Note on frontend environment variables

If you are hosting frontend code somewhere without using DFX, you may need to make one of the following adjustments to ensure your project does not fetch the root key in production:

- set`NODE_ENV` to `production` if you are using Webpack
- use your own preferred method to replace `process.env.NODE_ENV` in the autogenerated declarations
- Write your own `createActor` constructor

## Chrome Extension

Load the 'chrome_extension' folder in chrome://extensions page
This will add "Tiger - Bias check" chrome extension to your chrome browser

<img width="598" alt="Screenshot 2022-04-21 at 7 57 32 AM" src="https://user-images.githubusercontent.com/5363211/164374265-92f11928-c6b8-4172-9426-527183412592.png">

### Social media feed

This is how news results on google look

<img width="735" alt="Screenshot 2022-04-21 at 8 26 16 AM" src="https://user-images.githubusercontent.com/5363211/164374289-db607265-f752-47e6-b857-dd93efa6fde4.png">

This is how news results on facebook/twitter/reddit etc looks

<img width="717" alt="Screenshot 2022-04-21 at 8 12 01 AM" src="https://user-images.githubusercontent.com/5363211/164374298-502ef089-9b35-46d7-8159-66de5b87f229.png">

## Chrome extension popup

The popup when clicking on the chrome extension shows bias rating, accuracy rating as well as similar and differing news articles

<img width="950" alt="Screenshot 2022-04-21 at 8 10 37 AM" src="https://user-images.githubusercontent.com/5363211/164374316-f74ffa72-87ed-4c9c-a03a-09cdd34c1f27.png">
