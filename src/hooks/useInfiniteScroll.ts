import { useEffect, useRef } from "react";

interface InfiniteScrollProps {
  fetchMore: () => void;
  hasMore: boolean;
  loading: boolean;
}

export const useInfiniteScroll = ({
  fetchMore,
  hasMore,
  loading,
}: InfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    // Очищаем предыдущий Observer перед созданием нового
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !loading) {
          fetchMore();
        }
      },
      {
        root: null, // viewport
        rootMargin: "100px", // заранее загружаем данные
        threshold: 0.1,
      },
    );

    observerRef.current.observe(sentinelRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [fetchMore, hasMore, loading]);

  return sentinelRef; // ref, который нужно повесить на sentinel-элемент
};
