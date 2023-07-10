import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import DishPage from './dish/[id]';
import LoginPage from './login';

export default function App({ Component, pageProps }: AppProps) {
   return <Component {...pageProps} />
}
