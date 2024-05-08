import "./App.css";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import LandingPage from "./components/LandingPage";
import UserProvider from "./context/userContext";
import store from "./redux/state/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <UserProvider>
          <LandingPage />
        </UserProvider>
      </Provider>
    </>
  );
}

export default App;
