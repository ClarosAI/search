import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";
import { getApiDomain } from "../App";
import React, { useState, useEffect } from 'react';
import { Button, TextInput } from '@mantine/core';
import '../App.css'
import ReactMarkdown from 'react-markdown'
import ReactDom from 'react-dom'
 
Session.addAxiosInterceptors(axios);

export default function CallAPIView() {

    const [updatingQuery, setUpdatingQuery] = useState("")
    const [output, setOutput] = useState([
    ])
    const [example, setExample] = useState("example")
    // const [updatingDatabase, setUpdatingDatabase] = useState("")
    // const [updatingCollection, setUpdatingCollection] = useState("")
    

    function handleChange(event) {
        // setState({value: event.target.value});
        setUpdatingQuery(event.target.value)    
      }

      useEffect(() => {
        const listener = async (event) => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            console.log("Enter key was pressed. Run your function.");
            await submitSearch(event)
            event.preventDefault();
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, []);



    async function submitSearch(event) {
        let memorizerURL = process.env.MEMORIZER_URL|| "https://mk1.diva.so:4242/handleQuery" 
        let response = await axios.post(memorizerURL,
            {query: updatingQuery},
            {
                withCredentials: true,
                headers: { 
               "Content-Type": "application/json",
               "Access-Control-Allow-Origin": "*",
                }
            }
        );
        // let response = await axios.post(
        //   "https://mk1.diva.so:4242/handleQuery", 
        //   {'query': updatingQuery},
        //   { headers: { 
        //       "Content-Type": "application/json",
        //       "Access-Control-Allow-Origin": "*",
        //     "Authorization":  `Bearer ${'hackgt'}`
        //   }}
        //   )
        console.log('done with endpoint')
        console.log(response.data)
        // setNotionKey(response.data.notionkey)
        // window.alert("cool beans");
        // window.alert("Session Information:\n" + JSON.stringify(response.data, null, 2));
        // window.alert("Session Information:\n" + JSON.stringify(response.data, null, 2));

        let total = []
        for (let i = 0; i < response.data.res.length; i++) {
          let val = response.data.res[i]
          total.push([val['title'], val['text']])
        }
        // window.alert('output'+total[0][0])
        setOutput(total)
        setExample(total[0][0])
        console.log(total[0])
    }


    return (
        <div className="container">
          <div className="form">
            Query: 
          </div>
          <div className="form">
            <TextInput  name="query" value={updatingQuery} onChange={handleChange} />
          </div>
          <div className="form">
            <Button onClick={submitSearch} radius="md">Submit</Button>
          </div>

      {
          output && (
            output.map((outputPair) => (
              <div className="output">
                <ReactMarkdown>{outputPair[1]}</ReactMarkdown>
              </div>
              ))
            )
        }
    </div>
    );
}
