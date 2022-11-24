import { useEffect } from "react";
import useStockCalls from "../hooks/useStockCalls";

//import axios from "axios";
//import { useDispatch, useSelector } from "react-redux";
//import { fetchStart, getSuccess, fetchFail } from "../features/stockSlice";

const Firms = () => {
  const { getFirms } = useStockCalls();

  // const dispatch = useDispatch();
  // const { token } = useSelector((state) => state.auth);
  // const BASE_URL = "https://13671.fullstack.clarusway.com/";
  // const getFirms = async () => {
  //   const url = "firms";
  //   dispatch(fetchStart());
  //   try {
  //     const { data } = await axios.get(`${BASE_URL}stock/firms/`, {
  //       headers: {
  //         Authorization: `Token ${token}`,
  //       },
  //     });
  //     console.log(data);
  //     dispatch(getSuccess({ data, url }));
  //   } catch (error) {
  //     dispatch(fetchFail());
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getFirms();
  }, []);

  return <div>Firms</div>;
};

export default Firms;
