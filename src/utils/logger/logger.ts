const chalk = require("chalk");

export const success = (succesLog: string): void => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[${chalk.green("OK")}] > ${succesLog}`);
  } else {
    console.log(`[OK] > ${succesLog}`);
  }
};

export const error = (errorLog: string): void => {
  if (process.env.NODE_END === "development") {
    console.log(`[${chalk.red("ERROR")}] > ${errorLog}`);
  } else {
    console.log(`[ERROR] > ${errorLog}`);
  }
};

export const warning = (warningLog: string): void => {
  if (process.env.NODE_END === "development") {
    console.log(`[${chalk.hex("#ff9900").italic("WARNING")}] > ${warningLog}`);
  } else {
    console.log(`[WARNING] > ${warningLog}`);
  }
};
