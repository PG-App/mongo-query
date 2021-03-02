import axios from 'axios';
import { API } from '../config';

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('NEST', JSON.stringify(data));
        next();
    }
};

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('NEST')) {
        return JSON.parse(localStorage.getItem('NEST'));
    } else {
        return false;
    }
};

export const signout = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('NEST');
        next();
        return fetch(`${API}/signout`, {
            method: 'GET'
        })
            .then(response => {
                console.log('signout', response);
            })
            .catch(err => console.log(err));
    }
};