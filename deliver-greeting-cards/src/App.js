import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";

import CreateUser from './components/CreateUser';
import ViewUsers from "./components/ViewUsers";
import CreateEvent from './components/CreateEvent';
import ViewEvents from './components/ViewEvents';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/create-user">Create a User</Link>
                </li>
                <li>
                  <Link to="/view-users">View Users</Link>
                </li>
                <li>
                  <Link to="/create-event">Create an Event</Link>
                </li>
                <li>
                  <Link to="/view-events">View Events</Link>
                </li>
              </ul>
            </nav>

            <Outlet />
          </>
        }>
          <Route path="" element={
            <h1>Home</h1>
          } />
          <Route path="create-user" element={<CreateUser />} />
          <Route path="view-users" element={<ViewUsers />}/>
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="view-events" element={<ViewEvents />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
