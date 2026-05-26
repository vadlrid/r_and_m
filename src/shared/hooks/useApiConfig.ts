import * as React from 'react';
import { useContext } from 'react';

export interface ApiConfig {
  baseUrl: string;
}

export const ApiContext = React.createContext<ApiConfig>({ baseUrl: '' });

export const useApiConfig = () => useContext(ApiContext);
