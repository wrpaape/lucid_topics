/* globals React */
'use strict';

var Index = React.createClass({
  getInitialState: function() {
    return({
      idSelected: 0,
      alert: <Alert key='true' message={ <Img src='lucid_logo.png' /> } />
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
          downloadPdf: <h5 key={ topic.title + '-download-pdf' }><a href={ topic.urls.download.pdf }>download pdf</a></h5>,
          title: <h1 key={ topic.title + '-title' }>{ topic.title }</h1>,
          urls: topic.urls,
          paths: topic.paths
        };
        topicComponent = React.createElement(window[topic.component], topicProps);
      }

      return(
        <article key={ 'index-' + id }>
          <h2>
            <span className={ !idSelected } onClick={ this.selectTopic.bind(this, id) }>
              { topic.title }
            </span>
          </h2>
          <div className={ id === idSelected }>
            { topicComponent }
          </div>
        </article>
      );
    }.bind(this));

    return(
      <div>
        { [alert].concat(index) }
      </div>
    );
  }
});
