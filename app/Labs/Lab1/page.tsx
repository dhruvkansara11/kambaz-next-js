"use client";
import { useState } from "react";
export default function Lab1() {
  const [salary, setSalary] = useState(100000);
  const [rating, setRating] = useState(4);
  const [dob, setDob] = useState("2000-01-21");
  return (
    <div id="wd-lab1">
      <h2>Lab 1</h2>
      <h3> HTML Examples </h3>
        <div id = "wd-h-tag">
            <div id = "wd-p-tag"> </div>
        <h4> Heading Tags </h4>
        Text documents are often broken up into several sections and
        subsections. Each section is usually prefaced with a short
        title or heading that attempts to summarize the topic of the
        section it precedes. For instance this paragraph is preceded by
        the heading Heading Tags. The font of the section headings are
        usually larger and bolder than their subsection headings. This
        document uses headings to introduce topics such as HTML
        Documents, HTML Tags, Heading Tags, etc. HTML heading tags can
        be used to format plain text so that it renders in a browser as
        large headings. There are 6 heading tags for different sizes:
        h1, h2, h3, h4, h5, and h6. Tag h1 is the largest heading and
        h6 is the smallest heading.
            <p id = "wd-p-1" >
            This is the first paragraph. The paragraph tag is used to format
            vertical gaps between long pieces of text like this one.
            </p>
            <p id = "wd-p-2" >
            This is the second paragraph. Even though there is a deliberate white
            gap between the paragraph above and this paragraph, by default
            browsers render them as one contiguous piece of text as shown here on
            the right.
            </p>
            <p id = "wd-p-3" >
            This is the third paragraph. Wrap each paragraph with the paragraph
            tag to tell browsers to render the gaps.
            </p>
        </div>
        <div id = "wd-lists" >
        <h4> List Tags </h4>
        <h5> Ordered List Tag </h5>
            How to make pancakes:
        <ol id = "wd-pancakes" >
        <li> Mix dry ingredients. </li>
        <li> Add wet ingredients. </li>
        <li> Stir to combine. </li>
        <li> Heat a skillet or griddle. </li>
        <li> Pour batter onto the skillet. </li>
        <li> Cook until bubbly on top. </li>
        <li> Flip and cook the other side. </li>
        <li> Serve and enjoy! </li>
        </ol>
            How to make pasta :
        <ol id = "wd-pasta" >
        <li> Soak the pasta in warm water. </li>
        <li> Ass salt in the water. </li>
        <li> Boil it until it becomes soft. </li>
        <li> Then take a separate pan. </li>
        <li> Add tomato, onion, and vegies. </li>
        <li> Cook it at med temp in olive oil. </li>
        <li> Make deliciuos gravy. </li>
        <li> Add the soaked pasta. </li>
        <li> All good now it is ready to eat. </li>
        </ol>
        <h5> Unordered List Tag </h5>
        My favorite books (in no particular order)
        <ul id =  "wd-my-books" >
        <li> Dune </li>
        <li> Lord of the Rings </li>
        <li> Ender&apos;s  Game </li>
        <li> Red Mars </li>
        <li> The Forever War </li>
        </ul>
        Your favorite books (in no particular order)
        <ul id = "wd-your-books" >
        <li> Harry Potter </li>
        <li> Rich Dad Poor Dad </li>
        <li> It starts with us </li>
        <li> It ends with us </li>
        <li> Star Wars </li>
        </ul>
        </div>
        <div id ="wd-tables">
        <h4> Table Tag </h4>
        <table border = { 1 } width = "100%" >
        <thead>
        <tr>
        <th> Quiz </th>
        <th> Topic </th>
        <th> Date </th>
        <th> Grade </th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td> Q1 </td>
        <td> HTML </td>
        <td> 2/3/25 </td>
        <td> 85 </td>
        </tr>
        <tr>
        <td> Q2 </td>
        <td> CSS </td>
        <td> 2/10/25 </td>
        <td> 90 </td>
        </tr>
        <tr>
        <td> Q3 </td>
        <td> Java </td>
        <td> 3/11/25 </td>
        <td> 95 </td>
        </tr>
        <tr>
        <td> Q4 </td>
        <td> Machine Learning </td>
        <td> 4/10/25 </td>
        <td> 100 </td>
        </tr>
        <tr>
        <td> Q5 </td>
        <td> Python </td>
        <td> 2/15/25 </td>
        <td> 75 </td>
        </tr>
        <tr>
        <td> Q6 </td>
        <td> Javascript </td>
        <td> 5/25/25 </td>
        <td> 70 </td>
        </tr>
        <tr>
        <td> Q7 </td>
        <td> React.js </td>
        <td> 4/15/25 </td>
        <td> 88 </td>
        </tr>
        <tr>
        <td> Q8 </td>
        <td> Node.js </td>
        <td> 3/18/25 </td>
        <td> 94 </td>
        </tr>
        <tr>
        <td> Q9 </td>
        <td> Swin Transformer </td>
        <td> 2/15/25 </td>
        <td> 83 </td>
        </tr>
        <tr>
        <td> Q10 </td>
        <td> Django </td>
        <td> 6/14/25 </td>
        <td> 78 </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
        <td colSpan
        =
        { 3 } > Average </td>
        <td> 85.8 </td>
        </tr>
        </tfoot>
        </table>
        </div>
        <div id="wd-images">
        <h4>Image tag</h4>
        Loading an image from the internet: <br />
        <img id="wd-starship" width="400px"
       src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" />
        <br />
        Loading a local image: <br />
        <img id="wd-teslabot" src="/image1.jpeg" height="200px" />
        </div>
        <div id ="wd-forms" >
            <h4> Form Elements </h4>
            <form id = "wd-text-fields" >
            <h5> Text Fields </h5>
            <label htmlFor = "wd-text-fields-username"> Username: </label>
            <input placeholder = "jdoe"  id = "wd-text-fields-username"/> <br />
            <label htmlFor = "wd-text-fields-password" > Password: </label>
            <input type = "password"  id = "wd-text-fields-password" />
            <br />
            <label htmlFor  = "wd-text-fields-first-name" > First name: </label>
            <input type = "text" title =  "John" id = "wd-text-fields-first-name" /> <br />
            <label htmlFor =  "wd-text-fields-last-name" > Last name: </label>
            <input type= "text"  title  = "Doe" id ="wd-text-fields-last-name"></input>
            </form>
            </div>
            < h5 >Text boxes</ h5 >
            < label >Biography:</ label >< br />
            < textarea id=
            "wd-textarea"
            cols
            ={30} rows
            ={10} >Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.</ textarea >
        <h5 id="wd-radio-buttons">Radio buttons</h5>
            <label>Favorite movie genre:</label><br />
            <input type="radio" name="radio-genre" id="wd-radio-comedy" />
            <label htmlFor="wd-radio-comedy">Comedy</label><br />
            <input type="radio" name="radio-genre" id="wd-radio-drama" />
            <label htmlFor="wd-radio-drama">Drama</label><br />
            <input type="radio" name="radio-genre" id="wd-radio-scifi" />
            <label htmlFor="wd-radio-scifi">Science Fiction</label><br />
            <input type="radio" name="radio-genre" id="wd-radio-fantasy" />
            <label htmlFor="wd-radio-fantasy">Fantasy</label>
        <h5 id="wd-checkboxes">Checkboxes</h5>
            <label>Favorite movie genre:</label><br />
            <input type="checkbox" name="check-genre" id="wd-chkbox-comedy" />
            <label htmlFor="wd-chkbox-comedy">Comedy</label><br />
            <input type="checkbox" name="check-genre" id="wd-chkbox-drama" />
            <label htmlFor="wd-chkbox-drama">Drama</label><br />
            <input type="checkbox" name="check-genre" id="wd-chkbox-scifi" />
            <label htmlFor="wd-chkbox-scifi">Science Fiction</label><br />
            <input type="checkbox" name="check-genre" id="wd-chkbox-fantasy" />
            <label htmlFor="wd-chkbox-fantasy">Fantasy</label>
         <h4 id="wd-dropdowns">Dropdowns</h4>
            <h5>Select one</h5>
            <label htmlFor="wd-select-one-genre">Favorite movie genre:</label><br />
            <select id="wd-select-one-genre">
            <option value="COMEDY">Comedy</option>
            <option value="DRAMA">Drama</option>
            <option selected value="SCIFI">Science Fiction</option>
            <option value="FANTASY">Fantasy</option>
            </select>

            <h5>Select many</h5>
            <label htmlFor="wd-select-many-genre">Favorite movie genres:</label><br />
            <select multiple id="wd-select-many-genre">
            <option value="COMEDY" selected>Comedy</option>
            <option value="DRAMA">Drama</option>
            <option value="SCIFI" selected>Science Fiction</option>
            <option value="FANTASY">Fantasy</option>
            </select>
                <h4>Other HTML field types</h4>
            <label htmlFor="wd-text-fields-email">Email:</label>
            <input type="email" placeholder="jdoe@somewhere.com" id="wd-text-fields-email" /><br />
            <label htmlFor="wd-text-fields-salary-start">Starting salary:</label>
            <input type="number" value={salary} onChange={e => setSalary(+e.target.value)} /><br />
            <label htmlFor="wd-text-fields-rating">Rating:</label>
            <input type="range" min="1" max="5" step="1" value={rating} onChange={e => setRating(+e.target.value)} /><br />
            <label htmlFor="wd-text-fields-dob">Date of birth:</label>
            <input type="date" value={dob} onChange={e => setDob(e.target.value)} /><br />
            <div id="wd-links">
            <h4>Links</h4>
            <a href="https://www.lipsum.com" target="_blank">Lorem Ipsum</a><br />
            <a href="https://github.com/yourname/kambaz-next-js" target="_blank">Project Repository</a>
        </div>

    </div>
);
}
