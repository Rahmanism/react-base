import React from 'react'
// import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from 'App'

// to work with vite and not getting error: regeneratorruntime is not defined
import 'regenerator-runtime/runtime'

// because of React 18
// use root instead of ReactDOM
import { createRoot } from 'react-dom/client'

// Context Provider
import { MaterialUIControllerProvider } from 'context'

// React-Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </BrowserRouter>
    <ReactQueryDevtools />
  </QueryClientProvider>
)
