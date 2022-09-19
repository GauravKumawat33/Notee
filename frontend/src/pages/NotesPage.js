import Tables from "../components/Tables";
import SearchBar from "../components/SearchBar";
import "./NotesPage.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';

const headings = ["Name", "Code", "Course", "Type", "Link","Favourite"];

export default function NotesPage() {
  const [data, setData] = useState(() => []);
  const [visibleData, setVisibleData] = useState([]);
  const [searchText, setSearchText] = useState("H");
  const [myDocs, setMyDocs] = useState([]);
  const [myDocIds, setMyDocIds] = useState([]);
  const [myId, setMyId] = useState();
  const [isMyNote,setIsMyNote]=useState(false);

  const addToMyDocIds = (id) => {
    setMyDocIds(current => [...current, id]);

  }
  const removeFromMyDocIds=(id)=>{
    setMyDocIds(current => current.filter( current => current != id))
  }

  const filterData = () => {
    if (searchText == "") {
      setVisibleData(data);
    } else {
      setVisibleData(
        data?.filter(
          (each) =>
            each.name.toUpperCase().includes(searchText) ||
            each.code.toUpperCase().includes(searchText) ||
            each.course.toUpperCase().includes(searchText) ||
            each.type.toUpperCase().includes(searchText)
        )
      );
    }
  };

  const fetchData = async () => {
    // console.log("making api call")
    await axios
      .get(`https://college-cup.vercel.app/docs/getAll`, {})
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => console.dir("error occured catched", e));
  };

  const fetchMyDocs = async () => {
    await axios
      .get(`https://college-cup.vercel.app/docs/getMyDocs?userId=${myId}`)
      .then((res) => {
        setMyDocs(res.data);
        // console.log("my data: ", res);
        for(let item of res.data){
          setMyDocIds(current => [...current, item._id]);
        }
        console.log("got favourites of user ", myId, res.data);
      })
      .catch((e) => console.dir("error occured catched", e));
  };

  async function tempGetId() {
    let id = await getUniqueVisitorId();
    setMyId(id);
    console.log("id got: ",id);
  }
  useEffect(()=>{
    tempGetId();
    fetchData();
  }, [])
  useEffect(()=>{ 
    fetchMyDocs();
  }, [myId,myDocs])

  useEffect(() => {
    // fetchData();
    filterData();
  }, [searchText, data]);


  async function getUniqueVisitorId() {
    return new Promise((resolve, reject) => {
        const fpPromise = import("https://openfpcdn.io/fingerprintjs/v3").then(
            (FingerprintJS) => FingerprintJS.load()
        );

        fpPromise
            .then((fp) => fp.get())
            .then((result) => {
                // This is the visitor identifier:
                const visitorId = result.visitorId;
                resolve(visitorId);
            });
    });
}

  return (
    <div className="container-xxl">
      <div class="float-container">
      <header>
        <h1> Notes : </h1>
        <SearchBar setSearchText={setSearchText} />
      </header>
        <div class="float-child1">
          <div><Button variant={isMyNote? 'primary' : 'secondary'} class="btn" onClick={()=>setIsMyNote(true)}>All Notes</Button></div>
          <div><Button variant={!isMyNote? 'primary' : 'secondary'} class="btn" onClick={()=>setIsMyNote(false)}>My Notes</Button></div>
        </div>
        <div class="float-child2">
          {!isMyNote?
          <Tables headings={headings} data={myDocs} myDocIds={myDocIds} addToMyDocIds={addToMyDocIds} removeFromMyDocIds={removeFromMyDocIds} myId={myId} />
            :
          <Tables headings={headings} data={visibleData} myDocIds={myDocIds} addToMyDocIds={addToMyDocIds} removeFromMyDocIds={removeFromMyDocIds} myId={myId} />
           } </div>
      </div>
    </div>
  );
}
 