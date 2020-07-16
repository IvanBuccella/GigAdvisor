import config from "../env.config.json";

export class Utils {
  constructor() {}

  getApiEndpoint() {
    return config.API_ENDPOINT;
  }

  getUserToken() {
    let auth: any;
    auth = localStorage.getItem("ga-auth");
    if (auth != undefined) {
      let token = JSON.parse(auth).token;
      if (token != undefined) {
        return token;
      }
    }
    return null;
  }

  isAuthenticatedUser() {
    let token = this.getUserToken();
    if (token != null) {
      return true;
    }
    return false;
  }

  async postCall(url: string, data: string) {
    let token = this.getUserToken();
    let headers = {};
    if (token != null) {
      headers = {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      };
    } else {
      headers = {
        "Content-Type": "application/json",
      };
    }
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: headers,
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: data, // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
}
