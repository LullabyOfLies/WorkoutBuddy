import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import axios from "axios";
import {useAuthContext} from '../hooks/useAuthContext'

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
        const { dispatch } = useWorkoutsContext();
        const { user } = useAuthContext()

        const handleClick = async() =>{
          if(!user){
            return
          }
            try{
              const response = await axios.delete('workout-buddy-api-kappa.vercel.app/api/workouts/'+ workout._id, {
                headers: {
                  'Authorization': `Bearer ${user.token}`
                }
              });
              dispatch({type: 'DELETE_WORKOUT', payload: response.data})
            }catch (error) {
              console.error('Error fetching workouts:', error);
            }
        }
       return (
         <div className="workout-details">
           <h4>{workout.title}</h4>
           <p><strong>Load (kg): </strong>{workout.load}</p>
           <p><strong>Number of reps: </strong>{workout.reps}</p>
           <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true})}</p>
           <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
         </div>
       )
     }
     
     export default WorkoutDetails