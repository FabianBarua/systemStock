import ReactDOM from 'react-dom/client'
import './index.css'

import { Products } from './components/Products';
import { Providers } from './components/Providers';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Providers>
    <Products />
  </Providers>
)
