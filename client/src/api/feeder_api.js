import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class FeederAPI {
   // the token for interactive with the API will be stored here.
  static token;

  //there are multiple ways to pass an authorization token, this is how you pass it in the header.
  //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API CALL:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${FeederAPI.token}`}
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.reponse.data.error.message;
      throw Array.isArray(message) ? message: [message];
    }
  }

  // Individual API Routes

  /** Signup for site (corresponds to App.js) */
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Login for site (corresponds to App.js) */
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Get Current User (corresponds to App.js) */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Saves the User Profile page after updates (corresponds to ProfileForm.js) */
  static async profileSaver(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /** Get Recipes filtered by a keyword */
  static async getRecipes(keywords) {
    let res = await this.request("recipes", { keywords });
    return res.recipes;
  }

  /** Get Recipe by id */
  static async getRecipe(id) {
    let res = await this.request(`recipes/${id}`);
    return res.recipe
  }

  /** Favorite a Recipe */
  static async makeFavorite(username, id) {
    await this.request(`users/${username}/recipes/${id}`, {}, "post");
  }
}

export default FeederAPI;