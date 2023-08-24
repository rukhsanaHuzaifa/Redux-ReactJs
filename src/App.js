import "./App.css";
import MainPage from "./Components/MainPage";
import UsersList from "./Components/UsersList";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import store from "./Components/Store";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/user-lists" element={<UsersList />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
