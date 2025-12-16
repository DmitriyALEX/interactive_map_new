import { useMemo } from "react";
import type { IFetchedUser } from "../types/fetchedUsers.interface";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const useUniqTags = () => {
  const fetchedUsers = useSelector((state: RootState) => state.users.users);

  const uniqTags = useMemo(() => {
    const seen = new Set<string>();
    fetchedUsers.forEach((user: IFetchedUser) => {
      return user.tags.forEach((tag: string) => {
        if (!seen.has(tag)) {
          seen.add(tag);
        }
      });
    });

    return Array.from(seen);
  }, [fetchedUsers]);

  return uniqTags;
};

export default useUniqTags;
