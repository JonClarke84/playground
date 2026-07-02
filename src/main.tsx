import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/global.css'
import { App } from './App'

// Ask the browser not to evict our localStorage under storage pressure —
// on Android this is the difference between her progress surviving or not
// (PRODUCT.md §9.4). Fire-and-forget: denial just means default behaviour.
if (navigator.storage?.persist !== undefined) {
  void navigator.storage.persist()
}

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Missing #root element')

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
