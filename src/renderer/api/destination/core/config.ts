export const CONFIG = {

  DEFAULT_HEADERS: new Headers({
    Accept: "application/json",
    "Content-Type": "application/json"
  }),

  // Some kind of remote server.
  SERVER_URL: process.env.SERVER_URL as string,

};
