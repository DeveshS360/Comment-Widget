import React from 'react'
import { Button, List, ListItem, TextField } from "@mui/material";
import { useState } from "react";

export const  App = () => {
  
  const [comments,setComments] = useState({})
  const [comment, setComment] = useState('')
  // for unique key in object
  const [val, setVal] = useState(0)
  
  // adding a comment on topmost level
  const handleClick = (list) => {
    const key = val
    list[key] = {
      text: comment,
      comment: '',
      showReply: false,
    }
    setVal(prev => prev+1)
    setComments({...comments})
    setComment('')
  }

  // changing top most comment value
  const handleChange = (e) => {
    setComment(e.target.value)
  }

  // deleting any comment with its key name
  const handleDelete = (obj,key) => {
    delete obj[key]
    setComments({...comments})
  }

  // adding a reply to a comment
  const handleReply = (entity) => {
    const key = val
    entity[key] = {
      text: entity.comment,
      comment: '',
      showReply: false,
    }
    setVal(prev => prev+1)
    entity.comment = ''
    entity.showReply = false
    setComments({...comments})
  }

  // changing reply value for that comment
  const handleReplyChange = (entity,e) => {
    entity.comment = e.target.value
    
    setComments({...comments})
  }

  const handleShowReply = (list, item) => {
    list[item].showReply = true;
    setComments({...comments});
  }

  // rendering comments recursively
  const renderList = (list)  => {
      if((!list) || (typeof list !== 'object') || (!Object.keys(list).length)) return null
      const myCommentList =  Object.keys(list).map(item => {
        if(typeof list[item]!== 'object') return null
        return <React.Fragment key={item}>
          <List>
            <ListItem>{list[item].text}
              <span>
                &nbsp;<Button size='small' variant='outlined' color='error' onClick={() => handleDelete(list,item)}>Delete</Button>
                &nbsp;<Button size='small' variant='outlined' onClick={() => handleShowReply(list,item)}>Reply</Button>
              </span>
            </ListItem>
           {
             list[item].showReply && (
              <div style={{marginLeft:'10px'}}>
              &nbsp;<input type='text' placeholder='Enter your reply' value={list[item].comment} onChange={(e)=>handleReplyChange(list[item],e)} />
              { list[item].comment && 
              <span>
                 &nbsp;<button onClick={() => handleReply(list[item])}>Reply</button>
              </span>
               
              }
          </div>
             )
           }
            <div style={{marginLeft:'30px'}}>
              {
                renderList(list[item])
              }
            </div>          
          </List>
          
       </React.Fragment>
      })
    
      return myCommentList
    }


  return (
   <div style={{marginLeft: '30%'}}>
    <h1>Comment Widget</h1>
    <div>
      <TextField placeholder='Enter a comment' style={{width:'500px'}} value={comment} onChange={handleChange}/>&nbsp;&nbsp;
      <Button variant='contained' onClick={(e) => handleClick(comments)}>Add comment</Button>
    </div>
    <div>
      {
        comments && Object.keys(comments).length ? 
          renderList(comments)
        : null
      }
    </div>
   </div>
  )

}
