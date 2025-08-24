import './App.css'
import { SearchForm } from './components'
import { ErrorBoundary } from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      {/* Main application */}
      <SearchForm />
    </ErrorBoundary>
  )
}

export default App
