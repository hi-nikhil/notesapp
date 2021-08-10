import React, { useEffect, useState } from 'react'
import Preloader from './components/Preloader'
import { createTodo, deleteTodo, readTodos, updateTodo } from './functions'

function App() {

    const [todo, setTodo] = useState({ title: '', content: '' })
    const [todos, setTodos] = useState(null)
    const [currentId, setCurrentId] = useState(0)


    //When any Todo is clicked
    useEffect(() => {
         let currentTodo= currentId!=0 ? todos.find(todo=> todo._id === currentId) : {title:'',content:''}
        setTodo(currentTodo)
    }, [currentId])

    //fetch the all todo
    useEffect(() => {
        const fetchData = async () => {
            const result = await readTodos()
            setTodos(result)
        }
        fetchData()
    }, [currentId])


    //clear the content
    const clear=() =>{
        setCurrentId(0)
        setTodo({title:'',content:''})
    }

    //when we click 'Esc' input field is empty again
    useEffect(() => {
        const clearField = (e) => {
          if(e.keyCode === 27){
            clear()
          }
        }
        window.addEventListener('keydown', clearField)
      return () => window.removeEventListener('keydown', clearField)
    },[])

    //when submit button is clicked
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        //if new todo is created
        if(currentId === 0){
        const result = await createTodo(todo)
        setTodos([...todos,result])
        clear()
        }else{
            //if we have to update the todo
          await updateTodo(currentId,todo)  
          clear() 
        }
        // console.log(result)
    }

    //delete the todo
    const removeTodo = async (id) =>{
        await deleteTodo(id)
        const result = await readTodos()
        setTodos(result)  
        clear()
    }

    return (
        <div className='container'>
            <div className="row">
               <h1>Notes app</h1>
                <form className="col s12" onSubmit={onSubmitHandler}>
                    <div className="row">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="icon_prefix" type="text" className="validate"
                            value={todo.title} onChange={e => setTodo({ ...todo, title: e.target.value })} />
                            <label htmlFor="icon_prefix">Title</label>
                        </div>
                        <div className="input-field col s6">
                            <i className="material-icons prefix">description</i>
                            <input id="description" type="tel" className="validate"
                            value={todo.content} onChange={e => setTodo({ ...todo, content: e.target.value })} />
                            <label htmlFor="description">content</label>
                        </div>
                    </div>
                    <div className='row right-align'>
                        <button className="waves-effect waves-light btn">
                            Submit
                        </button>
                    </div>

                    <h2>Available Notes</h2>
                </form>
                {
                    !todos ? <Preloader /> : todos.length > 0 ?
                        <ul className="collection">
                            {todos.map(todo => (
                                <li key={todo._id}
                                 onClick={() =>setCurrentId(todo._id) } 
                                 className="collection-item"><div><h5>{todo.title} </h5>
                                    <p>{todo.content}
                                        <a href="#!" 
                                         onClick={() => removeTodo(todo._id)}
                                        className="secondary-content"><i className="material-icons">delete</i></a></p> </div></li>
                            ))}
                        </ul> : <div> <h5>No notes available</h5> </div>
                }


            </div>

        </div>
    )
}

export default App
