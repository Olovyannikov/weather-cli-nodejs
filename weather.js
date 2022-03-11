#!/usr/bin/env node
import {getArgs} from './helpers/args.js';
import {printError, printHelp, printSuccess, printWeather} from "./services/log.service.js";
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getIcon, getWeather} from "./services/api.service.js";


const saveToken = async (token) => {
    if (!token.length) {
        printError('Invalid Token');
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Token is saved');
    } catch (e) {
        printError(e.message);
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('Invalid City');
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('City is saved');

    } catch (e) {
        printError(e.message);
    }
}

const getForecast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
        const weather = await getWeather(city);
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch (e) {
        if (e?.response?.status === 404) {
            printError('Invalid city name');
        } else if (e?.response?.status === 401) {
            printError('Invalid Token');
        } else {
            printError(e.message);
        }
    }
}

const initCLI = async () => {
    const args = getArgs(process.argv);

    if (args.h) {
        return printHelp();
    }

    if (args.s) {
        return saveCity(args.s);
    }

    if (args.t) {
        return saveToken(args.t);
    }

    return await getForecast();
};

initCLI();