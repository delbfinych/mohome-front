export default class MohomeApiService {
  _apiBase = "http://localhost:6969/api";

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }

  async getUsers() {
    return this.getResource(`/users/`);
  }
}
