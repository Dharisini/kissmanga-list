import { action, observable } from "mobx";

export default class PageStore {
  constructor(root_store) {
    this.root_store = root_store;
  }

  searchValue = observable("");
  previousPage = observable("1");

  setSearchValue = (searchValue) => {
    this.searchValue = searchValue;
  };

  setPreviousPage = (previousPage) => {
    this.previousPage = previousPage;
  };
}
