import axios from "axios";

const API_HOST = "http://localhost:8080";
// const API_HOST = "https://pink-happy-newt.cyclic.app/";


class TodoServices {
  postNotesData(data) {
    return axios({
      method: "POST",
      url: API_HOST + "/api/users",
      data: data,
    });
  }

  getAllNotes(page, totalEntries, searchText) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/getUser?page=${page}&searchName=${searchText}&pageSize=${totalEntries}`,
    });
  }

  IsEditNotes(_id, data) {
    return axios({
      method: "patch",
      url: `${API_HOST}/edit/${_id}`,
      data: data,
    });
  }

  apiCountUpdate() {
    return axios({
      method: "get",
      url: `${API_HOST}/api/counts`,
    });
  }
}

export default new TodoServices();
