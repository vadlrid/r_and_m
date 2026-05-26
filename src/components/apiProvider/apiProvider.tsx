import * as React from 'react';
import { type ApiConfig, ApiContext } from '@shared/hooks';

type ApiProviderProps = React.PropsWithChildren<ApiConfig>;

export const ApiProvider = (props: ApiProviderProps) => (
  <ApiContext.Provider value={props}>{props.children}</ApiContext.Provider>
);
