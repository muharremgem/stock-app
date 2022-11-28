import { axiosWithToken } from "../service/axiosInstance";
import { useDispatch } from "react-redux";
import {
  fetchFail,
  fetchStart,
  getSuccess,
  getProCatBrandsSuccess,
} from "../features/stockSlice";
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

  const getFirms = () => getStockData("firms");
  const getSales = () => getStockData("sales");
  const getBrands = () => getStockData("brands");
  const getCategories = () => getStockData("categories");
  const getProducts = () => getStockData("products");
  const getPurchases = () => getStockData("purchases");

  const getProCatBrands = async () => {
    dispatch(fetchStart());
    try {
      const [products, categories, brands] = await Promise.all([
        axiosWithToken.get("stock/products/"),
        axiosWithToken.get("stock/categories/"),
        axiosWithToken.get("stock/brands/"),
      ]);
      dispatch(
        getProCatBrandsSuccess([products.data, categories.data, brands.data])
      );
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  //! ----Delete Calls---

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
  const deleteProducts = (id) => deleteStockData("products", id);

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
  const postProducts = (info) => postStockData(info, "products");

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
    getCategories,
    getBrands,
    getProducts,
    getProCatBrands,
    getProCatBrandsSuccess,
    getPurchases,
    postFirm,
    postStockData,
    postBrands,
    postProducts,
    putFirm,
    putBrands,
    putStockData,
    deleteFirm,
    deleteBrands,
    deleteProducts,
  };
};

export default useStockCalls;
