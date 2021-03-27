import React, { useRef, useEffect } from 'react'

// Here, marketing is the "marketing: 'marketing@http://localhost:8081/remoteEntry.js',"
// configuration inside webpack. And inside the marketing webpack config, we expose the
// MarketingApp
import { mount } from 'marketing/MarketingApp'
import { useHistory } from 'react-router-dom'

export default () => {
    const ref = useRef(null)
    const history = useHistory()

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            onNavigate: ({ pathname: nextPathName }) => {
                const { pathname } = history.location
                if (pathname !== nextPathName) {
                    history.push(nextPathName)
                }
            },
            initialPath: history.location.pathname,
        })

        history.listen(onParentNavigate)
    }, [])

    return <div ref={ref} />
}
