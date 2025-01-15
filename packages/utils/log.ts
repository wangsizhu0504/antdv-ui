let warned: Record<string, boolean> = {};

type Warning = (valid: boolean, component: string, message?: string) => void;

export function warning(valid: boolean, message: string) {
  // Support uglify
  if (process.env.NODE_ENV !== 'production' && !valid && console !== undefined)
    console.error(`Warning: ${message}`);
}

export function note(valid: boolean, message: string) {
  // Support uglify
  if (process.env.NODE_ENV !== 'production' && !valid && console !== undefined)
    console.warn(`Note: ${message}`);
}

export function resetWarned() {
  warned = {};
}

export function call(
  method: (valid: boolean, message: string) => void,
  valid: boolean,
  message: string,
) {
  if (!valid && !warned[message]) {
    method(false, message);
    warned[message] = true;
  }
}

export function warningOnce(valid: boolean, message: string) {
  call(warning, valid, message);
}

export function noteOnce(valid: boolean, message: string) {
  call(note, valid, message);
}

// eslint-disable-next-line import/no-mutable-exports
let devWarning: Warning = () => {};
if (process.env.NODE_ENV !== 'production') {
  devWarning = (valid, component, message) => {
    warningOnce(valid, `[antdv-ui: ${component}] ${message}`);

    // StrictMode will inject console which will not throw warning in React 17.
    if (process.env.NODE_ENV === 'test')
      resetWarned();
  };
}
export function warningFn(valid: boolean, component: string, message: string): void {
  warningOnce(valid, `[ant-design-vue: ${component}] ${message}`);
};

export { devWarning };
