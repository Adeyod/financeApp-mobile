import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userNotifications: [],
  singleUserNotification: {},
  totalIsViewed: null,
  totalNotificationsCount: null,

  singleAccountTransactionDetails: null,
  singleAccountCompletedTransactionsCount: null,
  singleAccountTotalTransactionsCount: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    getNotificationsSuccess(state, action) {
      const { totalCount, totalIsViewed, notifications } = action.payload;
      const userNotifications = notifications;

      state.userNotifications = userNotifications;
      state.totalNotificationsCount = totalCount;
      state.totalIsViewed = totalIsViewed;
    },

    getSingleNotificationSuccess(state, action) {
      state.singleUserNotification = action.payload;
    },

    clearNotifications(state) {
      state.userNotifications = [];
      state.singleUserNotification = {};
      state.totalIsViewed = null;
      state.totalNotificationsCount = null;
    },
  },
});

export const {
  getNotificationsSuccess,
  getSingleNotificationSuccess,
  clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
