import React, { useEffect, useState } from 'react'
import './App.css'
import DemoSingle from './DemoSingle'
import DemoProps from './DemoProps'
import DemoShared from './DemoShared'

type Page = {
  text: string
  hash: string
  component: React.FC
}
const pages: Page[] = [
  {
    hash: '#single',
    text: 'Demo using single component',
    component: DemoSingle,
  },
  { hash: '#props', text: 'Demo using props', component: DemoProps },
  { hash: '#shared', text: 'Demo using shared state', component: DemoShared },
]

function App() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    function update() {
      setHash(window.location.hash)
    }
    window.addEventListener('hashchange', update)
    return function teardown() {
      window.removeEventListener('hashchange', update)
    }
  }, [])
  const currentPage = pages.find(page => page.hash === hash) || pages[0]
  const Page = currentPage.component
  return (
    <div className="page">
      <h1>React Shopping Cart Demo</h1>
      {pages.map(page => (
        <p key={page.hash}>
          <a
            href={page.hash}
            onClick={() => setHash(page.hash)}
            className={page === currentPage ? 'selected' : ''}
          >
            {page.text}
          </a>
        </p>
      ))}
      <Page />
    </div>
  )
}

export default App
