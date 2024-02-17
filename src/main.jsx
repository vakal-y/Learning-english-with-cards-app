import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Components/App/App'
import '../src/Components/style/index.scss'
import { MyContextComponent } from './Components/Context/MyContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MyContextComponent>
      <App />
    </MyContextComponent>
  </React.StrictMode>,
)
