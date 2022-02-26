import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";
import { getApiDomain } from "../App";
import React, { useState, useEffect } from 'react';
import { Button, TextInput } from '@mantine/core';
import '../App.css'
 
Session.addAxiosInterceptors(axios);

export default function CallAPIView() {

    const [updatingQuery, setUpdatingQuery] = useState("")
    const [output, setOutput] = useState([
      ['testing', 'mctesty test does this work? mctesty test does this work? mctesty test does this work? mctesty test does this work? mctesty test does this work? mctesty test does this work? mctesty test does this work? mctesty test does this work? mctesty test does this work?'], ['testing', 'mctesty test does this work?'], ['testing', 'mctesty test does this work?'], ['testing', 'mctesty test does this work?'], ['testing', 'mctesty test does this work?'], ['testing', 'mctesty test does this work?'], ['testing', 'mctesty test does this work?'],
      ['Testi this one hered', 'Growing up, \nI always classified myself as an introvert. I found talking to new people awkward to do even though I did want to.  For university, I was going to a completely new college with high school friends. But was still excited to meet new people and applied to the Honors Program. I got on to the waitlist, but I missed the first week where the kids already made friend groups. I ended up meeting some people and joined a friend group but I never really ever connected with them and my \n introvertedness made it hard for me to anyone else. I basically was in the position I was afraid I would be growing up. I was isolated and felt really down. I felt that I leaving my high school friends was a big mistake. Looking ahead, it seemed like I would never be like this for the rest of my college life. Moreover, I was worried that I won’t ever change and I would be a loner after my college life as well!  Over winter break, I thought to myself: "Is this how I want to spend rest of my year". I could either try to find new people or suck it up and just be better friends with my original friend group learning about their interests but being unhappy at the end .  Coming into the semester, I went to the classroom where everyone did homework with their friends. I decided to stay here and try to meet new people. However, I was still afraid. There were so many people with friend groups already established. My anxiety was at an all time high in those weeks.  One day, I found someone in the same class as me to do homework with. On that same night my other friend group invited me to watch a play. Going to my old friend group would be easy and simple to do. However, this is where I changed my mind. I faced my anxiety straight on realizing I like these people more. Now, with them, I enjoyed my college life happily!']
    ])
    const [example, setExample] = useState("example")
    // const [updatingDatabase, setUpdatingDatabase] = useState("")
    // const [updatingCollection, setUpdatingCollection] = useState("")
    


    // useEffect(() => {
    //     console.log(updatingQuery, output)
    //     const getNotionKey = async () => {
    //       console.log(updatingQuery)
    //       console.log('reached useeffect')
    //       if (updatingQuery) {
    //         console.log('true')
    //         let response = await axios.post(getApiDomain()+"/handleQuery", {
    //           query: updatingQuery
    //         });
    //         let total = []
    //         for (let i = 0; i < response.data.res.length; i++) {
    //           let val = response.data.res[i]
    //           total.push([val['title'], val['text']])
    //         }
    //         // window.alert("Session Information2:\n" + JSON.stringify(response.data, null, 2));
    //         // window.alert('output'+total[0][0])
    //         setOutput(total)
    //       }
    //         // console.log(response2)
    //         // if (response2.data.fail===false) {
    //         //     setNotionKey(response2.data.notionkey)
    //         // }
    //     }
    //     getNotionKey();
    // }, []);

    function handleChange(event) {
        // setState({value: event.target.value});
        setUpdatingQuery(event.target.value)    
      }

    // async function callAPIClicked() {
    //     // this will also automatically refresh the session if needed
    //     let response = await axios.post(getApiDomain() + "/sessioninfo");
    //     window.alert("Session Information:\n" + JSON.stringify(response.data, null, 2));
    //     window.alert('hello')
    // }



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
                <h2 >{outputPair[0]}</h2>
                <p >{outputPair[1]}</p>
              </div>
              ))
            )
        }
    </div>
    );
}
