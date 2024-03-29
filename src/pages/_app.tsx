import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import { Provider } from "react-redux";
import Modal from "../components/Modal";
import Toast from "../components/Toast";
import store from "../redux/store";
import { AppRouter } from "../server/routers/app";
import "../styles/globals.css";
import "../styles/utils.css";
import "../styles/fonts.css";
import { SessionProvider } from "next-auth/react";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <Component {...pageProps} />
        <Modal />
        <Toast />
      </Provider>
    </SessionProvider>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.NEXT_PUBLIC_DEPLOYED_URL
      ? `https://${process.env.NEXT_PUBLIC_DEPLOYED_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
