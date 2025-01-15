export type ExceptionStatusType = 403 | 404 | 500 | '403' | '404' | '500';

export type ResultStatus = 'success' | 'error' | 'info' | 'warning';

export type ResultStatusType = ExceptionStatusType | ResultStatus;
