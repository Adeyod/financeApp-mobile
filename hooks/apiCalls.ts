import axios from 'axios';
import {
  markNotificationAsViewedRoute,
  markNotificationAsReadRoute,
  singleNotificationRoute,
  deleteNotificationRoute,
  deleteManyNotificationRoute,
  accountsRoute,
  allNotificationsRoute,
  callbackRoute,
  createAccountRoute,
  creditAccountRoute,
  emailVerificationRoute,
  forgotPasswordRoute,
  getBankDetailsRoute,
  getReceivingFundFlowAccountNameRoute,
  getTransactionResponseRoute,
  getUserAccountNameRoute,
  getUserSingleAccountTransactionsRoute,
  ImageUploadRoute,
  loginRoute,
  registerRoute,
  resendEmailVerificationRoute,
  resetPasswordRoute,
  singleAccountUsingAccountNumberRoute,
  singleTransactionByTransactionId,
  transactionsRoute,
  transferToFundFlowAccount,
  transferToOtherBank,
} from './apiRoutes';
import { useSelector } from 'react-redux';
import {
  AuthState,
  dataObj,
  DataToSend,
  TransactionDataType,
  TransactionResponse,
  TransferDataType,
} from '@/constants/types';

const useApi = () => {
  const { token } = useSelector((state: { auth: AuthState }) => state.auth);

  const header = {
    'Content-Type': 'application/json',
    'x-fund-flow': 'mobile-fund-flow',
  };

  const authHeader = {
    ...header,
    Authorization: `Bearer ${token}`,
  };

  const loginUser = async (formData: {
    login_input: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(loginRoute, formData, {
        headers: header,
      });

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const registerUser = async (formData: {
    first_name: string;
    user_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
  }) => {
    try {
      const response = await axios.post(registerRoute, formData, {
        headers: header,
      });

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getUserAccounts = async () => {
    try {
      console.log('API CALLS:', token);
      const accounts = await axios.get(accountsRoute, {
        headers: authHeader,
      });
      return accounts;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const imageProfileUpload = async (formData: object) => {
    try {
      console.log('Uploading image:', formData);
      const result = axios.post(ImageUploadRoute, formData, {
        headers: {
          ...authHeader,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getUserSingleAccountTransactions = async (
    account_number: string,
    page: string,
    limit: string,
    searchValue: string
  ) => {
    console.log(searchValue);
    try {
      const response = await axios(
        `${getUserSingleAccountTransactionsRoute}${account_number}?searchParams=${searchValue}&page=${page}&limit=${limit}`,
        {
          headers: authHeader,
        }
      );

      console.log('API RESPONSE:', response.data.transactions.length);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const createNewAccountNumber = async () => {
    try {
      const response = await axios.post(
        createAccountRoute,
        {},
        {
          headers: authHeader,
        }
      );

      console.log('ApiCall create account:', response);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const fetBankDetails = async () => {
    try {
      const response = await axios(getBankDetailsRoute, {
        headers: authHeader,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getAccountName = async (receivingAccount: string, bankCode: string) => {
    try {
      console.log(receivingAccount);
      console.log(bankCode);
      const response = await axios.post(
        getUserAccountNameRoute,
        {
          receivingAccount: receivingAccount,
          bankCode: bankCode,
        },
        {
          headers: authHeader,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const makeTransferToOtherBank = async (data: DataToSend) => {
    try {
      const response = await axios.post(
        transferToOtherBank,
        {
          receivingAccount: data.receiving_account,
          bankCode: data.bankCode,
          receiverDetails: data.receiverDetails,
          amount: data.amount,
          selectedAccountNumber: data.selectedAccountNumber,
          narration: data.narration,
        },
        {
          headers: authHeader,
        }
      );

      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getUserSingleAccountDetailsByAccountNumber = async (
    account_number: string
  ): Promise<TransactionResponse> => {
    try {
      const response = await axios(
        `${singleAccountUsingAccountNumberRoute}/${account_number}`,
        {
          headers: authHeader,
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getUserSingleAccountTransactionsWithoutQuery = async (
    account_number: string
  ): Promise<TransactionResponse> => {
    try {
      // console.log(page);

      const response = await axios(
        `${getUserSingleAccountTransactionsRoute}${account_number}`,
        {
          headers: authHeader,
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const makeTransferToFundFlowAccount = async ({
    receiving_account_number,
    amount,
    selected_account_number,
    description,
    receiver_account_name,
  }: TransferDataType) => {
    try {
      const dataObj = {
        receiving_account_number,
        amount,
        selected_account_number,
        description,
        receiver_account_name,
      };
      const response = await axios.post(transferToFundFlowAccount, dataObj, {
        headers: authHeader,
      });

      console.log(response);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const verifyUserEmail = async (token: string) => {
    try {
      const response = await axios(`${emailVerificationRoute}?token=${token}`, {
        headers: header,
      });

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const forgotPasswordProcess = async (email: string) => {
    try {
      const response = await axios.post(
        forgotPasswordRoute,
        { email },
        {
          headers: header,
        }
      );

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const resetPasswordProcess = async (dataObj: dataObj) => {
    console.log('DATA OBJECT: ', dataObj);
    const { token, ...rest } = dataObj;

    try {
      const response = await axios.post(
        `${resetPasswordRoute}?token=${dataObj.token}`,
        rest,
        {
          headers: header,
        }
      );

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const resendEmailVerificationToken = async (email: string) => {
    try {
      const response = await axios.post(resendEmailVerificationRoute, email, {
        headers: header,
      });

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getFundFlowReceivingAccountName = async (account_number: string) => {
    try {
      const response = await axios(
        `${getReceivingFundFlowAccountNameRoute}/${account_number}`,

        {
          headers: authHeader,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const creditUserAccount = async (account_number: string, amount: string) => {
    try {
      const response = await axios.post(
        creditAccountRoute,
        {
          account_number,
          amount,
        },
        {
          headers: authHeader,
        }
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const callbackResult = async (reference: string) => {
    try {
      console.log('API GET TRANSACTION CALL REFERENCE:', reference);
      const result = await axios(`${callbackRoute}?reference=${reference}`, {
        headers: authHeader,
      });

      console.log('API GET TRANSACTION CALL:', result.data);

      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getUserTransactions = async (
    page: string,
    limit: string,
    searchValue: string
  ): Promise<TransactionDataType> => {
    try {
      // console.log(page);
      // console.log(limit);
      // console.log(searchValue);
      const transactions = await axios.get<TransactionDataType>(
        `${transactionsRoute}?searchParams=${searchValue}&page=${page}&limit=${limit}`,
        {
          headers: authHeader,
        }
      );

      // console.log('API response:', transactions.data);
      return transactions.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getSingleTransactionByTransactionId = async (
    transaction_id: string
  ) => {
    try {
      const transaction = await axios(
        `${singleTransactionByTransactionId}/${transaction_id}`,
        {
          headers: authHeader,
        }
      );
      console.log(transaction.data);
      return transaction.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getNotifications = async (
    page: string,
    limit: string,
    searchValue: string
  ) => {
    try {
      const response = await axios(
        `${allNotificationsRoute}?searchParams=${searchValue}&page=${page}&limit=${limit}`,
        {
          headers: authHeader,
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const markNotificationsAsViewed = async () => {
    try {
      const response = await axios.put(
        markNotificationAsViewedRoute,
        {},
        {
          headers: authHeader,
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const markANotificationAsRead = async (notification_id: string) => {
    console.log(notification_id);
    try {
      const response = await axios.put(
        `${markNotificationAsReadRoute}${notification_id}`,
        {},
        {
          headers: authHeader,
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getSingleNotification = async (notification_id: string) => {
    try {
      const response = await axios(
        `${singleNotificationRoute}/${notification_id}`,
        {
          headers: authHeader,
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteNotification = async (notification_id: number) => {
    try {
      const id = notification_id.toString();
      const response = await axios.delete(`${deleteNotificationRoute}/${id}`, {
        headers: authHeader,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteManyNotifications = async (notification_ids: number[]) => {
    try {
      console.log('deleteManyNotifications:', notification_ids);
      const response = await axios.post(
        deleteManyNotificationRoute,
        {
          notification_ids,
        },
        {
          headers: authHeader,
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    markANotificationAsRead,
    getSingleNotification,
    deleteNotification,
    deleteManyNotifications,
    markNotificationsAsViewed,
    getNotifications,
    getSingleTransactionByTransactionId,
    getUserTransactions,
    callbackResult,
    creditUserAccount,
    getFundFlowReceivingAccountName,
    resendEmailVerificationToken,
    resetPasswordProcess,
    forgotPasswordProcess,
    verifyUserEmail,
    makeTransferToFundFlowAccount,
    getUserSingleAccountTransactionsWithoutQuery,
    getUserSingleAccountDetailsByAccountNumber,
    makeTransferToOtherBank,
    getAccountName,
    fetBankDetails,
    getUserSingleAccountTransactions,
    loginUser,
    registerUser,
    getUserAccounts,
    imageProfileUpload,
    createNewAccountNumber,
  };
};

export default useApi;
