import { useCallback, useEffect, useState } from "react";
import apiFetch from "../utils/apiFetch";
import logger from "../utils/logger";

/**
 * @typedef Cache
 * @property {string | number} [id]
 * @property {string} [pathname]
 */

/**
 * @param {string} url
 * @param {any[]} dependencies
 * @param {Cache?} cache
 */
export default function useQuery(url, dependencies = [], cache = null) {
  const [data, setData] = useState(/** @type {any} */ (null));
  const [isLoading, setIsLoading] = useState(false);

  const loadData = useCallback(async () => {
    const cacheUrlKey = `cache_${url}`;
    const cachePathnameKey = `cache_${url.split("?")[0]}`;

    const addCacheToStorage = (newData) => {
      sessionStorage.setItem(cacheUrlKey, JSON.stringify(newData));
      sessionStorage.setItem(cachePathnameKey, JSON.stringify(newData));
    };

    const deleteCacheFromStorage = () => {
      sessionStorage.removeItem(cacheUrlKey);
      sessionStorage.removeItem(cachePathnameKey);
    };

    try {
      setIsLoading(true);

      if (cache) {
        const cachedDataStr = sessionStorage.getItem(`cache_${cache.pathname}`);

        if (cachedDataStr) {
          const parsedData = JSON.parse(cachedDataStr);

          if (parsedData && typeof parsedData === "object" && parsedData.data) {
            const foundData = parsedData.data.find(
              (item) => String(item.id) === String(cache.id)
            );

            if (foundData) {
              setData(foundData);
            }
          }
        }
      } else {
        const cachedDataStr = sessionStorage.getItem(cacheUrlKey);

        if (cachedDataStr) {
          const parsedData = JSON.parse(cachedDataStr);
          setData(parsedData);
        }
      }

      const response = await apiFetch(url);
      const newData = await response.json();

      if (newData) {
        addCacheToStorage(newData);
        setData(newData);
      } else {
        deleteCacheFromStorage();
      }
    } catch (error) {
      logger.error("API fetch failed:", error);

      deleteCacheFromStorage();
    } finally {
      setIsLoading(false);
    }
  }, [cache, url]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, url]);

  return {
    data: data?.data ?? data,
    isLoading,
    refetch: () => loadData(),
    total: /** @type {number | undefined} */ (data?.total),
  };
}
