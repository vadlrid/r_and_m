import * as React from 'react';
import { useContext } from 'react';

export interface ApiConfig {
  baseUrl: string;
  maxAttempts: number;
}

export const ApiContext = React.createContext<ApiConfig>({
  baseUrl: '',
  maxAttempts: 1
});

export const useApiConfig = () => useContext(ApiContext);
