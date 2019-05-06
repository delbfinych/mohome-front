import axios from "axios";
import CryptoJs from "crypto-js";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export default class MohomeApiService {
  _apiBase = "http://213.141.130.153/Api";
  signIn = async body => {
    body.PasswordHash = CryptoJs.SHA256(body.PasswordHash).toString(
      CryptoJs.enc.Hex
    );
    return axios.post(this._apiBase + "/Token/Sign-in", JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json"
      }
    });
  };
  signUp = async body => {
    body.password = CryptoJs.SHA256(body.password).toString(CryptoJs.enc.Hex);
    return axios.post(this._apiBase + "/Token/Sign-up", JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json"
      }
    });
  };
  validateUser = async email => {
    return axios.get(this._apiBase + "/Users?email=" + email, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  };
  getAlbums = async () => {
    await this._updateToken();
    return axios.get(this._apiBase + "/Photo/Album", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("id_token")
      }
    });
  };
  createAlbum = async body => {
    await this._updateToken();
    return axios.post(this._apiBase + "/Photo/Album", JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("id_token")
      }
    });
  };
  _updateToken = async () => {
    if (Date.now() >= (cookies.get("expiresIn") - 1) * 1000)
      axios
        .post(
          this._apiBase + "/Token/Refresh-token",
          JSON.stringify({
            refreshToken: cookies.get("refreshToken")
          }),
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          console.log(res);
          cookies.set("id_token", res.data.response.accessToken);
          cookies.set("expiresIn", res.data.response.expiresIn);
          cookies.set("refreshToken", res.data.response.refreshToken);
        });
  };
}
