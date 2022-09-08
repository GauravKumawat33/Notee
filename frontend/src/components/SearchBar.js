import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function SearchBar({ setSearchText }) {
  const handleSearch = (e) => {
    console.log("Changes");
    setSearchText(e.target.value.toUpperCase());
  };
  return (
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        onChange={handleSearch}
      />
    </Form>
  );
}
