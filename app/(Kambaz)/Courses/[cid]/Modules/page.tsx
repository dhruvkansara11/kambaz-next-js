export default function Modules() {
  return (
    <div id="wd-modules-page">
      <button id="wd-collapse-all">Collapse All</button>{" "}
      <button id="wd-view-progress">View Progress</button>{" "}
      <button id="wd-publish-all">Publish All</button>{" "}
      <button id="wd-add-module">+ Module</button>

      <ul id="wd-modules">
        {/* Week 1 */}
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            {/* Lecture 1 */}
            <li className="wd-lesson">
              <span className="wd-title">
                Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda
              </span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  <span className="wd-title">LEARNING OBJECTIVES</span>
                  <ul className="wd-content">
                    <li className="wd-content-item">Introduction to the course</li>
                    <li className="wd-content-item">Learn what is Web Development</li>
                  </ul>
                </li>
                <li className="wd-content-item">
                  <span className="wd-title">READING</span>
                  <ul className="wd-content">
                    <li className="wd-content-item">
                      Full Stack Developer - Chapter 1 - Introduction
                    </li>
                    <li className="wd-content-item">
                      Full Stack Developer - Chapter 2 - Creating User
                    </li>
                  </ul>
                </li>
                <li className="wd-content-item">
                  <span className="wd-title">SLIDES</span>
                  <ul className="wd-content">
                    <li className="wd-content-item">Introduction to Web Development</li>
                    <li className="wd-content-item">Creating an HTTP server with Node.js</li>
                    <li className="wd-content-item">Creating a React Application</li>
                  </ul>
                </li>
              </ul>
            </li>

            {/* Lecture 2 */}
            <li className="wd-lesson">
              <span className="wd-title">
                Week 1, Lecture 2 - Formatting User Interfaces with HTML
              </span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  <span className="wd-title">LEARNING OBJECTIVES</span>
                  <ul className="wd-content">
                    <li className="wd-content-item">Use semantic HTML tags</li>
                    <li className="wd-content-item">Structure pages with lists, tables, and forms</li>
                  </ul>
                </li>
                <li className="wd-content-item">
                  <span className="wd-title">SLIDES</span>
                  <ul className="wd-content">
                    <li className="wd-content-item">Semantic HTML & Accessibility</li>
                    <li className="wd-content-item">Lists, Tables, Forms</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Week 2 */}
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">
                Week 2, Lecture 1 - CSS & Bootstrap Basics
              </span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  <span className="wd-title">LEARNING OBJECTIVES</span>
                  <ul className="wd-content">
                    <li className="wd-content-item">Apply CSS selectors and the box model</li>
                    <li className="wd-content-item">Install and use Bootstrap</li>
                    <li className="wd-content-item">Layout pages with Bootstrap Grid</li>
                    <li className="wd-content-item">Use common components (Navbar, Cards, Buttons)</li>
                  </ul>
                </li>
                <li className="wd-content-item">
                  <span className="wd-title">READING</span>
                  <ul className="wd-content">
                    <li className="wd-content-item">Full Stack Developer - Chapter 3 - CSS & Bootstrap</li>
                  </ul>
                </li>
                <li className="wd-content-item">
                  <span className="wd-title">SLIDES</span>
                  <ul className="wd-content">
                    <li className="wd-content-item">CSS Selectors & Box Model</li>
                    <li className="wd-content-item">Bootstrap Grid System</li>
                    <li className="wd-content-item">Bootstrap Components</li>
                  </ul>
                </li>
              </ul>
            </li>

            <li className="wd-lesson">
              <span className="wd-title">
                Week 2, Lecture 2 - Responsive Design & Utilities
              </span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  <span className="wd-title">LEARNING OBJECTIVES</span>
                  <ul className="wd-content">
                    <li className="wd-content-item">Use responsive breakpoints</li>
                    <li className="wd-content-item">Leverage spacing, display, and flex utilities</li>
                    <li className="wd-content-item">Make images and embeds responsive</li>
                  </ul>
                </li>
                <li className="wd-content-item">
                  <span className="wd-title">SLIDES</span>
                  <ul className="wd-content">
                    <li className="wd-content-item">Responsive Images & Media</li>
                    <li className="wd-content-item">Flex & Utility Classes</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Week 3 */}
        <li className="wd-module">
          <div className="wd-title">Week 3</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">
                Week 3, Lecture 1 - JavaScript ES6 Fundamentals
              </span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  <span className="wd-title">LEARNING OBJECTIVES</span>
                  <ul className="wd-content">
                    <li className="wd-content-item">Variables, scope, and functions</li>
                    <li className="wd-content-item">Arrays, objects, and modern methods</li>
                    <li className="wd-content-item">DOM manipulation and events</li>
                    <li className="wd-content-item">Fetching data with fetch()</li>
                  </ul>
                </li>
                <li className="wd-content-item">
                  <span className="wd-title">READING</span>
                  <ul className="wd-content">
                    <li className="wd-content-item">Full Stack Developer - Chapter 4 - JavaScript Basics</li>
                    <li className="wd-content-item">Full Stack Developer - Chapter 5 - DOM & Events</li>
                  </ul>
                </li>
                <li className="wd-content-item">
                  <span className="wd-title">SLIDES</span>
                  <ul className="wd-content">
                    <li className="wd-content-item">JavaScript Syntax & ES6</li>
                    <li className="wd-content-item">DOM & Event Handling</li>
                  </ul>
                </li>
              </ul>
            </li>

            <li className="wd-lesson">
              <span className="wd-title">
                Week 3, Lecture 2 - React Fundamentals
              </span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  <span className="wd-title">LEARNING OBJECTIVES</span>
                  <ul className="wd-content">
                    <li className="wd-content-item">Create components and JSX</li>
                    <li className="wd-content-item">Pass data via props; manage state</li>
                    <li className="wd-content-item">Use effects and basic routing</li>
                  </ul>
                </li>
                <li className="wd-content-item">
                  <span className="wd-title">SLIDES</span>
                  <ul className="wd-content">
                    <li className="wd-content-item">Project setup (Next.js)</li>
                    <li className="wd-content-item">Components, Props & State</li>
                    <li className="wd-content-item">Hooks Overview</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
