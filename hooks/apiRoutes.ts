// const port = 'http://192.168.43.47:3020/api';
const port = 'https://financeapp-backend-atuh.onrender.com/api';
// const port = 'http://192.168.0.105:3020/api';
// const port = 'http://localport:3020/api';
// http://192.168.43.47:
//192.168.0.105:8081

const loginRoute = `${port}/auth/login`;
const registerRoute = `${port}/auth/register`;
const resendEmailVerificationRoute = `${port}/auth/resend-email-verification`;
const forgotPasswordRoute = `${port}/auth/forgot-password`;
const accountsRoute = `${port}/accounts/user-accounts`;
const ImageUploadRoute = `${port}/users/upload-user-image`;
const getUserSingleAccountTransactionsRoute = `${port}/transactions/single-account-transactions/`;
const createAccountRoute = `${port}/accounts/user-account/create`;

// Needed to add userId and token to this two routes
const resetPasswordRoute = `${port}/auth/reset-password`;
const emailVerificationRoute = `${port}/auth/email-verification`;

const getBankDetailsRoute = `${port}/transactions/banks`;
const getUserAccountNameRoute = `${port}/accounts/confirm-receiver-account`;
const transferToOtherBank = `${port}/transactions/send-to-other-bank`;
const singleAccountUsingAccountNumberRoute = `${port}/accounts/get-user-account`;
const transferToFundFlowAccount = `${port}/transactions/send-to-fund-flow`;
const transactionsRoute = `${port}/transactions/user-transactions`;

const getReceivingFundFlowAccountNameRoute = `${port}/accounts/get-receiving-user-details`;

const ResentEmailVerificationRoute = `${port}/auth/resend-email-verification`;
const creditAccountRoute = `${port}/transactions/initialize`;
const getTransactionResponseRoute = `${port}/transactions/status-paystack`;
const callbackRoute = `${port}/transactions/call-back`;
const singleTransactionByTransactionId = `${port}/transactions/single-transaction`;

const allNotificationsRoute = `${port}/notifications/user-notifications`;
const markNotificationAsViewedRoute = `${port}/notifications/user-notifications/view`;
const markNotificationAsReadRoute = `${port}/notifications/user-notifications/read/`;
const singleNotificationRoute = `${port}/notifications/user-notifications`;
const deleteNotificationRoute = `${port}/notifications/user-notifications`;
const deleteManyNotificationRoute = `${port}/notifications/user-notifications/delete-many`;

export {
  markNotificationAsViewedRoute,
  markNotificationAsReadRoute,
  singleNotificationRoute,
  deleteNotificationRoute,
  deleteManyNotificationRoute,
  allNotificationsRoute,
  singleTransactionByTransactionId,
  callbackRoute,
  getTransactionResponseRoute,
  creditAccountRoute,
  getReceivingFundFlowAccountNameRoute,
  ResentEmailVerificationRoute,
  transferToFundFlowAccount,
  singleAccountUsingAccountNumberRoute,
  transferToOtherBank,
  getUserAccountNameRoute,
  getBankDetailsRoute,
  createAccountRoute,
  ImageUploadRoute,
  accountsRoute,
  emailVerificationRoute,
  resetPasswordRoute,
  forgotPasswordRoute,
  loginRoute,
  registerRoute,
  resendEmailVerificationRoute,
  getUserSingleAccountTransactionsRoute,
  transactionsRoute,
};
