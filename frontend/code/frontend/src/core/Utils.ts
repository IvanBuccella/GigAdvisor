import config from "../env.config.json";

export class Utils {
  constructor() {}

  getLastItem(path: string) {
    return path.substring(path.lastIndexOf("/") + 1);
  }

  getApiEndpoint(publicURL = false) {
    if (publicURL) {
      return config.PUBLIC_API_ENDPOINT;
    }
    return config.API_ENDPOINT;
  }

  setUserToken(token: any) {
    const data = JSON.stringify({ token: token });
    localStorage.setItem("ga-auth", data);
  }

  pageProtected(from: string = "") {
    if (!this.isAuthenticatedUser()) {
      this.pageRedirect("login?from=" + from);
    }
  }

  pageRedirect(to: string | null, fallback: string = "") {
    if (to == null) {
      to = fallback;
    }
    window.location.href = "/" + to;
  }

  getUserToken() {
    let auth: any;
    auth = localStorage.getItem("ga-auth");
    if (auth != undefined && auth.length > 0) {
      let token = JSON.parse(auth).token;
      if (token != undefined && token.length > 0) {
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

  getRedirectPage() {
    return this.getUrlParameter("from");
  }

  getUrlParameter(parameterName: string) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameterName);
  }

  async postCall(url: string, data: string) {
    return this.call("POST", url, data, "");
  }

  async patchCall(url: string, data: string) {
    return this.call("PATCH", url, data, "");
  }

  async call(type: string, url: string, data: any, contentType: string) {
    let token = this.getUserToken();
    let headers = {};
    if (contentType == undefined || contentType == "") {
      contentType = "application/json";
    }
    if (token != null) {
      headers = {
        "Content-Type": contentType,
        Authorization: "Token " + token,
      };
    } else {
      headers = {
        "Content-Type": contentType,
      };
    }
    const response = await fetch(this.getApiEndpoint() + "/" + url, {
      method: type, // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: headers,
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: data, // body data type must match "Content-Type" header
    });
    return {
      status: response.status != 201 ? false : true,
      data: await response.json(),
    }; // parses JSON response into native JavaScript objects
  }
}
