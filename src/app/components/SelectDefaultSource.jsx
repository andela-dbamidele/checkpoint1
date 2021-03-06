import { SimpleSelect } from 'react-selectize';
import React from 'react';
import { getFirstName } from '../utils/helpers';
import SourceStore from '../stores/SourceStore';
import * as NewsAction from '../actions/NewsAction';

/**
 * Create a react component
 * @class Sources
 */
export default class SelectDefaultSource extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      sources: {},
      loading: true,
    };

    // bind the class methods to the class
    this.getSources = this.getSources.bind(this);
    this.setDefaultNews = this.setDefaultNews.bind(this);
  }

  /**
   * Calls NewsAction when the component is about to mount
   * @method componentWilMount
   * @returns {function} - calls news action and dispatch an action
   */
  componentWillMount() {
    NewsAction.getAllSources();
  }

  /**
   * Add event Listener to the Sources Store and
   * fires when the component is fully mounted
   * @method componentDidMount
   * @returns {event} - register event
   */
  componentDidMount() {
    SourceStore.on('change', this.getSources);
  }

  /**
   * Remove event listener from the Sources store
   * @method componentWilUnMount
   * @return {event} - removes event
   */
  componentWillUnmount() {
    SourceStore.removeListener('change', this.getSources);
  }

  /**
   * gets the news sources and updates the state
   * @method getSources
   * @return {state} - Set sources to the state
   */
  getSources() {
    const rawSources = SourceStore.getSources();
    this.setState({
      sources: rawSources,
      loading: false,
    });
  }

  /**
   * Set the current news source to local storage
   * @method setDefaultNews
   * @param {any} e
   * @memberof Sources
   * @return {null} -
   */
  setDefaultNews(e) {
    localStorage.setItem('defaultNews', e.value);
    location.reload();
  }

  /**
   * Render react component
   * @method render
   * @return {function} react-component
   */
  render() {
    let AllSources;
    // set sources to loading if the `this.state.loading` is true
    if (this.state.loading) {
      AllSources = (
        <option> Loading.... </option>
      );
    } else {
      // map the sources to `AllSources` when the sources has been loaded
      AllSources = this.state.sources.map(source => (
        <option
          key={Math.random + source.name}
          value={source.id}
        >{source.name}</option>
      ));
    }

    // gets the current user
    const user = JSON.parse(localStorage.getItem('user'));
    return (
      <div className="col s12 home-inner" id="defaultSource">
        <div className="inner-content center m-auto">
          <span className="center">
            <img
              alt="loading"
              src="imgs/welcome.gif"
              height="100"
              width="100"
            />
          </span>
          <h5
            className="center"
            style={{ color: 'white' }}
          >
            Welcome
          <span
            style={{ 'fontSize': '32px', 'color': 'green' }}
          >
            {getFirstName(user.name)}
          </span>,</h5>
          <p
            className="center"
            style={{ color: 'white' }}
          >
            Please Select A News Source to continue
          </p>
          <div>
            <span className="center">
              <SimpleSelect
                placeholder="Search for news source"
                onValueChange={this.setDefaultNews}
              >
                {AllSources}
              </SimpleSelect>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
