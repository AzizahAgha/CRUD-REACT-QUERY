import { QueryCache, useQuery,useQueryClient } from 'react-query'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from 'react-query'
import { usePostData } from '../hooks/usePostsData'
import { GetPostData } from '../hooks/getPostData'
import { useParams } from 'react-router-dom'


// const putPosts= async(postt)=>{
//     return axios.put(' http://localhost:4000/posts' + "/" + postt.id)
//   }

  const editPosts= async({id,title,body})=>{
    return axios.put(`http://localhost:4000/posts/${id}`,{
        title,
        body,
    })
  }

//   const getPost=(post)=>{
//     return axios.get('http://localhost:4000/posts'+ "/" + post.id)
// }
 

export const EditPost=()=>{
    const [visible,setVisible]=useState(false);
    const [submitted,setSubmitted]=useState(false);
    const [title,setTitle]=useState([]);
    const [body,setBody]=useState([]);

    const {id}=useParams()


    const queryClient=useQueryClient()

    const onSuccess=(data)=>{
        console.log('Perform side effect after data fetching',data)
        
    }

    const onError=(error)=>{
      console.log('Perform side effect after encountering error',error)
      setVisible(true)

      setTimeout(() => {
        setVisible(false)
      }, 3000);
       
    }


//const {mutate}=useMutation(editPosts)


// const SubmitHandler=(values)=>{

// const {title,body}=values

// mutate({
//     id,
//     title,
//     body
// })
//     refetch()
//     QueryCache.refetchQueries(["posts"])


// }



const updatePost=useMutation(editPosts,{
    onSuccess:()=>{
        if (title.trim().length<1 || body.trim().length<1)
        {
            setSubmitted(true);
              alert("Invalid Text");
        }
        else{
            queryClient.invalidateQueries('posts')
            alert("Data has been updated succesfully!")
           }
     

     
   }
  })

  const handleSubmit=(e)=>{
    e.preventDefault();
    if (title.trim().length<1 || body.trim().length<1)
        {
            setSubmitted(true);
              alert("Invalid Text");
        }
     
};


    // const UpdatePost= () =>{
    //     return useMutation(editPosts,{
    //        onSuccess:()=>{
    //          queryClient.invalidateQueries('posts')
    //          alert("Data has been updated succesfully!")
    //        }
    //    })
    // }

//const {mutate}=UpdatePost()

// const updatePostOnClick=()=>{
//     const post={title,body}
//         mutate(post)
// }


    // const {isLoading,isError,error,data,isFetching,refetch} = useQuery(
    //     'posts',
    //     getPost,
    //     {
            
    //         onError,
    //         // select:(data)=>{
    //         //     const postTitle=data.data.map((post)=>post.title)
    //         //     return postTitle
    //         // },
    //     }
    //     )


     const {isError,error,data,isFetching,refetch} =GetPostData(id)
   

    return(
        <div>
        <div className='box'>
        <div className='left'>
        <h6 ><strong>Title: </strong>{data.data.title}</h6>
         <h6><strong>Body:</strong> {data.data.body}</h6>
        </div>
        
            
            
            
            <form className=" create-form" onSubmit={handleSubmit}>

            <label><strong>Title:</strong></label>   
            <input type="text" name="title" className="form-control"  onChange={(e)=>setTitle(e.target.value)}/>
            {submitted && title.trim().length==0 ?<p className='error'>Please enter a title</p>:null}
                                    
            <label><strong>Body:</strong></label>             
            <input type="text" name="body" className="form-control"  onChange={(e)=>setBody(e.target.value)}/>
            {submitted && body.trim().length==0  ?<p className='error'>Please enter a body</p>:null}
            <br></br>
            <Link className="btn btn-warning mr-3"  onClick={()=>updatePost.mutate({title,body,id})}  >Update</Link>
            </form>
                  </div>             
                        
        </div>
    )
}

//-----------------------------------------------------------------------------------------


// const updateNewPost=async({title,body,id})=>{
//   try{
//       const {data}=await axios.patch(`posts/${id}`,{
//            title,
//            body,
//       })
//       return data
//   }catch(error){
//      throw Error(error.response.statusText)
//   }
// }





// const cache=useQueryClient()

// const {isLoading,data:patch,mutateAsync}=useMutation('updatePost',updateNewPost,
// {
//     onSuccess:()=>{
//         cache.invadidateQueries(["post",patch.data.id])
//     }

// })








{/* <form onSubmit={async(values)=>{
  console.log(values)
  await mutateAsync({title:values.title,body:values.body,id:patch.data.id})
}}>
<label>Title:</label>   
<input type="text" name="title"  onChange={(e)=>setTitle(e.target.value)}/>
            
              
                <label>Body:</label>
             
                 <input type="text" name="body"   onChange={(e)=>setBody(e.target.value)}/>
              
          <input type="submit" name="Update" />
</form> */}