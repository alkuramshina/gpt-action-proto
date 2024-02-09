export enum LogType {
  query = "query data",
  body = "body data",
  header = "header data"
};

export function setLogMessage(type: LogType, data: object) {
  return {
    type: type,
    ...data
  };
};