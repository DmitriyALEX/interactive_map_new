import type { IFetchedUser } from "../types/fetchedUsers.interface";

export interface IUsersState {
  users: IFetchedUser[];
  selectedTags: string[];
  loading: boolean;
  error: string | null;
}
