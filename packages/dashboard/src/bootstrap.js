import { createApp } from 'vue'

import Dashboard from './components/Dashboard'

// Mount function to start up the app
const mount = (htmlElement) => {
    const app = createApp(Dashboard)
    app.mount(htmlElement)
}

// If we are in dev and in isolation, call mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_dashboard-dev-root')

    if (devRoot) {
        mount(devRoot)
    }
}

// We are running through container
// and we should export the mount function
export { mount }
