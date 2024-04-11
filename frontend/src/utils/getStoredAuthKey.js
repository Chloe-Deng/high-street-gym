export function getStoredAuthKey() {
  // 从 localStorage 中获取 'authenticationKey'
  return localStorage.getItem("authenticationKey");
}
