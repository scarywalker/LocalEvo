import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3001/ap1/v1/retaurants",
});
