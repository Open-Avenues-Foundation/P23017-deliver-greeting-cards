import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";

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
          <Route path="create-user" element={
            <h1>Create a User</h1>
          } />
          <Route path="view-users" element={
            <h1>Contact Me</h1>
          } />
          <Route path="create-event" element={
            <h1>Create an Event</h1>
          } />
          <Route path="view-events" element={
            <h1>View Events</h1>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
