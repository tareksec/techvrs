import { createContext, useContext } from "react";
export const HubContext = createContext<{
  saved: string[];
  ready: boolean;
  toggle: (slug: string) => void;
  notify: (message: string) => void;
}>({ saved: [], ready: false, toggle: () => {}, notify: () => {} });
export const useHub = () => useContext(HubContext);
