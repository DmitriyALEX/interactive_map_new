import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export const selectFilteredUsers = createSelector(
  [(state: RootState) => state.users.users, (state: RootState) => state.users.selectedTags],
  (users, selectedTags) => {
    if (!selectedTags.length) return users;

    return users.filter((user) => selectedTags.some((tag) => user.tags.includes(tag)));
  }
);
