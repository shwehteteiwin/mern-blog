import { useEffect, useState } from "react";
import api from "../lib/api";

const useResource = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!url) return;

    const fetchResource = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(url);
        setData(response.data);
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
            "Failed to load data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [url]);

  return {
    data,
    setData,
    loading,
    error,
  };
};

export default useResource;