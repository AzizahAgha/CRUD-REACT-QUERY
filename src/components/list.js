
import { useMutation, useQuery ,useQueryClient} from 'react-query'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const addPosts= async(post)=>{
    return await axios.post(' http://localhost:4000/posts',post)
  }

const UseAddPost= () =>{
    const queryClient=useQueryClient()
    return useMutation(addPosts,{
        onSuccess:()=>{
           queryClient.invalidateQueries('posts')
        }
    })
}

const fetchPosts=()=>{
    return axios.get(' http://localhost:4000/posts')
}

const successMessage={
    color: "#270",
  backgroundColor:" #DFF2BF",
   margin: "10px 0",
   padding: "10px",
   borderRadius: "3px 3px 3px 3px",
  }

export default function List(){
    const [visible,setVisible]=useState(false);
    const [title,setTitle]=useState('');
    const [body,setBody]=useState('');

   

    const {mutate}=UseAddPost()


    const addPostOnClick=()=>{
        console.log({title,body})
        const post={title,body}
        mutate(post)
        onSuccess()
        setTimeout(() => {
            setVisible(false)
          }, 3000);
    }
   


    const onSuccess=(data)=>{
        console.log('Perform side effect after data fetching',data)
        setVisible(true)
    }

    const onError=(error)=>{
        console.log('Perform side effect after encountering error',error)
    }


    const {isLoading,isError,error,data,isFetching,refetch} = useQuery(
        'posts',
        fetchPosts,
        {
            
            onError,
            // select:(data)=>{
            //     const postTitle=data.data.map((post)=>post.title)
            //     return postTitle
            // },
        }
        )

      
    
  
        if (isLoading) {
            return <h2>Loading...</h2>
          }
        
          if(isError){
              return <h2>{error.message}</h2>
              setVisible(true)
          }

         
   
  
    return(
        <div class="wrap">
        <h1>Add Posts</h1>
        {/* <h5> There are {data.length} post in the Database </h5> */}

        <br></br>

        {visible ?<div style={successMessage}>Data has been added Successfully!</div>:null}
        <hr></hr>

        <div >
            <input type='text' placeholder='Enter the title' value={title} onChange={(e)=>setTitle(e.target.value)} ></input>
            <input type='text' placeholder='Enter the body' value={body} onChange={(e)=>setBody(e.target.value)} ></input>
            <button class="btn btn-success" onClick={addPostOnClick}>Add</button>
        </div>
        <br></br>
        <table class="table table-bordered table-striped" >
                <thead>
                    <tr>
                    <th>id</th>
                    <th>Title</th>
                    <th>Body</th>
                  
                    
                    </tr>
                </thead>
                 <tbody>
                 {data?.data.map((post,key)=>{
                    return(
                        <tr key={key}>
                          <td>{post.id}</td>
                          <td>{post.title}</td>
                          <td>{post.body}</td>

                        
                          </tr>
                    );
                 }
                       
                    
                    )}      
                 </tbody>
                      
                  
                                  
            </table>
        </div>
    )
}


