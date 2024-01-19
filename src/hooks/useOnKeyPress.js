import { useEffect } from "react"

export const useOnKeyPress = (callback, targetKey) => {
    useEffect(() => {

        const handleKeyEvents = (e) => {
            if (e.key === targetKey) {
                callback()
            }
        }   

        window.addEventListener('keydown', handleKeyEvents, true)
        return () => {
            window.removeEventListener('keydown', handleKeyEvents, true)
        }
    }, [callback, targetKey])
}