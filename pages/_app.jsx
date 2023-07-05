import React from "react";

import "../styles/globals.css";

import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Layout } from "../components/layout/layout";

import { Toaster } from "react-hot-toast";

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {},
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {},
  },
});

function App({ Component, pageProps }) {
  return (
    // <React.StrictMode>
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />

          <Toaster />
        </Layout>
      </NextUIProvider>
    </NextThemesProvider>
    // </React.StrictMode>
  );
}

export default App;
