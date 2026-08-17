import { useEffect, useState } from "react";

interface ContentState<T> {
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
}

export function useContent<T>(loader: () => Promise<T>): ContentState<T> {
  const [state, setState] = useState<ContentState<T>>({
    data: undefined,
    loading: true,
    error: undefined,
  });

  useEffect(() => {
    let cancelled = false;

    loader()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: undefined });
      })
      .catch((error: Error) => {
        if (!cancelled) setState({ data: undefined, loading: false, error });
      });

    return () => {
      cancelled = true;
    };
    // `loader` is expected to be stable (module-level function reference);
    // intentionally fetch once per mount rather than on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
