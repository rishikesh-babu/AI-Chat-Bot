import React, { useEffect } from 'react'
import ChatMain from './Components/ChatMain/ChatMain'
import axiosInstance from './config/axiosInstance'

function App() {
    useEffect(() => {
        axiosInstance({ 
            url: '/'
        })
    }, [])
    return (
        <div>
            <ChatMain />
        </div>
    )
}

export default App
