import log4js from "log4js";

log4js.configure({
  appenders: {
    loggConsole: { type: `console` },
    loggFileWarn: { type: `file`, filename: `./logger/warn.log` },
    loggFileError: { type: `file`, filename: `./logger/error.log` },
  },
  categories: {
    default: { appenders: [`loggConsole`], level: `Debug` },
    warnArchive: { appenders: [`loggFileWarn`], level: `warn` },
    errorArchive: { appenders: [`loggFileError`], level: `error` },
  },
});

export default log4js;
