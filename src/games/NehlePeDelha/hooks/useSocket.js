import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { updateWallet } from "../../../redux/slices/userSlice";
import { io } from "socket.io-client";

import extractQueryParams from "../../../utils/extractQueryParams";
import useUrlParams from "../../../hooks/useUrlParams";

const socket = io(process.env.REACT_APP_API_URL);

export default function useSocketTransactions(currentFee = 0) {
  const dispatch = useDispatch();

  const walletAmount = useSelector((state) => state.user?.wallet);

  const { getUrlParams } = useUrlParams();

  const queryParams = getUrlParams();

  const getBalance = async () => {
    try {
      const response = await new Promise((resolve, reject) => {
        socket.emit("getBalance", { queryParams }, (response) => {
          if (response) {
            resolve(response);
          } else {
            reject(new Error("No response received"));
          }
        });
      });

      dispatch(updateWallet(response?.balance?.data || 0));
    } catch (error) {
      console.error("Error fetching balance:", error);
      dispatch(updateWallet(0)); // Optional: Reset wallet balance on error
    }
  };

  const getHistory = useCallback(async () => {
    try {
      const history = await new Promise((resolve, reject) => {
        socket.emit("getBetHistory", { gameName: "nehlePeDehla" });

        const handleHistoryResponse = (response) => {
          if (response.success) {
            console.log("Bet history fetched:", response.data);
            resolve(response.data);
          } else {
            console.error("Error fetching history:", response.error);
            reject(new Error(response.error));
          }
        };
        socket.on("betHistory", handleHistoryResponse);
        return () => socket.off("betHistory", handleHistoryResponse);
      });

      return { response: history, error: null };
    } catch (error) {
      console.error("Error in getHistory:", error);
      return { response: [], error: error.message };
    }
  }, []);

  const debitBalance = async (entryFee, UUID) => {
    console.log("UUID debitBalance :::", UUID);
    socket.emit("debit", {
      gameName: "nehlePeDehla",
      points: entryFee,
      ledgerText: "Nehle Pe Delha entry fee",
      id: "direct",
      params: queryParams,
      UUID,
      resolve: (response) => {
        console.log("Debit response:", response);
        if (response.success) {
          // Update the wallet state in Redux
          dispatch(updateWallet(walletAmount - currentFee));
        } else {
          console.error("Debit failed");
        }
        return true;
      },
    });
    return false;
  };

  const creditBalance = async (balance, UUID) => {
    console.log("UUID creditBalance :::", UUID);
    socket.emit("credit", {
      gameName: "nehlePeDehla",
      points: balance,
      event_name: "NehlePeDelha Game Win",
      display_text: "NehlePeDelha game reward",
      params: queryParams,
      UUID,
      resolve: (response) => {
        console.log("Credit response:", response);
        if (response.success) {
          // Update the wallet state in Redux
          dispatch(updateWallet(walletAmount + currentFee));
        } else {
          console.error("Credit failed");
        }
      },
    });
  };

  return {
    getBalance,
    debitBalance,
    creditBalance,
    getHistory,
  };
}
