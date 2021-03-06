import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Create a LoggedIn component
 * @export
 * @class LoggedIn
 * @extends {React.Component}
 */
export default class LoggedIn extends React.Component {

  /**
   * Creates an instance of LoggedIn.
   * @constructor
   * @memberof LoggedIn
   */
  constructor() {
    super();
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  /**
   * Handles user logout
   * @method logMeOut
   * @param {object} e - Event passed in from the clicked button
   * @return {event} -
   */
  handleLogOut(e) {
    e.preventDefault();
    localStorage.removeItem('user');
    localStorage.removeItem('defaultNews');
    location.reload();
  }

  /**
   * Render react component
   * @method render
   * @return {function} react-component
   */
  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
      <header id="header">
        <nav className="h-auto p-10">
          <div className="nav-wrapper">
            <Link className="brand-logo" to="/">NewsNinja</Link>
            <a
              href="!#" data-activates="mobile-demo"
              className="button-collapse" id="nav"
            >
              <i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li><Link to="/favorites">Favourites</Link></li>
              <li>
                <img
                  className="avatar-img"
                  src={user.image}
                  alt="User Avatar"
                />
              </li>
              <li>
                <Link
                  to="/logout"
                  onClick={this.handleLogOut}
                >Logout
                </Link>
              </li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li><Link to="/favorites">Favourites</Link></li>
              <li>
                <img
                  className="avatar-img"
                  src={user.image}
                  alt="User Avatar"
                />
              </li>
              <li>
                <Link
                  to="/logout"
                  onClick={this.handleLogOut}
                >
                  Logout
                </Link>
              </li>
            </ul>
            <div className="clear" />
          </div>
        </nav>
      </header>
    );
  }
}
