import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        {/* Course 1 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/image2.jpeg" width={200} height={150} alt="React JS" />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">Full Stack software developer</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 2 */}
        <div className="wd-dashboard-course">
        <Link href="/Courses/5130" className="wd-dashboard-course-link">
          <Image src="/image3.jpeg" width={200} height={150} alt="Applied AI" />
          <div>
            <h5>CS5130 Applied Programming and Data Processing for AI</h5>
            <p className="wd-dashboard-course-title">Lecture • Computer Science</p>
            <button>Go</button>
          </div>
        </Link>
      </div>
        {/* Course 3 */}
       <div className="wd-dashboard-course">
        <Link href="/Courses/5200" className="wd-dashboard-course-link">
          <Image src="/image4.jpeg" width={200} height={150} alt="DBMS" />
          <div>
            <h5>CS5200 Database Management Systems</h5>
            <p className="wd-dashboard-course-title">SQL • Modeling • Indexes</p>
            <button>Go</button>
          </div>
        </Link>
      </div>

        {/* Course 4 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/5800" className="wd-dashboard-course-link">
            <Image src="/image5.jpeg" width={200} height={150} alt="Algorithms" />
            <div>
              <h5>CS5800 Algorithms</h5>
              <p className="wd-dashboard-course-title">Design & Analysis</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 5 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/5500" className="wd-dashboard-course-link">
            <Image src="/image6.jpeg" width={200} height={150} alt="SE" />
            <div>
              <h5>CS5500 Software Engineering</h5>
              <p className="wd-dashboard-course-title">Process • Testing • CI/CD</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 6 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/5010" className="wd-dashboard-course-link">
            <Image src="/image7.jpeg" width={200} height={150} alt="DBMS" />
            <div>
              <h5>CS5010 Programming Design Paradigm</h5>
              <p className="wd-dashboard-course-title">Java • Swing • Junit</p>
              <button>Go</button>
              <br/>
            </div>
          </Link>
        </div>
        {/* Course 7 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/5700" className="wd-dashboard-course-link">
            <Image src="/image8.jpeg" width={200} height={150} alt="Networking" />
            <div>
              <h5>CS5700 Fundamentals of Computer Networking</h5>
              <p className="wd-dashboard-course-title">Lecture • Computer Science</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
