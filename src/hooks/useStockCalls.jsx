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
  const getBrands = async () => getStockData("brands");
  const getCategories = async () => getStockData("categories");
  const getProducts = async () => getStockData("products");

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
  const deleteBrands = (id) => deleteStockData("brands", id);

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
  const postBrands = (info) => postStockData(info, "brands");

  //! ----- Put Call ----------
  const putStockData = async (info, url) => {
    try {
      await axiosWithToken.put(`stock/${url}/${info.id}/`, info);
      toastSuccessNotify(`${url} successfuly updated`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} can not be uptaded`);
    }
  };

  const putFirm = (info) => putStockData(info, "firms");
  const putBrands = (info) => putStockData(info, "brands");

  return {
    getStockData,
    getFirms,
    getSales,
    deleteFirm,
    postFirm,
    postStockData,
    putFirm,
    putStockData,
    getBrands,
    putBrands,
    postBrands,
    deleteBrands,
    getCategories,
    getProducts,
  };
};

export default useStockCalls;
