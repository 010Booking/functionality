import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TicketBookingPage from "./TicketBookingPage";
import PersonalInfoPage from "./PersonalInfoPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TicketBookingPage />} />
        <Route path="/personal-info" element={<PersonalInfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
