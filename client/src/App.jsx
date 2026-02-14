import React, { useEffect } from 'react'
import ChatMain from './Components/ChatMain/ChatMain'
import axios from 'axios'

function App() {
    useEffect(() => {
        axios({ 
            url: `${import.meta.env.VITE_BASE_URL}`
        })
    }, [])
    return (
        <div>
            <ChatMain />
        </div>
    )
}

export default App
