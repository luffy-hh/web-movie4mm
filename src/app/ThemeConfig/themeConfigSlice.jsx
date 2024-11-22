import { createSlice } from "@reduxjs/toolkit";

const inititalState = {
  theme: localStorage.getItem("theme") || "light",
  isSmallScreen: false,
  isDarkMode: localStorage.getItem("theme") !== "light",
  isMediumScreen: false,
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
        localStorage.setItem("isDarkMode", true);
      } else if (payload === "light") {
        state.isDarkMode = false;
        localStorage.setItem("isDarkMode", false);
      } else if (payload === "system") {
        state.isDarkMode =
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
        localStorage.setItem("isDarkMode", state.isDarkMode);
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
    setIsMediumScreen: (state, action) => {
      state.isMediumScreen = action.payload;
    },
  },
});

export const selectTheme = (state) => state.theme.theme;
export const selectIsSmallScreen = (state) => state.theme.isSmallScreen;
export const selectIsDarkMode = (state) => state.theme.isDarkMode;
export const selectIsMediumScreen = (state) => state.theme.isMediumScreen;

export const { setIsMediumScreen, setTheme, setIsSmallScreen } =
  themeConfigSlice.actions;

export default themeConfigSlice.reducer;
