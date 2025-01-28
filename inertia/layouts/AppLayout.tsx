import { usePage } from '@inertiajs/react'
import { motion, AnimatePresence, Variants } from 'motion/react'
import NavBar from '~/components/NavBar'
import Flash from '~/components/shared/Flash'

type Props = {
  children: React.ReactNode
}

function AppLayout({ children }: Props) {
  const page = usePage()
  const direction = page.url.startsWith('/login') ? 100 : -100
  const pageVariants: Variants = {
    initial: {
      opacity: 0,
      x: direction,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    hidden: {
      opacity: 0,
      x: direction,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  }

  return (
    <>
      <Flash />
      <div className="min-h-screen grid grid-rows-[auto,1fr]">
        <NavBar />
        <div className="p-6 lg:p-8 flex items-center justify-center h-full">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              variants={pageVariants}
              animate="visible"
              exit="hidden"
              initial="initial"
              key={page.url}
              className="min-w-[500px] h-full flex"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}

export default AppLayout
