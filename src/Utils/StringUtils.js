export default class StringUtils {
  static removeDash(string) {
    return string.replace(/-/g, " ");
  }
}
