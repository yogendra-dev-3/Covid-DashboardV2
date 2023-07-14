import {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const [showLog, setShowLog] = useState(false)

  const {match} = props
  const {path} = match

  const homeClassName = path === '/' ? 'link-name highlight' : 'link-name'

  const vaccinationClassName =
    path === '/vaccination' ? 'link-name highlight' : 'link-name'

  const aboutClassName = path === '/about' ? 'link-name highlight' : 'link-name'

  const toggleMenu = () => {
    setShowLog(!showLog)
  }

  const closeMenu = () => {
    setShowLog(false)
  }

  return (
    <>
      <nav className="header-list">
        <Link to="/" className="link-logo">
          <span className="app-name">COVID</span>
          <span className="app-name blue-text">INDIA</span>
        </Link>
        <ul className="nav-list">
          <Link to="/" className="link-logo">
            <li key="1">
              <button type="button" className={homeClassName}>
                Home
              </button>
            </li>
          </Link>
          <Link to="/vaccination" className={vaccinationClassName}>
            <li key="2">
              <button type="button" className="link-name">
                Vaccination
              </button>
            </li>
          </Link>
          <Link to="/about" className={aboutClassName}>
            <li key="3">
              <button type="button" className="link-name">
                About
              </button>
            </li>
          </Link>
        </ul>
        <button type="button" className="menu-button" onClick={toggleMenu}>
          <img
            src="https://res.cloudinary.com/dyhsyterg/image/upload/v1643368210/add-to-queue_1_lrcjeu.png"
            alt="menu item"
            className="menu-image"
          />
        </button>

        {showLog ? (
          <ul className="menu-list">
            <Link className="link-item" to="/">
              <li key="1">
                <button type="button" className={homeClassName}>
                  Home
                </button>
              </li>
            </Link>
            <Link className="link-item" to="/vaccination">
              <li key="2">
                <button type="button" className={vaccinationClassName}>
                  Vaccination
                </button>
              </li>
            </Link>
            <Link className="link-item" to="/about">
              <li key="3">
                <button type="button" className={aboutClassName}>
                  About
                </button>
              </li>
            </Link>
            <li className="close-item" key="3">
              <button
                type="button"
                className="close-button"
                onClick={closeMenu}
              >
                <img
                  src="https://res.cloudinary.com/dyhsyterg/image/upload/v1643369220/Shape_hewlfb.png"
                  alt="close icon"
                  className="close-icon"
                />
              </button>
            </li>
          </ul>
        ) : null}
      </nav>
    </>
  )
}

export default withRouter(Header)
