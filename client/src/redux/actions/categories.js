import axios from "axios";
import { GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAIL } from "./types";

export const get_categories = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json"
    }
  };

  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/category/categories`,
      config
    );

    if (res.status === 200) {
      dispatch({
        type: GET_CATEGORIES_SUCCESS,
        payload: res.data
      });
    } else {
      dispatch({
        type: GET_CATEGORIES_FAIL
      });
    }
  } catch (err) {
    dispatch({
      type: GET_CATEGORIES_FAIL
    });
  }
};
