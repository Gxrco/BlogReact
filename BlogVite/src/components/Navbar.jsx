import React, { useState, startTransition } from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { IconContext } from 'react-icons'
import { useRouter } from '../utils/RouterContext'
import { SidebarData } from './SidebarData'
import './styles/Navbar.css'

function Navbar () {
  const [sidebar, setSidebar] = useState(false)
  const { navigate } = useRouter()

  const showSidebar = () => {
    startTransition(() => {
      setSidebar(!sidebar)
    })
  }

  const handleLinkClick = (path, event) => {
    event.preventDefault()
    navigate(path)
    showSidebar()
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className="navbar">
        <a href="#" className="menu-bars" onClick={showSidebar}>
          <FaIcons.FaBars />
        </a>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <a href="#" className="menu-bars">
              <AiIcons.AiOutlineClose />
            </a>
          </li>
          {SidebarData.map((item, index) => (
            <li key={index} className={item.cName}>
              <a href={item.path} onClick={(e) => handleLinkClick(item.path, e)}>
                {item.icon}
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </IconContext.Provider>
  )
}

export default Navbar
