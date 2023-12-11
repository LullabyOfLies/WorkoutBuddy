import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import axios from 'axios';
import {useAuthContext} from '../hooks/useAuthContext'

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const { workouts , dispatch } = useWorkoutsContext();
  const { user } = useAuthContext()

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get('workout-buddy-api-kappa.vercel.app/api/workouts',{
        headers: {
          'Authorization' : `Bearer ${user.token}`
        }
      });
      dispatch({ type: 'SET_WORKOUTS', payload: response.data });
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  useEffect(() => {
    if(user){
      fetchWorkouts();
    }
  }, [workouts, user]); // No need to include state in the dependency array

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
