
import { useEffect, useState } from 'react'
import './App.css'


let currentUser = 'user2';
const serverUrl = 'http://localhost:3000';

function App() {
  const [pluginData, setPluginData] = useState("");

  useEffect(() => {
    fetch(serverUrl + '/api/' + currentUser)
      .then(res => res.json())
      .then(data => {
        setPluginData(data.data);
      })
      .catch(err => console.log(err));

  }, []);
  return (
    <>
      {pluginData
        ? <div dangerouslySetInnerHTML={{ __html: pluginData }}></div>
        : <div>Loading...</div>
      }
    </>
  )
}

export default App
