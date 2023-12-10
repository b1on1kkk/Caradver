export function PushingQueryState(queryParameters: URLSearchParams) {
  window.history.pushState(
    { path: `?${queryParameters.toString()}` },
    "",
    `?${queryParameters.toString()}`
  );
  window.history.replaceState;
}
