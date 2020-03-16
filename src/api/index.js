import axios from "axios";

export default {
  getUserInfo(userName) {
    return axios.get("https://api.github.com/users/" + userName);
  },

  getAllRepo(userName) {
    return axios.get("https://api.github.com/users/" + userName + "/repos");
  },

  getCommitInfo(userName, respName) {
    return axios.get(
      "https://api.github.com/repos/" + userName + "/" + respName + "/commits"
    );
  }
};
