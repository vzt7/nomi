import { signal, effect } from '@preact/signals-core';

export type Interceptor<
  T extends Record<string, ReturnType<typeof signal>> = {}
> = <K extends keyof T>(
  key: K,
  prevValue: T[K]['value'],
  value: T[K]['value'],
  /** A callback to call this.data(nextData) for components. */
  next: (nextData: any) => void
) => Record<string, unknown> | void;

export function createStore<
  T extends Record<string, ReturnType<typeof signal>>
>(
  signals: T,
  options?: {
    /**
     * Add a interceptor to
     */
    interceptor?: Interceptor<T>;
  }
) {
  const { interceptor } = options || {};

  const callbacks: (() => void)[] = [];
  const initialState = Object.keys(signals).reduce((res, k) => {
    res[k] = signals[k].value;
    return res;
  }, {} as Record<string, T[string]['value']>);
  const latestState = {
    ...initialState,
  };

  const behavior = Behavior({
    lifetimes: {
      created() {
        Object.keys(signals).forEach((k) => {
          const v = signals[k];

          const fn = effect(() => {
            const latestValue = v.value;
            const prevValue = latestState[k];

            if (interceptor) {
              interceptor?.(k, prevValue, latestValue, (nextData: any) => {
                this.setData(nextData);
              });
            } else {
              const nextData = {
                [k]: latestValue,
              };
              this.setData(nextData);
            }

            latestState[k] = latestValue;
          });

          callbacks.push(fn);
        });
      },
      detached() {
        callbacks.forEach((fn) => fn());
      },
    },
  });

  return {
    initialState,
    behavior,
  };
}
