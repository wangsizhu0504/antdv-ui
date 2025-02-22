import { onBeforeUnmount } from 'vue';

/**
 * Locker return cached mark.
 * If set to `true`, will return `true` in a short time even if set `false`.
 * If set to `false` and then set to `true`, will change to `true`.
 * And after time duration, it will back to `null` automatically.
 */
export default function useLock(duration = 250): [() => boolean | null, (lock: boolean) => void] {
  let lock: boolean | null = null;
  let timeout: any;

  onBeforeUnmount(() => {
    clearTimeout(timeout);
  });

  function doLock(locked: boolean) {
    if (locked || lock === null)
      lock = locked;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      lock = null;
    }, duration);
  }

  return [() => lock, doLock];
}
