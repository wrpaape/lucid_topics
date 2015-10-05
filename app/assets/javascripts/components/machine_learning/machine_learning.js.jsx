/* globals React */
'use strict';

var MachineLearning = React.createClass({
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
            What is Machine Learning?
          </h3>
          <p>
            Machine learning is the science of getting computers to act <strong>without
            being explicitly programmed</strong>. Machine learning explores the study and
            construction of algorithms that can learn from and make predictions on data.
            These algorithms operate by building an internal model from example inputs
            in order to make data-driven predictions or decisions, rather than following
            strictly static program instructions. These models exist in a program as a
            collection of <strong>tunable parameters</strong> typically expressed as one
            or more lists of decimal numbers).
          </p>
          <p>
            Accordingly, machine learning can be considered a subfield of Artificial
            Intelligence since these algorithms can be seen as building blocks to make
            computers learn to behave more intelligently by <strong>generalizing
            </strong> and <strong>adapting to previously seen data</strong> rather than
            adopting basic instruct-execute functionality.
          </p>
          <h3>
            General Concepts
          </h3>
          <p>
            The classification of machine learning tasks can be boiled down into three
            general categories, depending on the nature of the learning "signal" or "feedback"
            available to a learning system:
          </p>
          <ol className='main'>
            <li>
              <h4>
                Supervised Learning
              </h4>
              <Img src={ imgPath + 'sl_flowchart.png' } />
              <p>
                The program is presented with example inputs <strong>and</strong> their desired
                outputs, given by a "teacher", and the goal is to <strong>learn a general rule
                that maps inputs to outputs</strong>.
              </p>
            </li>
            <li>
              <h4>
                Unsupervised Learning
              </h4>
              <Img src={ imgPath + 'ul_flowchart.png' } />
              <p>
                Unsupervised learning can be a goal in itself, for instance, when a program is
                given the task of <strong>discovering hidden patterns in data</strong>. It can
                also be implemented as an intermediate step toward reaching some goal. Such is
                the case in "feature learning" or "representation learning," where the aim of a
                program is to <strong>learn how to learn</strong>. An unsupervised feature learning
                program usually follows the "semi-supervised learning" pattern of first developing a
                general rule of classification from studying "unlabeled data" or data where a target
                pattern is initially unknown to the program and then applying that rule to develop
                a mapping function as <strong>its own supervisor</strong> or teacher. Some tasks
                where an unsupervised learning pattern may come in handy:
              </p>
              <ul>
                <li>
                  The blind source separation problem:&nbsp;&nbsp;given a mixture of two sound sources
                  (for example, a person talking over some music), separate the two.
                </li>
                <li>
                  Given detailed observations of distant galaxies, determine which features or
                  combinations of features are most important in distinguishing between galaxies.
                </li>
              </ul>
            </li>
            <li>
              <h4>
                Reinforcement Learning
              </h4>
              <p>
                Inspired by behaviorist psychology (think Pavlov's dog), the principles of reinforcement learning
                achieve a program that acts in an environment so as to <strong>maximize some notion of
                culmlative reward</strong>.
              </p>
            </li>
          </ol>
        </section>
        <section>
          <h3>
            Machine Learning vs. Statistical Learning, a Tale of Two Implementations
          </h3>
          <div className='quote'>
            <i>...perhaps that’s child’s play compared to the true original sin of ML nomenclature:
            tossing around the highly deceptive term “neural network” for a stack of linear functions
            paired with a wonky, overhyped training algorithm; the combination of which, many years
            later, still causes confusion.</i>
            <div>
              <div>
                – Brennan O'Connor, author
                of <a href='http://brenocon.com/blog/2008/12/statistics-vs-machine-learning-fight/' target='_blank'>
                  <i>
                    Statistics vs. Machine Learning, fight!
                  </i>
                </a>, on staticians "marketing" of their field through cool lingo
              </div>
            </div>
          </div>
          <table className='wcap'>
            <caption>
              Taken from
              a <a href='http://blogs.sas.com/content/subconsciousmusings/2014/08/22/looking-backwards-looking-forwards-sas-data-mining-and-machine-learning/' target='_blank'>
                data mining primer course in 1998
              </a>, the venn diagram above depicts the then-perceived overlap between
              the analytical sciences of statistics and machine learning:  none. While there remains a
              cultural split between the two
              fields <a href='http://norvig.com/chomsky.html' target='_blank'>
                to this day
              </a>, the consensus today is that they share much in common and benefit heavily from each others' works,
              with machine learning validating statistics through engineering success.
            </caption>
            <tbody>
              <tr>
                <td><Img src={ imgPath + 'ml_venn.png' } /></td>
              </tr>
            </tbody>
          </table>
          <p>
            WIP
          </p>
          <div>
            <table className='wcap'>
              <caption>
                an amusing <a href='http://www-stat.stanford.edu/~tibs/stat315a/glossary.pdf' target='_blank'>
                  comparison
                </a> of analogous buzzwords from machine learning and statistics by statistician and machine
                learning expert Robert Tibshiriani
              </caption>
              <thead>
                <tr>
                  <th>Machine Learning</th>
                  <th>Statistics</th>
                </tr>
              </thead>
              <tbody>             
                <tr>
                  <td>network, graphs</td>
                  <td>model</td>
                </tr>
                <tr>
                  <td>weights</td>
                  <td>parameters</td>
                </tr>
                <tr>
                  <td>learning</td>
                  <td>fitting</td>
                </tr>
                <tr>
                  <td>generalization</td>
                  <td>test set performance</td>
                </tr>
                <tr>
                  <td>supervised learning</td>
                  <td>regression/classification</td>
                </tr>
                <tr>
                  <td>unsupervised learning</td>
                  <td>density estimation, clustering</td>
                </tr>          
                <tr>
                  <td>large grant = $1,000,000</td>
                  <td>large grant = $50,000</td>
                </tr>
                <tr>
                  <td>nice place to have a meeting: Snowbird, Utah, French Alps</td>
                  <td>nice place to have a meeting: Las Vegas in August</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h3>
            Data Modeling and Algorithmic Modeling, the Other Black Box 
          </h3>
          <div className='quote'>
            <i>My job as a spacecraft engineer was not to land on Mars, but to land on the model
            of Mars provided by the geologists.</i>
            <div>
              <div>
                – James Martin, leader of NASA's Viking missions to Mars
              </div>
            </div>
          </div>
        </section>
        { this.props.buzzwordBank }
      </div>
    );
  }
});
