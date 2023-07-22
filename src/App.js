import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from './utils/reducers/userSlice';

function App() {
  const dispatch = useDispatch()
  const {user, loading, error} = useSelector((state)=>state.users)
  useEffect(()=>{
    dispatch(getUsers({email:"nothing@gmail.com", password:"nothing"}))
  },[])
  console.log(user,"user data");
  return (
    <div>
      {loading && <h1>loading.....</h1>}
      {error && <h1>{error}</h1>}
    </div>
  );
}

export default App;
