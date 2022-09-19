import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { CheckLg, Plus } from 'react-bootstrap-icons';

function Tables({ headings, data, myDocIds=[], addToMyDocIds=()=>{},removeFromMyDocIds=()=>{}, myId=0 }) {
  // console.log("TABLEheadings: ", headings);
  // console.log("TABLEdata : ", data);

  // const [myArray, setMyArray] = useState([]);

  // // function addCourse(each){
  // //   setMyArray([...myArray,each]);
  // //   console.log(myArray);
  // // }
  // // function removeCourse(each){
  // //     const myArray = this.state.data?.filter((row) => row !== each);
  // //     this.setMyArray({data: myArray});
  // //   };

  async function apiAddDoc(id) {
    await axios
      .post(`https://college-cup.vercel.app/docs/addToMyDocs?userId=${myId}&docId=${id}`, {})
      .then((res) => {
      })
      .catch((e) => console.dir("error occured catched", e));
  }
  async function apiRemoveDoc(id){
    await axios
    .post(`https://college-cup.vercel.app/docs/removeFromMyDocs?userId=${myId}&docId=${id}`,{})
    .then((res)=>{

    })
    .catch((e) => console.dir("error occured catched", e));
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {headings.map((h) => (
            <th>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((each) => {
          return (
            <tr>
              <td>{each.name}</td>
              <td>{each.code}</td>
              <td>{each.course}</td>
              <td>{each.type}</td>
              <td><a href={each.url}>{"Open"}</a></td>
              {/* {count%2 &&<td><div onClick={()=>addCourse(each)}>Select</div></td>}
              {count%2===0 &&<td><div onClick={()=>removeCourse(each)}>Selected</div></td>} */}
              {myDocIds.includes(each._id)?
              <td>
              <Button variant="success" onClick={()=>{
                removeFromMyDocIds(each._id);
                apiRemoveDoc(each._id);
                console.log("removing", each._id, " from user ", myId, " favourites");
              }}><CheckLg/></Button>
              </td>
              :
              <td>
              <Button variant="secondary" onClick={()=>{
                addToMyDocIds(each._id);
                apiAddDoc(each._id);
                console.log("adding ", each._id, " to user ", myId, " favourites");
              }}><Plus /></Button>
              </td> }

            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default Tables;
