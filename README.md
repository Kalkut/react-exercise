# Commenting Redux Web App
> Technical exercise done in less than a day for an interview

This is a commenting web app done with React/Redux on the client side and Node.js / MongoDB on the server-side. You can check it on http://bmakita.evennode.com.

## Install this project

You need to have MongoDB installed. To install the actual app 

```bash
$ git clone git@github.com:Kalkut/react-exercise.git && cd react-exercise
$ script/install
```

or

```bash
$ git clone git@github.com:Kalkut/react-exercise.git && cd react-exercise
$ npm install
```

## Running this project

If you ommit MongoDB, your data will be stored on your localStorage.
You will be warned about eventual Mongo errors

```bash
$ mongod
$ script/run
```

or

```bash
$ mongod
$ npm start
```
