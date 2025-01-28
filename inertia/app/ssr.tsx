import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import type { ReactNode } from 'react'
import AppLayout from '~/layouts/AppLayout'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
      const resolvedPages = pages[`../pages/${name}.tsx`]

      // @ts-expect-error - resolvedPages is not typed
      resolvedPages.default.layout = resolvedPages.default.layout || ((page: ReactNode) => <AppLayout children={page} />)
      console.log('page rendered on Server !')
      return resolvedPages
    },

    setup: ({ App, props }) => <App {...props} />,
  })
}
