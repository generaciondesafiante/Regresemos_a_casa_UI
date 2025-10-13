import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { ResourcesAdminTables } from "@/shared/services/admin/resources/resources";
import { ShortOrder } from "@/types/tables/params";
import { ResourceResponseTable } from "@/types/admin/resources/resourcesTable-type";

export const useFetchResources = (initialLimit = 10) => {
  const { data: session } = useSession();

  const [data, setData] = useState<ResourceResponseTable>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(initialLimit);
  const [search, setSearch] = useState("");

  const fetchResources = useCallback(async () => {
    if (!session?.user?.uid) return;

    setLoading(true);
    setError(null);

    try {
      const res = await ResourcesAdminTables.fetchResources(session.user.uid, {
        limit,
        page,
        search,
        sortOrder: ShortOrder.ASC,
      });
      setData(res);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.uid, page, limit, search]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  return {
    data,
    loading,
    error,
    refetch: fetchResources,
    page,
    setPage,
    search,
    setSearch,
  };
};
