
import axios from 'axios'
//expose axios to global object
window.axios = axios;

window.axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token')

window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

window.$ = window.jQuery = require('jquery');
require('bootstrap');
