import QrcodeGen from './qrcodegen';

export const ERROR_LEVEL_MAP: { [index: string]: QrcodeGen.QrCode.Ecc } = {
  L: QrcodeGen.QrCode.Ecc.LOW,
  M: QrcodeGen.QrCode.Ecc.MEDIUM,
  Q: QrcodeGen.QrCode.Ecc.QUARTILE,
  H: QrcodeGen.QrCode.Ecc.HIGH,
};

export const DEFAULT_SIZE = 128;
export const DEFAULT_LEVEL = 'L';
export const DEFAULT_BGCOLOR = '#FFFFFF';
export const DEFAULT_FGCOLOR = '#000000';
export const DEFAULT_INCLUDEMARGIN = false;

export const SPEC_MARGIN_SIZE = 4;
export const DEFAULT_MARGIN_SIZE = 0;

// This is *very* rough estimate of max amount of QRCode allowed to be covered.
// It is "wrong" in a lot of ways (area is a terrible way to estimate, it
// really should be number of modules covered), but if for some reason we don't
// get an explicit height or width, I'd rather default to something than throw.
export const DEFAULT_IMG_SCALE = 0.1;
