import React, { useRef, useEffect } from 'react'

// Here, marketing is the "marketing: 'marketing@http://localhost:8081/remoteEntry.js',"
// configuration inside webpack. And inside the marketing webpack config, we expose the
// MarketingApp
import { mount } from 'marketing/MarketingApp'

export default () => {
    const ref = useRef(null)

    useEffect(() => {
        mount(ref.current)
    }, [])

    return <div ref={ref} />
}
