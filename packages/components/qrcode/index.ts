import { withInstall } from '@antdv/utils';
import qrCode from './src/QRCode';

export const QRCode = withInstall(qrCode);

export default QRCode;

export * from './src/interface';
export * from './src/props';
