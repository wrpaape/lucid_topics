/* globals React */
'use strict';

var Databases = React.createClass({
  render: function() {
    var imgPath = this.props.paths.img;

    return(
      <div>
        <div className='nav header'>
          <span onClick={ this.props.goBack }>
            back
          </span>
          { this.props.downloadPdf }
        </div>
        { this.props.title }
         <section>
          <h3>
            What is a Database?
          </h3>
          <table className='image-caption split'>
            <caption>
              If you've endured a PowerPoint presentation in a business setting in the 20 or 21st
              century chances are this guy popped up somewhere in the corner of the slide with the
              big messy flowchart. The universal symbol for database, the cylinder, has roots in
              technology that predates the database concept (see right).
            </caption>
            <tbody>
              <tr>
                <td><Img src={ imgPath + 'cylinder.png' } /></td>
              </tr>
            </tbody>
          </table>
          <table className='image-caption split'>
            <caption>
              Invented in the early 30's, drum memory was widely used as computer storage around
            the time early database models were being hashed out on the drawing board. You'd be
            blind not see the resemblance, however, a database as a system serves a
            purpose <strong>more thorough than a simple means of storage</strong>.
            </caption>
            <tbody>
              <tr>
                <td><Img src={ imgPath + 'drum.png' } /></td>
              </tr>
            </tbody>
          </table>
          <p>
            The general definition of a database is "<i>a collection of information organized to provide
            efficient retrieval</i>." Technically a floppy disk, an Excel spreadsheet, and even a rolodex qualifies
            as a database, but what developers most likely refer to when answering the question "What database
            does your product use?" is a <strong>database management system</strong> or DBMS. A DBMS
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
            the sophisticated DBMS "MySQL", a popular open source implementation of <strong>SQL</strong> (
            <strong>S</strong>tructured <strong>Q</strong>uery <strong>L</strong>anguage), the programming
            language used for querying and updating relational databases. In most cases pen and paper or 16GB
            of storage will suffice for managing personal phone numbers as this data is:
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
                Contacts will need to be added, updated, or removed manageably infrequently.
              </p>
            </li>
          </ol>
          <p>
            Note the keyword "manageably". While there's probably a several-orders-of-magnitude
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
            <h3>
              users
            </h3>
            <table>
              <thead>
                <tr>
                  <th>username</th>
                  <th>email</th>
                  <th className='width-25'>password_digest</th>
                  <th className='width-10'>admin</th>
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
            to this day as one of the most common and powerful database implementations. Returning
            to our example, let's populate this forum with some commonplace forum dialogue:
          </p>
          <div>
            <div className='post'>
              <h3>
                I am never not right.
              </h3>
              <div>
                jimchrist:&nbsp;&nbsp;Prove me wrong, peasants.
                <br />
                <br />
                EDIT:&nbsp;&nbsp;You're all getting bans once our db schema can handle them.
                <div>
                  IHeartATX:&nbsp;&nbsp;first
                </div>
                <div>
                  implosions:&nbsp;&nbsp;ur mum's always right
                  <div>
                    jimchrist:&nbsp;&nbsp;That she is. After all, she did grace the world with yours truly.
                    <div>
                      PackersFan96:&nbsp;&nbsp;he meant that in a sexual way sperglord
                    </div>
                  </div>
                </div>
                <div>
                  jimchrist:&nbsp;&nbsp;Let's stay on topic people. Am I ever wrong?
                  <div>
                    PackersFan96:&nbsp;&nbsp;not as wrong as your mother LMAO
                  </div>
                </div>
                <div>
                  IHeartATX:&nbsp;&nbsp;pls stop fighting ;_;
                </div>
              </div>
            </div>
            <div className='post'>
              <h3>
                jimchrist's mom general
              </h3>
              <div>
                implosions:&nbsp;&nbsp;any pics yet?
                <div>
                  PackersFan96:&nbsp;&nbsp;working on it
                </div>
              </div>
            </div>
          </div>
          <p>
            Let's see how an RDBMS would handle this dataset:
          </p>
          <div>
            <h3>
              users
            </h3>
            <table>
              <thead>
                <tr>
                  <th className='width-5'>id</th>
                  <th>username</th>
                  <th>email</th>
                  <th className='width-25'>password_digest</th>
                  <th className='width-10'>admin</th>
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
            <h3>
              posts
            </h3>
            <table>
              <thead>
                <tr>
                  <th className='width-5'>id</th>
                  <th>title</th>
                  <th className='width-25'>body</th>
                  <th className='width-10'>user_id</th>
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
                  <td>"2015-09-17 09:51:21"</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>"jimchrist's mom general"</td>
                  <td>"any pics yet?"</td>
                  <td>4</td>
                  <td>"2015-09-17 09:51:50"</td>
                  <td>"2015-09-17 09:51:50"</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h3>
              comments
            </h3>
            <table>
              <thead>
                <tr>
                  <th className='width-5'>id</th>
                  <th className='width-25'>body</th>
                  <th className='width-10'>user_id</th>
                  <th className='width-15'>commentable_id</th>
                  <th className='width-15'>commentable_type</th>
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
                  <td>"2015-09-17 09:34:20"</td>
                  <td>"2015-09-17 09:34:20"</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>"ur mum's always right"</td>
                  <td>4</td>
                  <td>1</td>
                  <td>"Post"</td>
                  <td>"2015-09-17 09:39:09"</td>
                  <td>"2015-09-17 09:39:09"</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>"That she is. After all, she did grace the world with yours truly."</td>
                  <td>1</td>
                  <td>2</td>
                  <td>"Comment"</td>
                  <td>"2015-09-17 09:40:10"</td>
                  <td>"2015-09-17 09:40:10"</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>"he meant that in a sexual way sperglord"</td>
                  <td>2</td>
                  <td>3</td>
                  <td>"Comment"</td>
                  <td>"2015-09-17 09:44:41"</td>
                  <td>"2015-09-17 09:44:41"</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>"Let's stay on topic people. Am I ever wrong?"</td>
                  <td>1</td>
                  <td>1</td>
                  <td>"Post"</td>
                  <td>"2015-09-17 09:46:12"</td>
                  <td>"2015-09-17 09:46:12"</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>"not as wrong as your mother LMAO"</td>
                  <td>2</td>
                  <td>5</td>
                  <td>"Comment"</td>
                  <td>"2015-09-17 09:49:34"</td>
                  <td>"2015-09-17 09:49:34"</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>"working on it"</td>
                  <td>2</td>
                  <td>2</td>
                  <td>"Post"</td>
                  <td>"2015-09-17 09:52:42"</td>
                  <td>"2015-09-17 09:52:42"</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>"pls stop fighting ;_;"</td>
                  <td>3</td>
                  <td>1</td>
                  <td>"Post"</td>
                  <td>"2015-09-17 09:53:12"</td>
                  <td>"2015-09-17 09:53:12"</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Note the fields having "id" or "type" in them.  These are called <strong>keys</strong> and
            make possible the efficiency and raw speed with which RDBMSs handle structured data.
            A key in most cases is unique and immutable and can be classified as either "primary" or "foreign."
            The convention is that field or column names indicating the primary key are labeled "id"
            and that foreign keys occupy the column (or columns in the case of polymorphic associations)
            labeled with the singular of the parent entry's table name followed by "id" and sometimes
            "type." Using this simple system of recording <strong>associations</strong> by <strong>
            inserting the parent entry's primary key into its child(ren) entry(ies) as a foreign key</strong>, a
            sophisticated network of otherwise independent tables of data can be established.
          </p>
          <p>
            In the case of our forum, the "one-to-many" association between a user and their posts can
            be handled without having to cram the contents of every post belonging to each user into
            its corresponding entry in the "users" table. Rather a separate "posts" table is created
            where ownership of each post entry is expressed by the value of its foreign key "user_id."
            The case is similar with the "comments" table, however, since our forum allows for users
            to comment on posts AND other comments as well, ownership must be expressed through two
            foreign keys: "commentable_id" and "commentable_type" where commentable_type indicates
            which table (posts or comments) the RDBMS should look up for the parent having an id with
            the value of its commentable_id. Accordingly the polymorphic (meaning that this table can
            belong to two or more separate tables on a single association) association establishing one
            post-to-many comments AND one comment-to-many comments can be handled with ease.
          </p>
          <p>
            While our users-posts-comments database exhibits just two cases of the one-to-many association,
            a vast library of all types of "one-to-one," "one-to-many," and "many-to-many" associations
            are at your disposal with a standard RDBMS which can be tailored to your specific data-handling
            needs. In fact, whole careers are devoted to determining the "best" selection of RDBMS
            associations for configuring a client's database. That being said, a relational DBMS is
            not always the best match for certain sets of data. Particularly the handling of <strong>
            loosely structured</strong> or <strong>unstructured data</strong> is not their forte. For these
            special cases, its best practice in database architecture to implement...
          </p>
        </section>
        <section>
          <h3>
            The RDF Data Model
          </h3>
          <p>
            RDF is a simple language for expressing data models,
            which refer to objects ("resources") and their associations or relationships. RDF Schema
            is a vocabulary for describing properties and classes of RDF-based resources, with semantics
            for generalized-hierarchies of such properies and classes. The RDF data model consists of
            resources, properties and values. Resources can be anything, including documents, people, physical
            objects, and abstract concepts. Properties are the relationships that bind together
            resources and values.  A value, however, is either a resource or a primitive data type.
            The basic unit to represent information in RDF is <strong>the statement</strong>.
          </p>
          <table className='image-caption'>
            <caption>
              The Seven Bridges of Königsberg is a classic historical problem
              best known academically for its solution by Leonhard Euler providing the early framework
              for <strong>graph theory</strong>, an area of study in mathematics and computer
              science which factored heavily in the development of the RDF data model. The problem was
              to devise a walk through the city of Königsberg, Prussia (shown left) that would cross each
              bridge once and only once, under the conditions that:
              <ol>
                <li>
                  islands can only be reached by the bridges, and that
                </li>
                <li>
                  every bridge once accessed must be crossed to its other end.
                </li>
              </ol>
              Euler's solution proving this walk impossible involved stripping the cluttered, awkward
              layout of the city map down to a simplified <strong>graph</strong> of nodes and vertices
              representing islands of land and the bridges connecting them, respectively.
            </caption>
            <tbody>
              <tr>
                <td><Img className='full-scale' src={ imgPath + 'bridges_graph.png' } /></td>
              </tr>
            </tbody>
          </table>
          <p>
            Though its mathematical roots date back to Euler's Königsberg Bridge problem published in 1736,
            the Resource Descriptive Framework or RDF's implementation as a database management system
            stems from the development of the first non relational databases in the late 1960's.
            Later referred to commonly as "NoSQL" or "Not only SQL", the motivation for the 
            diverting from the beaten RDBMS path include:
          </p>
          <ul>
            <li>
              simplicity of design
              <p>
                Instead of a network of several tables having columns configured according to the different
                data they contain, <strong>an RDF database houses the entirety of its data in a
                single table</strong> most commonly configured with 3 columns.
              </p>
            </li>
            <li>
              horizontal scalability
              <p>
                An advantage of RDF DBMSs like NoSQL is the ability to manage a single database
                with a network of machines. Splitting a database across multiple machines traditionally
                meant exporting and loading copied data, which leads to costly maintenance
                at large enough scale to keep data consistent and up to date. Because NoSQL can
                function in a distributed setting, users can scale their database by running it seamlessly
                across additional inexpensive machines that share one database instance rather than having
                to scale vertically with increasingly costly upgrades to their existing machines.
              </p>
            </li>
            <li>
              finer control over availability
              <p>
                The philosophy of the RDF DBMS favors availability, partition tolerance, and speed
                at the compromise of data consistency. While recent "NewSQL" databases promise "eventual
                consistency" with database updates propogated to all nodes in a matter of milliseconds,
                responding to a chnage in the chain of associations in NoSQL is not as simple as flipping the value
                of a single relational foreign key. Accordingly, most modern NoSQL datbases are considered <strong>
                BASE</strong> (<strong>B</strong>asically <strong>A</strong>vailable, <strong>S</strong>oft state,
                and <strong>E</strong>ventually consistent) in contrast to the traditional <strong>ACID</strong> (
                <strong>A</strong>tomic, <strong>C</strong>onsistent, <strong>I</strong>solated, and <strong>
                D</strong>urabile) principles of reliable database transactions.
              </p>
            </li>
          </ul>
          <h4>
            Triplestore
          </h4>
          <p>
            The triplestore database, an RDF database that has become very popular across a wide range
            of applications as of late, has the ability to ingest diverse data, allowing flexibility to
            schema changes as data does not have to be reloaded. Particularly noteworthy is the triplestore's
            elegant handling of unstructured data, which is data that either:
          </p>
          <ul>
            <li>
              does not adhere to a predefined data model or schema, or, generally put,
            </li>
            <li>
              is not organized in some pre-defined manner.
            </li>
          </ul>
          <p>
            Consider the following diagram modeling a typical relational database
            schema structured to track the interations between a population of a few thousand
            farmers and their clientele:
          </p>
          <Img className='full-scale' src={ imgPath + 'farmers_rdbms_schema.png' } />
          <p>
            With this configuration a classical RDBMS such as Active Record + SQL can, with proper querying,
            retreive valuable underlying information embedded in complex relationships with lightning speed and efficiency:
          </p>
          <blockquote>
            <strong>best selling crop:</strong>
            <pre> 
              <code>
                {
                  'query: Crop.select("crops.*,\n' + 
                  '                    COUNT(contracts.id)\n' +
                  '                    AS contracts_count")\n' +
                  '           .joins(:contracts)\n' +
                  '           .group(:id)\n' +
                  '           .order("contracts_count DESC")\n' +
                  '           .take\n' +
                  '\n' +
                  'returns => { \n' +
                  '             id: 44,\n' +
                  '             name: "strawberries",\n' + 
                  '             yield: 50500.0,\n' +
                  '             created_at: Sat, 15 Aug 2015 00:19:19 CDT -05:00,\n' +
                  '             updated_at: Sat, 15 Aug 2015 00:19:19 CDT -05:00,\n' +
                  '             contracts_count: 775\n' + 
                  '           }\n' +
                  '           (12.2 ms)'
                }
              </code>
            </pre>
            <strong>most profitable farmer:</strong>
            <pre>
              <code>
                {
                  'query: Farmer.joins(:contracts, :farm)\n' +
                  '             .select("farmers.*,\n' +
                  '                      SUM(price * weight) -\n' +
                  '                      maintenance -\n' +
                  '                      (SELECT SUM(upkeep)\n' +
                  '                        FROM fields\n' +
                  '                        WHERE farm_id = farms.id)\n' +
                  '                      AS profit")\n' +
                  '             .group("farmers.id,\n' +
                  '                     farms.id")\n' +
                  '             .order("profit DESC")\n' +
                  '             .take\n' +
                  '\n' +
                  'returns => { \n' +
                  '             id: 900,\n' +
                  '             name: "Garth",\n' + 
                  '             created_at: Sat, 15 Aug 2015 00:19:13 CDT -05:00,\n' +
                  '             updated_at: Sat, 15 Aug 2015 00:19:13 CDT -05:00,\n' +
                  '             profit: 79934.025618004\n' + 
                  '           }\n' +
                  '           (58.6 ms)'
                }
              </code>
            </pre>
          </blockquote>
          <p>
            This is possible because ahead of time because one-by-one each data entry
            was inserted into one of the 6 database tables (farmers, contracts, clients,
            farms, fields, and clients) with its relationships <strong>established ahead of
            time</strong> by the allocation of keys. For example, if farmer "Garth" was contracted
            to grow "strawberries", the entry representing that contract would hold keys pointing
            to "Garth" and "strawberries":
          </p>
          <blockquote>
            <pre>
              <code>
                {
                  'one of Garth\'s contracts => { \n' +
                  '                               id: (contract\'s id),\n' +
                  '                               ...\n' + 
                  '                               farmer_id: 900\n' +
                  '                               crop_id: 44\n' +
                  '                               ...\n' + 
                  '                             }'
                }
              </code>
            </pre>
          </blockquote>
          <p>
            The key phrase "established ahead of time" means that a vanilla RDBMS's "knowledge"
            of the data it handles is limited to the exact specification of its entries' schema.
            Active Record + SQL knows that Garth sold strawberries because an entry on the
            "contracts" table points <strong>directly</strong> at Garth's and strawberries's
            ids. This means that... 
          </p>
          <h3>
            <strong>A traditional relational DBMS is not capable of inferencing, reasoning, or
            interpolation of any kind when handling a query.</strong>
          </h3>
          <p>
            So how do triplestores do what RDBMS's can't?
          </p>
          <h4>
            The Statement (Triple)
          </h4>
          <p>
            A statement is a 'triple' of the type:
          </p>
          <p>
            <samp>subject</samp> - <samp>predicate</samp> - <samp>object</samp>
          </p>
          <p>
            where <samp>subject</samp> is a resource, <samp>predicate</samp> is a property, and <samp>object</samp> is a value
            or additional resource. All data is represented in triples in a triplestore database, which form the glue bringing structure
            and order in the form of <strong>graphs</strong> to all but the most capricious globs of raw
            data (much like the RDBMS's method of keys and tables). The subject and object represent
            the two resources being related, and the predicate represents the nature of their relationship.
            The relationship is phrased in a directional way (<strong>from</strong> subject <strong>to</strong> object)
            and is called a property. Take for example the table below housing triples that capture
            a slice of our farmers-clients dataset:
          </p>
          <div>
            <h3>
              farmers and clients statements
            </h3>
            <table className='triples'>
              <thead>
                <tr>
                  <th>subject</th>
                  <th>predicate</th>
                  <th>object</th>
                </tr>
              </thead>
              <tbody>             
                <tr>
                  <td>Ol MacDonald</td>
                  <td>is a</td>
                  <td>Farmer</td>
                </tr>
                <tr>
                  <td>Ol MacDonald</td>
                  <td>has a</td>
                  <td>EIO Ranch</td>
                </tr>
                <tr>
                  <td>EIO Ranch</td>
                  <td>has a</td>
                  <td>Little 'Ol Punkin Patch</td>
                </tr>
                <tr>
                  <td>Lil' Ol' Punkin Patch</td>
                  <td>is size (acres)</td>
                  <td>0.2</td>
                </tr>
                <tr>
                  <td>The Great Pumpkin</td>
                  <td>offers payment ($/lbs) through</td>
                  <td>Halloween Offering</td>
                </tr>
                <tr>
                  <td>Halloween Offering</td>
                  <td>has terms (crop)</td>
                  <td>Pumpkin</td>
                </tr>
                <tr>
                  <td>Halloween Offering</td>
                  <td>has terms (weight lbs)</td>
                  <td>1000000</td>
                </tr>
                <tr>
                  <td>Ol MacDonald</td>
                  <td>receives payment ($/lbs) through</td>
                  <td>Halloween Offering</td>
                </tr>
                <tr>
                  <td>Halloween Offering</td>
                  <td>has payment ($/lbs) of</td>
                  <td>0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Img className='full-scale' src={ imgPath + 'farmers_rdf_graph.png' } />
          <h3>
            <strong>Triplestores are the "smart brain" on top of legacy systems leveraging knowledge,
            rules and inferences to bring meaning to all of your data.</strong>
          </h3>
          <h4>
            AI Applications
          </h4>
          <p>
            WIP
          </p>
          <h4>
            Watson's Triplestore
          </h4>
          <p>
            WIP
          </p>
          <h4>
            Quadstore or Named Graph
          </h4>
          <p>
            N-quads statements are a sequence of RDF terms representing the subject, predicate, object and
            graph label of an RDF Triple and the graph it is part of in a dataset. 
          </p>
        </section>
        { this.props.buzzwordBank }
      </div>
    );
  }
});
