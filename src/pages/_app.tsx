import { ReactQueryProvider } from "@/lib/react-query";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <Component {...pageProps} />
      <ToastContainer position="top-center" autoClose={3000} />
    </ReactQueryProvider>
  )
}
