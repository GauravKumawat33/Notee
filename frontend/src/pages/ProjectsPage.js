import Tables from "../components/Tables";
import SearchBar from "../components/SearchBar";
import "./NotesPage.css";
import axios from "axios";

const dummydata = [
  {
    "_id": "62e7ffca807b89ca0e98c34e",
    "name": "Carbohydrates",
    "url": "https://drive.google.com/open?id=1rZH_yEwmCpcR6TqLvKuVfUKSjj0qE6VX",
    "code": "BC-201",
    "course": "Advances in Biochemistry",
    "type": "Projects"
  },
  {
    "_id": "62e7ffca807b89ca0e98c34f",
    "name": "Control of Gene expression",
    "url": "https://drive.google.com/open?id=1dQbpkhqOo1NHA4c3ZHPSfKNulhNUFlTH",
    "code": "BC-201",
    "course": "Advances in Biochemistry",
    "type": "Projects"
  },
];

const headings = ['Name', 'Code' ,'Course', 'Type', 'Link'];

export default function NotesPage() {
  return (
    <div className="container-xxl">
      <header>
        <h1> Projects : </h1>
        <SearchBar />
      </header>
      <Tables headings={headings} data = {dummydata} />
    </div>
  );
}
