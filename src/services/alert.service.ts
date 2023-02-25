import Swal from 'sweetalert2/dist/sweetalert2'
import { AlertMessage } from '@/utils/alert-message'

export const alertService = {
  success: (): void => {
    Swal.fire({
      icon: 'success',
      title: AlertMessage.SUCCESS_TITLE,
      text: AlertMessage.SUCCESS,
      confirmButtonText: AlertMessage.CONFIRM_BUTTON_TEXT
    })
  },
  error: (text: string): void => {
    Swal.fire({
      icon: 'error',
      title: AlertMessage.ERROR_TITLE,
      text,
      confirmButtonText: AlertMessage.CONFIRM_BUTTON_TEXT
    })
  },
  confirmDelete: (): Promise<any> => {
    return Swal.fire({
      icon: 'info',
      title: AlertMessage.CONFIRM_TITLE,
      text: AlertMessage.CONFIRM_DELETE,
      confirmButtonText: AlertMessage.CONFIRM_BUTTON_TEXT,
      cancelButtonText: AlertMessage.CANCEL_BUTTON_TEXT,
      showCancelButton: true
    })
  }
}
