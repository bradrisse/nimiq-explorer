# Nimiq Explorer

## What is This?
This is the frontend source code for [NimiqExplorer.com](https://nimiqexplorer.com). The explorer allows you to view all the details of the blockchain is a simple and visual way. This can be used to verify block rewards, transactions, or just to see blockchain statistics. The backend sourcecode is located at [https://github.com/bradrisse/nimiq-explorer-server](https://github.com/bradrisse/nimiq-explorer-server) and the Nimiq core is located at [https://github.com/nimiq-network/core](https://github.com/nimiq-network/core).

## How does it work?
A Nimiq nano client is started when visting the site to get up to head block heights. Various calls to the backend server give access to the full blockchain.

## How was it built?
The front end was built using [ReactJs](https://reactjs.org/) and [Material UI](https://material-ui-next.com/) along with various other packages that can be seen in `package.json`

## How do I contribute?
Use the quickstart guide to run the app locally, add you changes to the frontend and/or backend server, then create a pull request.

## QuickStart Guide

1. Download Clone `git clone https://github.com/bradrisse/nimiq-explorer`
    
2. Install Packages `yarn` or `npm install`
    
3. Launch App `yarn start`
    - The frontend should automatically open at [http://localhost:3000](http://localhost:3000)
    
## Shoutouts

I would like to give a shoutout to [@sisou](https://github.com/sisou) for creating [Nimiq Watch](https://nimiq.watch) and was the inspiration for creating this.

I would also like to give a shoutout to the Nimiq Team for creating an amazing broser-based blockchain [Nimiq](https://nimiq.com)
    
