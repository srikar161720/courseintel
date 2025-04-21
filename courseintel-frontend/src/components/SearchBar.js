import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

function SearchBar({ value, onChange, onSubmit }) {
  return (
    <Form onSubmit={onSubmit} className="d-flex gap-2 my-4">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="..."
          value={value}
          onChange={onChange}
        />
      </InputGroup>
      <Button variant="dark" type="submit">Search</Button>
    </Form>
  );
}

export default SearchBar;
