import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TicketBookingPage from "./TicketBookingPage";
import PersonalInfoPage from "./PersonalInfoPage";
import PaymentInfoPage from "./PaymentInfoPage";

import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<TicketBookingPage />} />
          <Route path="/personal-info" element={<PersonalInfoPage />} />
          <Route path="/payment-info" element={<PaymentInfoPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
