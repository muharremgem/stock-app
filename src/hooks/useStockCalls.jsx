import { axiosWithToken } from "../service/axiosInstance";
import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, getSuccess } from "../features/stockSlice";
import useAxios from "./useAxios";
import { toastSuccessNotify, toastErrorNotify } from "../helper/ToastNotify";

const useStockCalls = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

  //! -----Get Calls-----
  const getStockData = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`stock/${url}/`);
      console.log(data);
      dispatch(getSuccess({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getFirms = async () => getStockData("firms");
  const getSales = async () => getStockData("sales");

  //! ------Delete Calls-----

  const deleteStockData = async (url, id) => {
    try {
      await axiosWithToken.delete(`stock/${url}/${id}/`);
      toastSuccessNotify(`${url} successfuly deleted`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} can not be deleted`);
    }
  };

  const deleteFirm = (id) => deleteStockData("firms", id);

  //! ----- Post Call ----------
  const postStockData = async (info, url) => {
    try {
      await axiosWithToken.post(`stock/${url}/`, info);
      toastSuccessNotify(`${url} successfuly added`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} can not be deleted`);
    }
  };

  const postFirm = (info) => postStockData(info, "firms");

  return {
    getStockData,
    getFirms,
    getSales,
    deleteFirm,
    postFirm,
    postStockData,
  };
};

export default useStockCalls;
