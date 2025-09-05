import { useEffect, useRef } from "react";

interface InfiniteScrollProps {
  fetchMore: () => void;
  hasMore: boolean;
  loading: boolean;
  offset?: number;
}

export const useInfiniteScroll = ({
  fetchMore,
  hasMore,
  loading,
  offset = 200,
}: InfiniteScrollProps) => {
  const isFetching = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - offset;

      if (nearBottom && hasMore && !loading && !isFetching.current) {
        isFetching.current = true;
        fetchMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchMore, hasMore, loading, offset]);

  useEffect(() => {
    if (!loading) isFetching.current = false;
  }, [loading]);
};
