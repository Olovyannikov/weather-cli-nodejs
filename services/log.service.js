import chalk from 'chalk';
import dedent from "dedent-js";

export const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

export const printSuccess = (success) => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + success);
};

export const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(' HELP ')}
            Без параметров - вывод погоды
            -s [CITY] для установки города
            -h для вывода помощи
            -t [API_KEY] для сохранения токена
        `
    );
};