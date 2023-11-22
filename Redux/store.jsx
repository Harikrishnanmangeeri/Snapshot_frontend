import { configureStore } from '@reduxjs/toolkit'
import Content from './features/content'
import findcontentuser from './features/findcontentuser'

export const store =configureStore({
    reducer: {
        content:Content,
        user:findcontentuser
    }
})

