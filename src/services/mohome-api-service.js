import axios from "axios";
import CryptoJs from "crypto-js";
import Cookies from "js-cookie";
export default class MohomeApiService {
  _apiBase = "http://mohome.ml/Api/v1";
  // _apiBase = "http://localhost/Api";
  signIn = async body => {
    body.PasswordHash = CryptoJs.SHA256(body.PasswordHash).toString(
      CryptoJs.enc.Hex
    );
    return axios.post(this._apiBase + "/Token/signin", JSON.stringify(body), {
      headers: { "Content-Type": "application/json" }
    });
  };
  signUp = async body => {
    body.password = CryptoJs.SHA256(body.password).toString(CryptoJs.enc.Hex);
    return axios.post(this._apiBase + "/Token/signup", JSON.stringify(body), {
      headers: { "Content-Type": "application/json" }
    });
  };
  validateUser = async email => {
    return axios.get(this._apiBase + "/users?email=" + email, {
      headers: { "Content-Type": "application/json" }
    });
  };
  getAlbums = async () => {
    await this._updateToken();
    return axios.get(this._apiBase + "/PhotoAlbums", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("id_token")
      }
    });
  };
  getAlbumInfo = async id => {
    await this._updateToken();
    return axios.get(this._apiBase + "/PhotoAlbums/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("id_token")
      }
    });
  };
  createAlbum = async body => {
    await this._updateToken();
    return axios.post(this._apiBase + "/PhotoAlbums", JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("id_token")
      }
    });
  };
  changeAlbum = async (id, body) => {
    await this._updateToken();
    return axios.put(
      this._apiBase + "/PhotoAlbums/" + id,
      JSON.stringify(body),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("id_token")
        }
      }
    );
  };
  deleteAlbum = async id => {
    await this._updateToken();
    return axios.delete(this._apiBase + "/PhotoAlbums/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("id_token")
      }
    });
  };
  uploadPhoto = async body => {
    await this._updateToken();
    return axios.post(this._apiBase + "/Photos", body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + Cookies.get("id_token")
      }
    });
  };
  getPhoto = async name => {
    await this._updateToken();
    return axios.get(this._apiBase + "/Photos/" + name, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + Cookies.get("id_token")
      }
    });
  };
  changePhotoDescription = async (name, body) => {
    await this._updateToken();
    return axios.patch(
      this._apiBase + "/Photos/" + name,
      JSON.stringify(body),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("id_token")
        }
      }
    );
  };

  getPhotosByAlbumId = async (id = "") => {
    await this._updateToken();
    return axios.get(this._apiBase + "/Photos?albumId=" + id, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + Cookies.get("id_token")
      }
    });
  };
  deletePhoto = async name => {
    await this._updateToken();
    return axios.delete(this._apiBase + "/Photos/" + name, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("id_token")
      }
    });
  };
  // Сделать автоматический запуск функции раз в 55 минут
  _updateToken = async () => {
    if (Date.now() >= (Cookies.get("expiresIn") - 60) * 1000) {
      Cookies.remove("expiresIn", { path: "/" });
      Cookies.remove("id_token", { path: "/" });
      axios
        .post(
          this._apiBase + "/Token/Refresh-token",
          JSON.stringify({ refreshToken: Cookies.get("refreshToken") }),
          { headers: { "Content-Type": "application/json" } }
        )
        .then(res => {
          console.log(res);
          Cookies.remove("refreshToken", { path: "/" });
          Cookies.set("id_token", res.data.response.accessToken, { path: "/" });
          Cookies.set("expiresIn", res.data.response.expiresIn, { path: "/" });
          Cookies.set("refreshToken", res.data.response.refreshToken, {
            path: "/"
          });
        });
    }
  };
}
