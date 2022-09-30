import type {AppProps} from 'next/app'
import App from "next/app";
import {useRouter} from "next/router";
import Head from "next/head";
import {ThemeProvider} from "styled-components";
import Cookies from "nookies";
import uniq from "lodash.uniq";

import GlobalStyles from "../styles/GlobalStyles";
import theme from "../styles/theme";
import {wrapper} from "../app/store";
import Transition from '../components/Transition';
import {setData} from "../features/apps/appsSlice";
import config from "../config.json";

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter()

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Carprice</title>
      </Head>
      <GlobalStyles/>
      <Transition location={router.pathname}>
        <Component {...pageProps} />
      </Transition>
    </ThemeProvider>
  )
}

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (context) => {
    try {
      const cookies = Cookies.get(context.ctx);

      const data = {
        IPad_landscape_apps: cookies.IPad_landscape_apps ? JSON.parse(cookies.IPad_landscape_apps) : uniq(config.desktopGridIcons),
        IPad_landscape_dock_apps: cookies.IPad_landscape_dock_apps ? JSON.parse(cookies.IPad_landscape_dock_apps) : uniq(config.dockBarIcons).slice(0, 5),
        IPad_portrait_apps: cookies.IPad_portrait_apps ? JSON.parse(cookies.IPad_portrait_apps) : uniq(config.desktopGridIcons),
        IPad_portrait_dock_apps: cookies.IPad_portrait_dock_apps ? JSON.parse(cookies.IPad_portrait_dock_apps) : uniq(config.dockBarIcons).slice(0, 4),
        IPhone_portrait_apps: cookies.IPhone_portrait_apps ? JSON.parse(cookies.IPhone_portrait_apps) : uniq(config.desktopGridIcons),
        IPhone_portrait_dock_apps: cookies.IPhone_portrait_dock_apps ? JSON.parse(cookies.IPhone_portrait_dock_apps) : uniq(config.dockBarIcons).slice(0, 4),
        IPhone_landscape_apps: cookies.IPhone_landscape_apps ? JSON.parse(cookies.IPhone_landscape_apps) : uniq(config.desktopGridIcons),
        IPhone_landscape_dock_apps: cookies.IPhone_landscape_dock_apps ? JSON.parse(cookies.IPhone_landscape_dock_apps) : uniq(config.dockBarIcons).slice(0, 5),
      }
      store.dispatch(setData({data: data}));
    } catch (err) {
      console.warn(err);
    }

    return {
      pageProps: {
        ...(await App.getInitialProps(context)).pageProps,
      },
    };
  }
);

export default wrapper.withRedux(MyApp);
