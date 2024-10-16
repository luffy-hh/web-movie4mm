import { createSlice } from "@reduxjs/toolkit";

const inititalState = {
  theme: localStorage.getItem("theme") || "light",
  isSmallScreen: false,
  isDarkMode: false,
};
const themeConfigSlice = createSlice({
  name: "theme",
  initialState: inititalState,
  reducers: {
    setTheme: (state, { payload }) => {
      payload = payload || state.theme;
      localStorage.setItem("theme", payload);
      state.theme = payload;
      if (payload === "dark") {
        state.isDarkMode = true;
      } else if (payload === "light") {
        state.isDarkMode = false;
      } else if (payload === "system") {
        if (
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          state.isDarkMode = true;
        } else {
          state.isDarkMode = false;
        }
      }
      if (state.isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    setIsSmallScreen: (state, action) => {
      state.isSmallScreen = action.payload;
    },
  },
});
export const { setTheme, setIsSmallScreen } = themeConfigSlice.actions;
export default themeConfigSlice.reducer;
