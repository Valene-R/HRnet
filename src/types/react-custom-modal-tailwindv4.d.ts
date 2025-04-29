/**
 * Local type declaration for react-custom-modal-tailwindv4
 * Used to provide type safety and IntelliSense 
 * since the package does not export its own TypeScript definitions
 */
declare module 'react-custom-modal-tailwindv4' {
  import * as React from 'react';

  interface ModalProps {
    title?: string;
    message: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    type: 'success' | 'error' | 'info' | 'warning';
    showCloseIcon?: boolean;
    customButton?: React.ReactNode;
    closeOnBackdropClick?: boolean;
    children?: React.ReactNode;
    showCloseButton?: boolean;
    showActionButtons?: boolean;
    showSaveButton?: boolean;
    showCancelButton?: boolean;
    onSave?: () => void;
    onCancel?: () => void;
  }

  const Modal: React.FC<ModalProps>;
  export default Modal;
}