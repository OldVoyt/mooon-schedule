import { useEffect, useRef } from 'react'

export default function usePolling(pollCallback: () => void, delay: number) {
    // https://overreacted.io/making-setinterval-declarative-with-react-hooks/
    const savedCallback = useRef<() => void>()

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = pollCallback
    }, [pollCallback])

    useEffect(() => {
        function tick() {
            if (savedCallback.current) {
                savedCallback.current()
            }
        }
        tick()
        const id = setInterval(tick, delay)
        return () => {
            clearInterval(id)
        }
    }, [delay])
}
