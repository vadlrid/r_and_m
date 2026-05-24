import * as React from 'react';
import { type PropsWithChildren, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  FallbackComponent: React.FC;
}

interface ErrorBoundaryState {
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  constructor(props: PropsWithChildren<ErrorBoundaryProps>) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // console.error вставлен намеренно, так как нет какой-либо внешней системы лога ошибок
    console.error('Global error caught', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.error) {
      const { FallbackComponent } = this.props;
      return <FallbackComponent />;
    }
    return this.props.children;
  }
}
