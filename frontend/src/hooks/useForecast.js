import { useState, useEffect } from "react";
import getForecast from "../services/weatherService";

export default function useForecast(city) {
  const [result, setResult] = useState({ city: null, data: null, error: null });

  useEffect(() => {
    const controller = new AbortController();

    getForecast(city, controller.signal)
      .then((data) => setResult({ city, data, error: null }))
      .catch((err) => {
        if (controller.signal.aborted) return; // cancelled, not a real error
        setResult({
          city,
          data: null,
          error: err.response?.data?.error ?? err.message,
        });
      });

    return () => controller.abort();
  }, [city]);

  const loading = result.city !== city;

  return {
    data: loading ? null : result.data,
    error: loading ? null : result.error,
    loading,
  };
}
