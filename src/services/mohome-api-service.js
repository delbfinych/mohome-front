import axios from "axios";
import Cookies from "js-cookie";
import { serialize } from "../helpers";

export default class MohomeApiService {
  constructor() {
    this._updateToken();
  }
  _apiBase = "http://mohome.ml/Api/v1";

  signIn = async body => {
    return axios
      .post(this._apiBase + "/Token/signin", JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(function(res) {
        Cookies.set("id_token", res.data.response.accessToken, {
          path: "/"
        });
        Cookies.set("expiresIn", res.data.response.expiresIn, {
          path: "/"
        });
        Cookies.set("refreshToken", res.data.response.refreshToken, {
          path: "/"
        });
      });
  };
  signUp = async body => {
    return axios
      .post(this._apiBase + "/Token/signup", JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(function(res) {
        Cookies.set("id_token", res.data.response.accessToken, {
          path: "/"
        });
        Cookies.set("expiresIn", res.data.response.expiresIn, {
          path: "/"
        });
        Cookies.set("refreshToken", res.data.response.refreshToken, {
          path: "/"
        });
      });
  };
  validateUser = async email => {
    return axios.get(this._apiBase + "/users?email=" + email, {
      headers: {
        "Content-Type": "application/json"
      }
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
  getPhoto = async (name, isThumb) => {
    const thumb = isThumb ? "?thumb=true" : "";
    await this._updateToken();
    return axios.get(this._apiBase + "/Photos/" + name + thumb, {
      headers: {
        "Content-Type": "application/json",
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

  getPhotosByAlbumId = async params => {
    await this._updateToken();
    return axios.get(this._apiBase + "/Photos?" + serialize(params), {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + Cookies.get("id_token")
      }
    });
  };

  getPhotoCount = async () => {
    await this._updateToken();
    return axios.get(this._apiBase + "/Photos?", {
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

  getPlaylists = async () => {
    await this._updateToken();
    return axios.get(this._apiBase + "/Playlists", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("id_token")
      }
    });
  };

  createPlaylist = async body => {
    await this._updateToken();
    return axios.post(this._apiBase + "/Playlists", JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("id_token")
      }
    });
  };
  deletePlaylist = async id => {
    await this._updateToken();
    return axios.delete(this._apiBase + "/Playlists/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("id_token")
      }
    });
  };
  getPlaylistInfo = async id => {
    await this._updateToken();
    return axios.get(this._apiBase + "/Playlists/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("id_token")
      }
    });
  };

  setPlaylistCover = async (body, id) => {
    await this._updateToken();
    return axios.put(this._apiBase + "/playlists/cover/" + id, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + Cookies.get("id_token")
      }
    });
  };

  deletePlaylistCover = async id => {
    await this._updateToken();
    return axios.delete(this._apiBase + "/playlists/cover/" + id, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + Cookies.get("id_token")
      }
    });
  };
  changePlaylist = async (id, body) => {
    await this._updateToken();
    return axios.put(this._apiBase + "/Playlists/" + id, JSON.stringify(body), {
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
          this._apiBase + "/Token/refresh",
          JSON.stringify({
            refreshToken: Cookies.get("refreshToken")
          }),
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          Cookies.remove("refreshToken", {
            path: "/"
          });
          Cookies.set("id_token", res.data.response.accessToken, { path: "/" });
          Cookies.set("expiresIn", res.data.response.expiresIn, { path: "/" });
          Cookies.set("refreshToken", res.data.response.refreshToken, {
            path: "/"
          });
        })
        .catch(e => console.log(e));
    }
  };
}
