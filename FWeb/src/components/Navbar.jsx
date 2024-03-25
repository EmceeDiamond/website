import { NavLink } from 'react-router-dom'

export default function Navbar  () {
    return (
      <div>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div style={{ margin: "10px" }}>
              <NavLink to="/captha" style={({ isActive }) => ({
                                color: isActive
                                    ? "green"
                                    : "black",
                            })}>Application submission</NavLink>
            </div>
            <div style={{ margin: "10px" }}>
              <NavLink to="/admin" style={({ isActive }) => ({
                                color: isActive
                                    ? "green"
                                    : "black",
                            })}>Admin</NavLink>
            </div>
        </nav>
      </div>
    )
  }