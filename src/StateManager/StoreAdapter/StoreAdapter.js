import useStore from "../UseStore";

export default class StoreAdapter {
  static getState() {
    return useStore.getState();
  }

  static setState(state) {
    useStore.setState(state);
  }

  static select(selector) {
    return selector(useStore.getState());
  }

  static doAction(selector) {
    return {
      withPayload: (...args) =>
        selector(useStore.getState()).call(null, ...args),
    };
  }
}
