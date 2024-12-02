import { ReactNode } from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  TextInputKeyPressEventData,
  TextStyle,
} from 'react-native';

type FormInputProp = {
  title?: string;
  placeholder: string;
  value: string;
  autoCapitalize: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType: KeyboardTypeOptions;
  secureTextEntry: boolean;
  onChangeText: (text: string) => void;
  style?: StyleProp<TextStyle>;
};

type RegisterFormInputProp = {
  title?: string;
  placeholder: string;
  value: string;
  autoCapitalize: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType: KeyboardTypeOptions;
  secureTextEntry: boolean;
  key: string;
  style?: StyleProp<TextStyle>;
};

type LoginFormProp = {
  email: string;
  setEmail: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
};

type ResetPasswordProp = {
  confirmPassword: string;
  setConfirmPassword: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
};

type CurrentUserType = {
  id: string;
  status: string;
  user_name: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  two_fa_enabled: boolean;
  biometric_enabled: boolean;
  is_verified: boolean;
  is_updated: boolean;
  created_at: string;
  updated_at: string;
  is_phone_verified: boolean;
  account_tier: string;
  profile_image: {
    url: string;
    public_id: string;
  };
};

type UserState = {
  currentUser: CurrentUserType;
};

type AuthState = {
  access: string;
  token: string;
};

type Account = {
  account_number: string;
  balance: string;
  created_at: string;
  id: string;
  is_default: boolean;
  updated_at: string;
  user_id: string;
};

type AccountState = {
  accountDetails: {
    message: string;
    success: boolean;
    accounts: Account[];
  };

  singleAccountDetails: {
    accounts: {
      id: string;
      user_id: string;
      account_number: string;
      balance: string;
      is_default: false;
      created_at: string;
      updated_at: string;
    };
  };

  loading: boolean;
  error: boolean;
};

type AccountDropdownType = {
  accountDetails: Account[];
  setSelectedAccountNumber: (account: Account) => void;
};

type RefreshWrapperProps = {
  children: ReactNode;
};

type SingleTransactionProp = {
  singleAccountTransactionDetails: TransactionType[];
};

type TransactionState = {
  transactionDetails: TransactionType[];
  totalTransactionsCount: number;
  singleAccountTransactionDetails: TransactionType[];
  // singleAccountTransactionDetails: SingleTransactionProp;
  singleTransactionDetails: {
    id: string;
    user_id: string;
    amount: string;
    transaction_type: string;
    transaction_date: string;
    transaction_status: string;
    description: string;
    account_id: string;
    reference_number: string;
    created_at: string;
    updated_at: string;
    transaction_source: string;
    receiving_account: string;
    account_number: string;
    receiving_account_number: string;
    receiving_bank_name: string;
    receiver_account_name: string;
  };

  singleAccountCompletedTransactionsCount: number;
  singleAccountTotalTransactionsCount: number;
};

type SearchProp = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  handleKeyPress: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
};

type AccountSectionType = {
  currentUser: CurrentUserType;
  toggleShowBalance: () => void;
  showBalance: boolean;
  totalBalance: number;
};

type ReceiverInfo = {
  account_number: string;
  account_name: string;
  bank_code: string;
};

type DataToSend = {
  narration: string;
  bankCode: string;
  receiving_account: string;
  selectedAccountNumber: string;
  amount: string;
  receiverDetails: ReceiverInfo;
};

type TransactionType = {
  account_id: string;
  account_number: string;
  amount: string;
  created_at: string;
  description: string;
  id: string;
  receiver_account_name: string;
  receiver_user_id: string;
  receiving_account: string;
  receiving_account_number: string;
  receiving_bank_name: string;
  reference_number: string;
  sender_account_name: string;
  sender_account_number: string;
  sender_bank_name: string;
  transaction_date: string;
  transaction_source: string;
  transaction_status: string;
  transaction_type: string;
  updated_at: string;
  user_id: string;
};

type SingleTransactionProps = {
  transaction: TransactionType;
};

type TransactionObject = {
  transactions: TransactionType[];
  totalTransactionsCount: number;
};

type SuccessMessage = {
  message: string;
  success: boolean;
};

type TransactionDataType = SuccessMessage & {
  transactions: {
    transactions: TransactionType[];
    totalCount: number;
  };
};

type TransactionResponse = {
  transactions: TransactionType[];
  message: string;
};

type TransferDataType = {
  receiving_account_number: string;
  amount: string;
  selected_account_number: string;
  description: string;
  receiver_account_name: string;
};

type BankProps = {
  active: boolean;
  bank_id: number;
  code: string;
  country: string;
  createdAt: string;
  created_at: string;
  currency: string;
  id: string;
  is_deleted: boolean;
  longcode: string;
  name: string;
  pay_with_bank: boolean;
  slug: string;
  supports_transfer: boolean;
  type: string;
  updatedAt: string;
  updated_at: string;
};

type BankDropDownType = {
  setSelectedBank: (bankName: string) => void;
  banks: BankProps[];
};

type RegisterFromProp = {
  first_name: string;
  user_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone_number?: string;
};

type dataObj = {
  password: string;
  confirm_password: string;
  token: string;
};

type ReceiverProp = {
  first_name: string;
  last_name: string;
};

type NotificationState = {
  userNotifications: NotificationProp[];
  totalIsViewed: number;
  totalNotificationsCount: number;
  singleUserNotification: NotificationProp;
};
type NotificationProp = {
  id: number;
  is_read: boolean;
  created_at: string;
  updated_at: string;
  message: string;
  receiver: string;
  title: string;
  user_id: string;
};

type SingleNotificationProps = {
  notification: NotificationProp;
};

export {
  SingleNotificationProps,
  NotificationState,
  NotificationProp,
  TransactionObject,
  ReceiverProp,
  dataObj,
  RegisterFromProp,
  AccountDropdownType,
  BankDropDownType,
  BankProps,
  TransferDataType,
  TransactionResponse,
  DataToSend,
  ReceiverInfo,
  AccountSectionType,
  SearchProp,
  FormInputProp,
  LoginFormProp,
  RegisterFormInputProp,
  UserState,
  AuthState,
  Account,
  AccountState,
  TransactionState,
  RefreshWrapperProps,
  TransactionType,
  CurrentUserType,
  SingleTransactionProp,
  ResetPasswordProp,
  TransactionDataType,
  SingleTransactionProps,
};
