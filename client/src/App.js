import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import MakeClip from './pages/MakeClips/MakeClip'
import ClipLoadingPage from './pages/MakeClips/ClipLoadingPage'

const App = () => (
  <Router>
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/make-clip/:uuid' exact component={ClipLoadingPage} />
    </Switch>
  </Router>
)

export default App
