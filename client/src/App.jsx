import {Route, Routes} from "react-router-dom"
import Form from './views/form/form';
import Home from './views/home/home'
import Detail from './views/detail/detail';
import Landing from "./views/landing/Landing";










function App() {

      return (
      <div>
        <Routes>
        <Route path="/" exact element={<Landing />}/>
        <Route path="/drivers" element={<Home />}/>
        <Route path="/drivers/:id" element={<Detail />}/>
        <Route path="/drivers/form" element={<Form />}/>
        </Routes> 
      </div>
  );
}

export default App
