import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import 'vendor/index.js'; //bootstrap loader-->

import App from './components/index.js';

const render = (Component) => {
	ReactDOM.render(<App />, document.getElementById('app'));
};

render(App);
if (module.hot) {
 	module.hot.accept('./app.js', () => {
 		render(App);
 	});
 }
	