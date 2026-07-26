/**
 *
 */
export function debounce<
  A extends Array<unknown>,
  T extends (...args: A) => void,
>(cb: T, ms: number) {
  let handle: ReturnType<typeof setTimeout> | null = null

  const callable = (...args: A) => {
    if (handle) clearTimeout(handle)
    handle = setTimeout(() => cb(...args), ms)
  }

  return callable
}
