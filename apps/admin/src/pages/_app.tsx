import React, { useState } from 'react';
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { TTheme, GlobalStyles, theme } from '@business-loyalty-program/ui-kit';
import { ThemeProvider } from 'styled-components';

import '../../../../libs/ui-kit/src/lib/styles/antd.less';

import '../../public/fonts/style.less';
import { CurrentCompanyContext } from '../modules/companies/current-company.context';
import { CompaniesResponseDto } from '@business-loyalty-program/types';
import { extractAndUpdateToken } from '@flexypw/react-tools';
import { CompaniesApi } from '../modules/companies/companies.api';
import { validateMessages } from '../validate-messages';
import { ConfigProvider } from 'antd';

declare module 'styled-components' {
  export interface DefaultTheme extends TTheme {}
}

function CustomAdminApp({ Component, pageProps }: AppProps) {
  const [company, setCompany] = useState<CompaniesResponseDto>(
    pageProps.company
  );

  return (
    <>
      <Head>
        <title>Welcome to admin!</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <CurrentCompanyContext.Provider value={{ company, setCompany }}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <ConfigProvider form={{ validateMessages }}>
            <main>
              <Component {...pageProps} />
            </main>
          </ConfigProvider>
        </ThemeProvider>
      </CurrentCompanyContext.Provider>
    </>
  );
}

CustomAdminApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);

  if (context.ctx.pathname !== '/auth' && context.ctx.req && context.ctx.res) {
    extractAndUpdateToken(context.ctx.req, context.ctx.res);

    try {
      const company = await new CompaniesApi()
        .setTokenFromResponse(context.ctx.res)
        .getCurrentCompany();
      appProps.pageProps.company = company;
    } catch (err) {
      if (err?.response?.status === 401) {
        context.ctx.res.writeHead(307, { Location: '/auth' });
        context.ctx.res.end();
      }
    }
  }

  return { ...appProps };
};

export default CustomAdminApp;
