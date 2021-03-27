import React from 'react'
import ReactDOM from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from 'history'

import App from './App'

// Mount function to start up the app
const mount = (htmlElement, { onNavigate, defaultHistory, initialPath }) => {
    // memoryHistory is initially set as "/".
    // Hence we need to initialize the first path.
    // Lesson: Adding Initial State to Memory Hiustory.
    const history =
        defaultHistory ||
        createMemoryHistory({
            initialEntries: [initialPath],
        })

    if (onNavigate) {
        history.listen(onNavigate)
    }

    ReactDOM.render(<App history={history} />, htmlElement)

    return {
        onParentNavigate({ pathname: nextPathname }) {
            const { pathname } = history.location

            if (pathname !== nextPathname) {
                history.push(nextPathname)
            }
        },
    }
}

// If we are in dev and in isolation, call mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth-dev-root')

    if (devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() })
    }
}

// We are running through container
// and we should export the mount function
export { mount }
