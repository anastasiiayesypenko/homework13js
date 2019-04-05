'use strict'
import '../sass/style.scss';
import Model from './model';
import View from './view.js';
import Controller from './controller.js';

const model = new Model();
const view = new View();

let controller = new Controller(model, view);
controller.loadPage();




