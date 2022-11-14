import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Contacts from './Contacts';




const TaskCreate = (props) => {

  const [error, setError] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [errMessage, setErrMessage] = useState("");
  const [cookies, setUserId] = useCookies(["userID"]);
  const [done, setDone] = useState(false);



  const handleSubmit = (e) => {
    e.preventDefault();


    const job = {
      master: cookies.userID,
      worker: props.worker.id,
      name: document.getElementById('name').value,
      comments: document.getElementById('comments').value,
      deadline: document.getElementById('deadline').value,
      status: "Выполнение",
      dateBegin: new Date().toLocaleString()
    }
    

    if (job.name === '') {
      setError(true);
      setErrMessage("Вы не заполнили название задания!")
    } else {
      setError(false);

      axios.post('http://localhost:5000/api/Jobs', job)
        .then(response => {
          setJobId(response.data.id);
          setDone(true);
        })
        .catch(error => {
          setErrMessage("Упс... Что-то пошло не: " + error.message);
          setError(true);
        });
    }
  };

  const errorMessage = () => {
    return (
      <div class="alert alert-danger" role="alert" style={{
        display: error ? '' : 'none',
      }}>
        {errMessage}
      </div>
    );
  };


  if (done) return <Contacts/>
  return (
    <div className='w-50 mt-3'>
      <Form expand="md">

        <div className="messages">
          {errorMessage()}
        </div>

        <h3>Выдать задание</h3>
   
        <Form.Group className="mt-3" >
        <Form.Label>Исполнитель: &emsp; <b>{props.worker.lastName} {props.worker.name}</b></Form.Label>
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Название</Form.Label>
          <Form.Control id='name' type="text" placeholder="Введите название" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Срок</Form.Label>
          <Form.Control id='deadline' type="text" placeholder="Срок выполнения" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Текст задания</Form.Label>
          <Form.Control id='comments' rows="3" as="textarea" aria-label="With textarea" />
        </Form.Group>

        <Button onClick={handleSubmit} className="float-end my-3" variant="success" type="submit">
          Создать
        </Button>

      </Form>
    </div>
  );
}
export default TaskCreate;