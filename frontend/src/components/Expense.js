import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Row, Col, Form, Button } from 'react-bootstrap';

const Expense = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [expense, setExpense] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const getExpenses = async () => {
    const { data } = await axios.get('/api/expenses');
    setExpense(data);
  };

  useEffect(() => {
    getExpenses();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.post('/api/expenses', { description, amount, paidBy });
    setDescription('');
    setAmount('');
    setPaidBy('');
    getExpenses();
  };

  const deleteHandler = async (id) => {
    await axios.delete(`/api/expenses/${id}`);
    getExpenses();
  };

  const editHandler = (id) => {
    const filteredExpense = expense.filter((expense) => expense._id === id);
    console.log(filteredExpense[0]);
    setIsEdit(true);
    setDescription(filteredExpense[0].description);
    setAmount(filteredExpense[0].amount);
    setPaidBy(filteredExpense[0].paidBy);
    setSelectedPostId(filteredExpense[0]._id);
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    const updatedExpense = { description, amount, paidBy };
    await axios.put(`/api/expenses/${selectedPostId}`, updatedExpense);
    setDescription('');
    setAmount('');
    setPaidBy('');
    getExpenses();
  };

  return (
    <div>
      <Form onSubmit={isEdit ? updateHandler : submitHandler}>
        <Row>
          <Col md={4}>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                value={description}
                placeholder='Enter Description'
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId='amount'>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                value={amount}
                type='number'
                placeholder='Enter Amount'
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId='paidBy'>
              <Form.Label>Paid By</Form.Label>
              <Form.Control
                type='text'
                value={paidBy}
                placeholder='Paid By'
                onChange={(e) => setPaidBy(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col className='justify-content-center'>
            <Button
              variant='primary'
              type='submit'
              // disabled={!description.length || !amount.length || !paidBy.length}
            >
              {isEdit ? 'Update' : 'Add'}
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expense.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{expense.paidBy}</td>
              <td>
                <Button
                  variant='primary'
                  className='btn-sm'
                  onClick={() => editHandler(expense._id)}
                >
                  <i className='fas fa-edit'></i>
                </Button>{' '}
                <Button
                  variant='danger'
                  className='btn-sm'
                  onClick={() => deleteHandler(expense._id)}
                >
                  <i className='fas fa-trash'></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Expense;
