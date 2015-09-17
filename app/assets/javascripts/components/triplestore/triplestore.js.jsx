/* globals React */
'use strict';

var Triplestore = React.createClass({
  render: function() {
    var imgPath = this.props.paths.img;

    return(
      <div>
        <div>
          <span className='cursor-pointer' onClick={ this.props.goBack }>
            back
          </span>
        </div>
        { [this.props.downloadPdf].concat(this.props.title) }
         <section>
          <h3>
            What is a Database?
          </h3>
          <Img src={ imgPath + 'cylinder.png' } />
          <p>
            If you've endured a powerpoint presentation in a business setting in the 20 or 21st
            century chances are this guy popped up somewhere in the corner of the slide with the
            big messy flowchart. The universal symbol for database, the cylinder, has roots in
            technology that predates the database concept:
          </p>
          <Img src={ imgPath + 'drum.jpg' } />
          <p>
            Invented in the early 30's, drum memory was widely used as computer storage around
            the time early database models were being hashed out on the drawing board. You'd be
            blind not see the resemblance, however, a database as a system serves a
            purpose <strong>more complete a simple means of storage</strong>.
          </p>
          <p>
            The general definition of a database is "a collection of information organized to provide
            efficientretrieval." But what developers most likely refer to when answering the question
            "What database does your product use?" is actually a database management system or
            <strong>DBMS</strong>. A DBMS is the interactive software layer through which programmers,
            their programs, and, indirectly, consumers find, change, and otherwise make use of the data
            stored in the actual database.
          </p>
        </section>
        <section>
          <h3>
            The RDF Data Model (Triplestore)
          </h3>
          <p>
            RDF or Resource Description Framework is a simple language for expressing data models,
            which refer to objects ("resources") and their relationships. RDF Schema is a vocabulary
            for describing properties and classes of RDF-based resources, with semantics for
            generalized-hierarchies of such properies and classes. The RDF data model consists of
            resources, properties and values. Properties are the relationships that bind together
            resources and values.  A value, however, is either a resource or a primitive data type.
            The basic unit to represent information in RDF is the statement.
          </p>
        </section>
        <section>
          <h3>
            The Statement
          </h3>
          <p>
            A statement is a 'triple' of the type:
          </p>
          <p>
            subject - predicate - object.
          </p>
          <p>
            Where "subject" is a resource, "predicate" is a property, and "object" is a value.
          </p>
        </section>
        <section>
          <h3>
            AI Applications of RDF
          </h3>
          <p>
            RDF or Resource Description Framework is a simple language for expressing data models,
            which refer to objects ("resources") and their relationships. RDF Schema is a vocabulary
            for describing properties and classes of RDF-based resources, with semantics for
            generalized-hierarchies of such properies and classes. The RDF data model consists of
            resources, properties and values. Properties are the relationships that bind together
            resources and values.  A value, however, is either a resource or a primitive data type.
            The basic unit to represent information in RDF is the statement.
          </p>
        </section>
        <section>
          <h3>
            Watson's Triplestore
          </h3>
          <p>
            RDF or Resource Description Framework is a simple language for expressing data models,
            which refer to objects ("resources") and their relationships. RDF Schema is a vocabulary
            for describing properties and classes of RDF-based resources, with semantics for
            generalized-hierarchies of such properies and classes. The RDF data model consists of
            resources, properties and values. Properties are the relationships that bind together
            resources and values.  A value, however, is either a resource or a primitive data type.
            The basic unit to represent information in RDF is the statement.
          </p>
        </section>
        <section>
          <h3>
            Quadstore or Named Graph
          </h3>
          <p>
            RDF or Resource Description Framework is a simple language for expressing data models,
            which refer to objects ("resources") and their relationships. RDF Schema is a vocabulary
            for describing properties and classes of RDF-based resources, with semantics for
            generalized-hierarchies of such properies and classes. The RDF data model consists of
            resources, properties and values. Properties are the relationships that bind together
            resources and values.  A value, however, is either a resource or a primitive data type.
            The basic unit to represent information in RDF is the statement.
          </p>
        </section>
      </div>
    );
  }
});
