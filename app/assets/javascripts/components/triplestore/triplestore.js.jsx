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
            If you've endured a PowerPoint presentation in a business setting in the 20 or 21st
            century chances are this guy popped up somewhere in the corner of the slide with the
            big messy flowchart. The universal symbol for database, the cylinder, has roots in
            technology that predates the database concept:
          </p>
          <Img src={ imgPath + 'drum.jpg' } />
          <p>
            Invented in the early 30's, drum memory was widely used as computer storage around
            the time early database models were being hashed out on the drawing board. You'd be
            blind not see the resemblance, however, a database as a system serves a
            purpose <strong>more thorough than a simple means of storage</strong>.
          </p>
          <p>
            The general definition of a database is "a collection of information organized to provide
            efficient retrieval." Technically a floppy disk, an Excel spreadsheet, and even a rolodex qualifies
            as a database, but what developers most likely refer to when answering the question "What database
            does your product use?" is a <strong>database management system</strong>. or DBMS A DBMS
            is the interactive software layer through which programmers, their programs, and, indirectly,
            consumers find, change, and otherwise make use of the data stored in the actual database.
          </p>
        </section>
        <section>
          <h3>
            Why Bother?
          </h3>
          <p>
            There's a reason why your exes' digits go into a little black book and Facebook incorporates
            the sophisticated DBMS "MySQL." In most cases pen and paper or 16GB of storage
            will suffice for managing personal phone numbers as this data is:
          </p>
          <ol>
            <li>
              <h4>
                Small
              </h4>
              <p>
                From A to Z the entirety of this set of data can be scanned with the human eye
                in a couple of page flips or some scrolling.
              </p>
            </li>
            <li>
              <h4>
                Simple
              </h4>
              <p>
                A single association between a string of letters and the number(s) belonging
                to them is the only relationship of importance.
              </p>
            </li>
            <li>
              <h4>
                Static
              </h4>
              <p>
                Contacts will need to be added, updated, or removed with manageable infrequence.
              </p>
            </li>
          </ol>
          <p>
            Note the keyword "manageable." While there's probably a several-orders-of-magnitude
            shortage of manufactured notebooks outstanding required to house the Facebook database,
            even if it could be stored on paper maintaining the simple status updates of its userbase
            yet alone the dynamic rewiring of countless network relationships as friends are added
            and removed would dwarf the Great Wall or any other massive human endeavor in scale. The
            savvy assignment of a proper database-DBMS pair, however, <strong>makes it possible to
            harness such datasets of otherwise unmanageable size and complexity</strong>.
          </p>
        </section>
        <section>
          <h3>
            How do they work?
          </h3>
          <p>
            Traditionally the means by which databases house their data can be modeled as <strong>a
            network of tables</strong>. Each table is identified by a name and consists of a series
            of rows and columns. Each row represents a single entry in the database, where an entry's
            attributes are set according to the values listed in each column or field.
          </p>
          <div>
            <div>
              users
            </div>
            <table className='users-general'>
              <thead>
                <tr>
                  <th>username</th>
                  <th>email</th>
                  <th>password_digest</th>
                  <th>admin</th>
                  <th>created_at</th>
                  <th>updated_at</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>"jimchrist"</td>
                  <td>"literallyhitler@example.com"</td>
                  <td>"$2a$10$YqUOsQSzmlKoILXwCrnVOOUOmp9SSEgR6aasAPGBfdgPjmfuLhC/O"</td>
                  <td>true</td>
                  <td>"2014-07-14 19:34:47"</td>
                  <td>"2015-09-15 12:30:42"</td>
                </tr>
                <tr>
                  <td>"PackersFan96"</td>
                  <td>"greenbay@example.com"</td>
                  <td>"$2a$10$B3BC0qh7HyTZvsN6jEHOh.5ZhZ2rhQFiSGJfk4Q56n4hyaCiUkohO"</td>
                  <td>false</td>
                  <td>"2015-12-14 01:11:10"</td>
                  <td>"2015-09-14 00:55:47"</td>
                </tr>
                <tr>
                  <td>"IHeartATX"</td>
                  <td>"asdf@example.com"</td>
                  <td>"$2a$10$5YwBHb2WzFJVD3SX8W4sauxHTDOtSYFDvQDvZpgHAFtb2a27lhWgS"</td>
                  <td>false</td>
                  <td>"2015-08-14 01:00:20"</td>
                  <td>"2015-09-15 10:52:40"</td>
                </tr>
                <tr>
                  <td>"implosions"</td>
                  <td>"groundpound@example.com"</td>
                  <td>"$2a$10$7qp0k2HOCVyQ4pyDhkyRXeBsV0o.KT8UCFCmpg8yNKcel5Vp2f/Ca"</td>
                  <td>false</td>
                  <td>"2015-09-13 12:29:05"</td>
                  <td>"2015-09-14 07:00:59"</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Take for example the archetypal "users" table above configured to keep track of
            data concerning, for instance, the userbase of a particular forum. Each "user" entry
            records the attributes listed in the table header:  our first user goes by the username
            of "jimchrist," has admin privileges, etc... This table configuration, or <strong>
            schema</strong>, so far looks like nothing your cookie-cutter spreadsheet software
            couldn't handle. So what if the owner of this website wanted to allow their users
            to make posts like a proper forum?  Not only that, but lets say they wanted to allow
            users to comment on posts and other comments as well–AND keep track of this interaction
            without having a nervous breakdown. This is where a proper DBMS excels over Excel.
          </p>
        </section>
        <section>
          <h3>
            The Relational Database Management System (RDBMS)
          </h3>
          <p>
            The grandaddy of DBMS's, the relational DBMS originated in the 70's and has thrived
            to this day as one of the most common and powerful database implementations. Let's see
            how an RDBMS would handle the posts and comments of this forum's userbase:
          </p>
          <div>
            <div>
              users
            </div>
            <table className='users-relational'>
              <thead>
                <tr>
                  <th>id</th>
                  <th>username</th>
                  <th>email</th>
                  <th>password_digest</th>
                  <th>admin</th>
                  <th>created_at</th>
                  <th>updated_at</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>"jimchrist"</td>
                  <td>"literallyhitler@example.com"</td>
                  <td>"$2a$10$YqUOsQSzmlKoILXwCrnVOOUOmp9SSEgR6aasAPGBfdgPjmfuLhC/O"</td>
                  <td>true</td>
                  <td>"2014-07-14 19:34:47"</td>
                  <td>"2015-09-15 12:30:42"</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>"PackersFan96"</td>
                  <td>"greenbay@example.com"</td>
                  <td>"$2a$10$B3BC0qh7HyTZvsN6jEHOh.5ZhZ2rhQFiSGJfk4Q56n4hyaCiUkohO"</td>
                  <td>false</td>
                  <td>"2015-12-14 01:11:10"</td>
                  <td>"2015-09-14 00:55:47"</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>"IHeartATX"</td>
                  <td>"asdf@example.com"</td>
                  <td>"$2a$10$5YwBHb2WzFJVD3SX8W4sauxHTDOtSYFDvQDvZpgHAFtb2a27lhWgS"</td>
                  <td>false</td>
                  <td>"2015-08-14 01:00:20"</td>
                  <td>"2015-09-15 10:52:40"</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>"implosions"</td>
                  <td>"groundpound@example.com"</td>
                  <td>"$2a$10$7qp0k2HOCVyQ4pyDhkyRXeBsV0o.KT8UCFCmpg8yNKcel5Vp2f/Ca"</td>
                  <td>false</td>
                  <td>"2015-09-13 12:29:05"</td>
                  <td>"2015-09-14 07:00:59"</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <div>
              posts
            </div>
            <table className='posts-relational'>
              <thead>
                <tr>
                  <th>id</th>
                  <th>title</th>
                  <th>body</th>
                  <th>user_id</th>
                  <th>created_at</th>
                  <th>updated_at</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>"I am never not right."</td>
                  <td>"Prove me wrong, peasants.\n\nEDIT: You're all getting bans once our db schema can handle them."</td>
                  <td>1</td>
                  <td>"2015-09-17 09:33:53"</td>
                  <td>"2015-09-17 09:55:21"</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>"jimchrist's mom general."</td>
                  <td>"any pics yet?"</td>
                  <td>4</td>
                  <td>"2015-12-14 01:11:10"</td>
                  <td>"2015-09-14 00:55:47"</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <div>
              comments
            </div>
            <table className='comments-relational'>
              <thead>
                <tr>
                  <th>id</th>
                  <th>body</th>
                  <th>user_id</th>
                  <th>commentable_id</th>
                  <th>commentable_type</th>
                  <th>created_at</th>
                  <th>updated_at</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>"first"</td>
                  <td>3</td>
                  <td>1</td>
                  <td>"Post"</td>
                  <td>created_at</td>
                  <td>updated_at</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>"ur mum's always right"</td>
                  <td>4</td>
                  <td>1</td>
                  <td>"Post"</td>
                  <td>created_at</td>
                  <td>updated_at</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>"That she is. After all, she did raise yours truly."</td>
                  <td>1</td>
                  <td>2</td>
                  <td>"Comment"</td>
                  <td>created_at</td>
                  <td>updated_at</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>"he meant that in a sexual way sperglord"</td>
                  <td>2</td>
                  <td>3</td>
                  <td>"Comment"</td>
                  <td>created_at</td>
                  <td>updated_at</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>"Let's stay on topic people. Am I ever wrong?"</td>
                  <td>1</td>
                  <td>1</td>
                  <td>"Post"</td>
                  <td>created_at</td>
                  <td>updated_at</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>"not as wrong as your mother LMAO"</td>
                  <td>2</td>
                  <td>5</td>
                  <td>"Comment"</td>
                  <td>created_at</td>
                  <td>updated_at</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>"working on it"</td>
                  <td>2</td>
                  <td>2</td>
                  <td>"Post"</td>
                  <td>created_at</td>
                  <td>updated_at</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>"pls stop fighting ;_;"</td>
                  <td>3</td>
                  <td>1</td>
                  <td>"Post"</td>
                  <td>created_at</td>
                  <td>updated_at</td>
                </tr>
              </tbody>
            </table>
          </div>
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
