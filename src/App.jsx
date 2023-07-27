
import { useEffect, useState } from 'react'
import './App.css'
import cheerio from 'cheerio';

let currentUser = import.meta.env.VITE_USER || "user1";
const serverUrl = import.meta.env.VITE_SERVER_URL;

function App() {
  const [pluginData, setPluginData] = useState("");
  const [headContent, setHeadContent] = useState("");
  const [bodyContent, setBodyContent] = useState("");

  useEffect(() => {
    fetch(serverUrl + '/api/' + currentUser)
      .then(res => res.json())
      .then(data => {
        // console.log(data.plugins.googleAnalytics.key)
        const script = document.createElement("script");
        script.src = "https://www.googletagmanager.com/gtag/js?id=" + data.plugins.googleAnalytics.key
        script.id = "google-analytics-script"
        script.async = true;
        document.head.appendChild(script);

        const script2 = document.createElement("script");
        script2.innerText = `
          {window.dataLayer = window.dataLayer || []};
          function gtag() { dataLayer.push(arguments); };
          gtag('js', '${new Date()}');
          gtag('config', '${data.plugins.googleAnalytics.key}');
        `
        document.head.appendChild(script2);

        setPluginData(data.data);
      })
      .catch(err => console.log(err));

  }, []);

  useEffect(() => {
    const content = cheerio.load(pluginData)
    const headHtml = content('head').html();
    const bodyHtml = content('body').html();
    // if (headHtml) {
    //   const tempHead = document.createElement("div")
    //   tempHead.innerHTML = headHtml;

    //   const originalHead = document.head;

    //   while (tempHead.firstChild) {
    //     originalHead.appendChild(tempHead.firstChild)
    //     // tempHead.removeChild(tempHead.firstChild);
    //   }
    // }
    setHeadContent(headHtml);
    setBodyContent(bodyHtml);
  }, [pluginData]);

  return (
    <>
      {pluginData
        ? <div dangerouslySetInnerHTML={{ __html: bodyContent }}></div>
        : <div>Loading...</div>
      }
    </>
  )
}

export default App
