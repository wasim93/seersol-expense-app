import React from 'react';
import { Table } from 'react-bootstrap';

const Expense = () => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Description</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Expense;
