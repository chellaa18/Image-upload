// store.js

import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./api";
import { productsApi } from "./productApi";
import { adminApi } from "./adminApi";

const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(productsApi.middleware)
      .concat(adminApi.middleware),
});

export default store;
