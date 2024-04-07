export type ToastType = 'info' | 'waring' | 'error';
export type TToastOptions = {
  type?: ToastType,
  duration?: number;
  message: string;
  showClose?: boolean;
  onClose?: () => void;
}
export type CreateToast = (options: TToastOptions) => any;
export type TToast = {
  info?: (options: TToastOptions) => void;
  success?: (options: TToastOptions) => void;
  waring?: (options: TToastOptions) => void;
  error?: (options: TToastOptions) => void;
  show?: (options: TToastOptions) => void;
};
