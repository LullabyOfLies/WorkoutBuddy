// WorkoutForm.jsx
import axios from 'axios';
import { React, useState } from 'react';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import {useAuthContext} from '../hooks/useAuthContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user){
      setError('Access Denied, You must be logged in')
    }

    const workout = { title, load, reps };

    try {
      const response = await axios.post('http://localhost:3000/api/workouts', workout, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      setTitle('');
      setLoad('');
      setReps('');
      setError(null);
      setEmptyFields([]);
      console.log('New workout added!', response.data);
      dispatch({ type: 'CREATE_WORKOUT', payload: response.data });
    } catch (error) {
      setError(error.response.data.error);
      setEmptyFields(error.response.data.emptyFields);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Workout!</h3>
      <label>Exercise Title:</label>
      <input type="text" 
      onChange={(e) => setTitle(e.target.value)} 
      value={title} 
      className={emptyFields.includes('title') ? 'error' : ''}
      required
      />

      <label>Load (in Kg):</label>
      <input type="number" 
      onChange={(e) => setLoad(e.target.value)} 
      value={load} 
      className={emptyFields.includes('load') ? 'error' : ''}
      // required
      />
      <label>Reps:</label>
      <input type="number" 
      onChange={(e) => setReps(e.target.value)} 
      value={reps} 
      className={emptyFields.includes('reps') ? 'error' : ''}
      // required
      />
      <button>Add Workout!</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default WorkoutForm;
