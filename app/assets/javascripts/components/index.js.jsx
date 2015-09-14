/* globals React */
'use strict';

var Index = React.createClass({
  getInitialState: function() {
    return({
      idSelected: 0,
      alert: <Alert key='true' message={ 'welcome' } />
    });
  },
  selectTopic: function(id) {
    this.setState({
      idSelected: id
    });
  },
  setAlert: function(message) {
    this.setState({
      alert: <Alert key={ !JSON.parse(this.state.alert.key) } message={ message } />
    });
  },
  render: function() {
    var topics = this.props.topics;
    var idSelected = this.state.idSelected;
    var alert = this.state.alert;
    var id, topicProps, topicComponent
    var index = topics.map(function(topic) {
      id = topic.id;
      if (id === idSelected) {
        topicProps = {
          topic: topic,
          setAlert: this.setAlert,
          goBack: this.selectTopic.bind(this, 0),
          downloadPdf: <div key={ topic.title + '-download-pdf' }><a className='cursor-pointer' href={ topic.urls.pdf }>download pdf</a></div>,
          title: <p key={ topic.title + '-title' } className='header'>{ topic.title }</p>
        };
        topicComponent = React.createElement(window[topic.component], topicProps);
      }

      return(
        <div key={ 'index-' + id }>
          <span className={ !idSelected + ' cursor-pointer' } onClick={ this.selectTopic.bind(this, id) }>
            { topic.title }
          </span>
          <div className={ id === idSelected }>
            { topicComponent }
          </div>
        </div>
      );
    }.bind(this));

    return(
      <div>
        { [alert].concat(index) }
      </div>
    );
  }
});
