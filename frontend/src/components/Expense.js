import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import swal from 'sweetalert';
import Loader from '../assets/Loader';
import { Table, Row, Col, Form, Button } from 'react-bootstrap';
import ToastContainer, {
  submitNotify,
  updateNotify,
  deleteNotify,
} from '../assets/Toaster';

const Expense = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expense, setExpense] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const getExpenses = async () => {
    const { data } = await axios.get('/api/expenses');
    setExpense(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getExpenses();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = { description, amount, paidBy };
    await axios.post('/api/expenses', data);
    submitNotify();
    getExpenses();
    setDescription('');
    setAmount('');
    setPaidBy('');
  };

  const deleteHandler = (id) => {
    swal({
      title: 'Are you sure?',

      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`/api/expenses/${id}`).then((res) => {
          deleteNotify();
          getExpenses();
          setDescription('');
          setAmount('');
          setPaidBy('');
        });
      }
    });
  };

  const editHandler = (id) => {
    const filteredExpense = expense.filter((expense) => expense._id === id);
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
    updateNotify();
    setDescription('');
    setAmount('');
    setPaidBy('');
    setIsEdit(false);
    getExpenses();
  };

  return (
    <div>
      {<ToastContainer />}
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
                as='select'
                value={paidBy}
                onChange={(e) => setPaidBy(e.target.value)}
              >
                <option>Select</option>
                <option value='Amir'>Amir</option>
                <option value='Hammad'>Hammad</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col className='justify-content-center'>
            <Button
              className='my-3'
              variant='primary'
              type='submit'
              disabled={!description || !amount || !paidBy}
            >
              {isEdit ? 'Update' : 'Add'}
            </Button>
          </Col>
        </Row>
      </Form>
      {isLoading ? (
        <Loader />
      ) : (
        <Table striped bordered hover size='sm'>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Paid By</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {expense.map((expense) => (
              <tr key={expense._id}>
                <td>{expense.description}</td>
                <td>{expense.amount}</td>
                <td>{expense.paidBy}</td>
                <td>{moment(expense.createdAt).format('Do-MMM-YY')}</td>
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
      )}
    </div>
  );
};

export default Expense;
