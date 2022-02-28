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

    const handleKeyDown = async (event) => {
      if (event.key === 'Enter') {
        console.log('enter pressed')
        await submitSearch(event)
      }
    }



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

        let total = []
        for (let i = 0; i < response.data.res.length; i++) {
          let val = response.data.res[i]
          total.push([val['title'], val['text']])
        }
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
            <TextInput  name="query" value={updatingQuery} onChange={handleChange}  onKeyDown={handleKeyDown} />
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
