import React from "react";
import PageStore from "./page-store";

class RootStore {
  constructor() {
    this.page_store = new PageStore(this);
  }
}

let stores_context;

export const useStores = () => {
  if (!stores_context) {
    const root_store = new RootStore();

    stores_context = React.createContext({
      page_store: root_store.page_store,
    });
  }

  return React.useContext(stores_context);
};
