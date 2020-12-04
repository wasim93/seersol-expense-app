import React, { useState } from 'react';
import { Table, Row, Col, Form, Button } from 'react-bootstrap';
import expenses from '../expenses';

const Expense = () => {
  const [expense, setExpense] = useState(expenses);
  return (
    <div>
      <Form>
        <Row>
          <Col md={4}>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='description'
                placeholder='Enter Description'
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId='amount'>
              <Form.Label>Amount</Form.Label>
              <Form.Control type='amount' placeholder='Enter Amount' />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId='paidBy'>
              <Form.Label>Paid By</Form.Label>
              <Form.Control type='paidBy' placeholder='Paid By' />
            </Form.Group>
          </Col>
          <Col className='justify-content-center'>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
      <hr />
      <Table striped bordered hover size='sm'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Paid By</th>
          </tr>
        </thead>
        <tbody>
          {expense.map((expense) => (
            <tr>
              <td>{expense.title}</td>
              <td>{expense.amount}</td>
              <td>{expense.paidBy}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Expense;
