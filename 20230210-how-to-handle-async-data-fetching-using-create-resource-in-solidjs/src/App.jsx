import { GithubExample, ProductExample, Home } from './components'
import { Routes, Route } from '@solidjs/router';


function App() {
  return (
    <div class="py-4">
      <Routes>
        <Route component={Home} path="/" />
        <Route component={GithubExample} path="/github-example" />
        <Route component={ProductExample} path="/product-example" />
      </Routes>
    </div>
  );
}

export default App;
