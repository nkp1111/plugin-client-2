
import { useEffect, useState } from 'react'
import './App.css'


let currentUser = import.meta.env.VITE_USER || "user1";
const serverUrl = import.meta.env.VITE_SERVER_URL;

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
