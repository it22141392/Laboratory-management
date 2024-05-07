import 'antd/dist/reset.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Homepage from "./pages/Homepage";
import ManageTreatment from "./pages/ManageTreatment";
import ManagePatient from "./pages/ManagePatient";
import Bills from "./pages/Bills";
function App(){
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/ManageTreatment" element={<ManageTreatment />} />
      <Route path="/ManagePatient" element={<ManagePatient />} />
      <Route path="/Bills" element={<Bills />} />


    </Routes>
    </BrowserRouter>
    </>
  );
};
export  default App;