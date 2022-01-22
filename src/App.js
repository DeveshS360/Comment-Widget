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
      comment: ''
    }
    setVal(prev => prev+1)
    setComments({...comments})
    setComment('')
  }

  // chanding top most comment value
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
      comment: ''
    }
    setVal(prev => prev+1)
    entity.comment = ''
    setComments({...comments})
  }

  // changing reply value for that comment
  const handleReplyChange = (entity,e) => {
    entity.comment = e.target.value
    setComments({...comments})
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
                &nbsp;<Button size='small' variant='outlined' onClick={() => handleDelete(list,item)}>Delete</Button>
              </span>
              <span>
                &nbsp;<input type='text' placeholder='comment - Your Name' value={list[item].comment} onChange={(e)=>handleReplyChange(list[item],e)} />
                &nbsp;<button onClick={() => handleReply(list[item])}>Reply</button>
              </span>
            </ListItem>
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
   <>
    <h1>Comment Widget</h1>
    <div>
      <TextField placeholder='Enter a comment - Your Name' style={{width:'500px'}} value={comment} onChange={handleChange}/>&nbsp;&nbsp;
      <Button variant='contained' onClick={(e) => handleClick(comments)}>Add comment</Button>
    </div>
    <div>
      {
        comments && Object.keys(comments).length ? 
          renderList(comments)
        : null
      }
    </div>
   </>
  )

}
