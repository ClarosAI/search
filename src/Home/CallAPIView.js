import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";
import { getApiDomain } from "../App";
import React, { useState, useEffect } from 'react';
import { Button, TextInput } from '@mantine/core';
import '../App.css'
 
Session.addAxiosInterceptors(axios);

export default function CallAPIView() {

    // const [notionKey, setNotionKey] = useState("")
    const [updatingQuery, setUpdatingQuery] = useState("")
    const [output, setOutput] = useState([])
    // const [updatingDatabase, setUpdatingDatabase] = useState("")
    // const [updatingCollection, setUpdatingCollection] = useState("")
    


    // useEffect(() => {
    //     const getNotionKey = async () => {
    //         let response2 = await axios.get(getApiDomain() + "/retrieveinfo");
    //         console.log(response2)
    //         if (response2.data.fail===false) {
    //             setNotionKey(response2.data.notionkey)
    //         }
    //     }
    //     getNotionKey();
    // }, []);

    function handleChange(event) {
        // setState({value: event.target.value});
        setUpdatingQuery(event.target.value)
        // console.log(event.target)
        // if (event.target.name=='notionkey') {
        //     setUpdatingNotionKey(event.target.value)
        // } else if (event.target.name=='database') {
        //     setUpdatingDatabase(event.target.value)
        // } else {
        //     setUpdatingCollection(event.target.value)
        // }        
      }

    // async function callAPIClicked() {
    //     // this will also automatically refresh the session if needed
    //     let response = await axios.post(getApiDomain() + "/sessioninfo");
    //     window.alert("Session Information:\n" + JSON.stringify(response.data, null, 2));
    //     window.alert('hello')
    // }



    async function submitSearch(event) {
        console.log('submitting!')
        // this will also automatically refresh the session if needed
        // let apiDomain = process.env.REACT_APP_API_URL|| "https://mk1.diva.so:4242/handleQuery" 
        // let response = await axios.post(getApiDomain()+"/handleQuery", {
        //     query: updatingQuery,
        //   }
        // );
        console.log(updatingQuery)

        axios.post(
          "https://mk1.diva.so:4242/handleQuery", 
          {'query': updatingQuery},
          { headers: { 
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            "Authorization":  `Bearer ${'hackgt'}`

          }}
          ).then((response) => {
            console.log('worked dude')
            for (var i = 0; i < response.data.res.length; i++) {
              val = response.data.res[i]
              total.append([val['title'], val['text']])
            }
            setOutput(total)
            
          })
          .catch((error => {console.log(error);}))


        // let response = await axios.post(
        //   "https://mk1.diva.so:4242/handleQuery", 
        //   {'query': updatingQuery},
        //   { headers: { 
        //       "Content-Type": "application/json",
        //       "Access-Control-Allow-Origin": "*",
        //     "Authorization":  `Bearer ${'hackgt'}`
        //   }}
        //   )
        // console.log('done with endpoint')
        // // setNotionKey(response.data.notionkey)
        // window.alert("cool beans");
        // total = []
        // for (var i = 0; i < response.data.res.length; i++) {
        //   val = response.data.res[i]
        //   total.append([val['title'], val['text']])
        // }
        // setOutput(total)
        // window.alert('notion key set')
    }


    return (
        <div>
        {/* <div onClick={updateNotionKey} className="sessionButton">
            Add your Notion Key
        </div> */}
         {/* <div onClick={callAPIClicked} className="sessionButton">
            Call API
        </div> */}
        {/* <div >
           Notion key: {notionKey}
        </div> */}
        <form  onSubmit={submitSearch}>
        <label >
         Query:
         <TextInput  name="query" value={updatingQuery} onChange={handleChange} />
          {/* <input type="text" name="notionkey" value={updatingNotionKey} onChange={handleChange} /> */}
        </label>

        {/* <label>
        Insert Your Database Name:
        <TextInput  name="database" value={updatingDatabase} onChange={handleChange} />
        </label>

        <label>
        Insert Your Collection Name:
        <TextInput  name="collection" value={updatingCollection} onChange={handleChange} />
        </label> */}

        <Button type="submit" radius="md">Submit</Button>

        {
          output && (
            output.map((outputPair) => (
              <>
                <h3 >outputPair[0]</h3>
                <h3 >outputPair[1]</h3>
              </>
              ))
            )
        }
      </form>
    </div>
    );
}
