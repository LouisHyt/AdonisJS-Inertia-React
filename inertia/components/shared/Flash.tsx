import type { SharedProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/react'
import { useEffect } from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify'

function Flash() {
  const { flashes } = usePage<SharedProps>().props

  useEffect(() => {
    flashes.forEach(({ type, message }) => {
      switch (type) {
        case 'success':
          toast.success(message)
          break
        case 'error':
          toast.error(message)
          break
        case 'warning':
          toast.warning(message)
          break
        case 'info':
          toast.info(message)
          break
      }
    })
  }, [flashes])

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={3}
        transition={Slide}
      />
    </>
  )
}

export default Flash
