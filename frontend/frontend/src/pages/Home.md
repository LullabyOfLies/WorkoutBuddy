import { useEffect , useState} from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import axios from 'axios';

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  // const [workouts, setWorkouts] = useState([])
  const {workouts, dispatch} = useWorkoutsContext();
  const fetchWorkouts = () =>{
    axios.get('http://localhost:3000/api/workouts')
      .then(response => {
        dispatch({ type: 'SET_WORKOUTS', payload: response.data })
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
      });
  }

  useEffect(()=>{
    fetchWorkouts();
  },[])



  return (
    <div className="home">
        <div className="workouts">
        {/* {
          workouts.map(workout => (
            <WorkoutDetails key={workout._id} workout={workout}/>
          ))
        } */}
        {workouts && workouts.map(workout => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home