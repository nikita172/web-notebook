import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MainView from '../../components/mainView/MainView'
import x from "../../assets/x.svg";
import { v4 as uuidv4 } from 'uuid';
import "./home.css";
const Home = () => {
  const [isOpenBook, setIsOpenBook] = useState(false);
  const [openFullTodo, setOpenFullTodo] = useState(false);
  const [todos, setTodos] = useState([]);
  const [viewData, setViewData] = useState(0);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [todo, setTodo] = useState("");
  const [editDataIndex, setEditDataIndex] = useState(0);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('beyondbrainTodo'));
    if (data) {
      setTodos(data)
    }
    console.log("getItemsRuns")
  }, []);

  // useEffect(() => {
  //   console.log(todos)
  //   localStorage.setItem("beyondbrainTodo", JSON.stringify(todos))
  //   console.log("setItemsRuns")
  // }, [todos]);



  const openNotebook = () => {
    setIsOpenBook(!isOpenBook);
  }
  const closeNotebook = () => {
    setIsOpenBook(!isOpenBook);
  }

  const fullTodoHandler = (index) => {
    setViewData(index);
    setOpenFullTodo(!openFullTodo);

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const id = uuidv4();
    const data = {
      title: e.target[0].value,
      subTitle: e.target[1].value,
      todo: e.target[2].value,
      day: 24,
      month: 3,
      year,
      id
    }
    setTodos((todo) => {
      const temp = [...todo, data];
      localStorage.setItem("beyondbrainTodo", JSON.stringify(temp));
      return temp;

    })
    closeNotebook();
  }

  const openEditForm = (index) => {
    console.log(index)
    setIsEditOpen(true);
    const data = todos.filter((item, idx) => item.id == index)
    setTodo(data[0].todo)
    setSubTitle(data[0].subTitle)
    setTitle(data[0].title)
    setEditDataIndex(index);
  }

  const closeEditForm = () => {
    setIsEditOpen(false);
  }

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const data = {
      title,
      subTitle,
      todo,
      day,
      month,
      year,
      id: editDataIndex
    }
    const item = JSON.parse(localStorage.getItem("beyondbrainTodo"));
    console.log(item)
    setTodos(() => {
      const newTodo = item.map((i) => {
        if (i.id == editDataIndex) {
          return data
        } else {
          return i;
        }
      })
      console.log(newTodo)

      localStorage.setItem("beyondbrainTodo", JSON.stringify(newTodo));
      return newTodo;
    })
    setIsEditOpen(false);
  }
  return (
    <div className='homeContainer'>
      <Sidebar />
      <MainView openNotebook={openNotebook} fullTodoHandler={fullTodoHandler} todos={todos} setTodos={setTodos} openEditForm={openEditForm} />
      {isOpenBook && <div className="addNoteContainer">
        <div className="addNoteWrapper">
          <div className="TodoHeader">
            <h2 className='addTodoTitle'>ADD TODO</h2>
            <button className='closeTodoBtn'><img src={x} className='closeTodoIcon' onClick={closeNotebook} /></button>
          </div>
          <form className="todoForm" onSubmit={handleSubmit}>
            <input className='titleInput' type="text" placeholder='Add Title' />
            <input className='titleInput' type="text" placeholder='Add Subtitle' />
            <textarea className='addTodoInput' type="text" placeholder='Add your Todo Here' />
            <button type="submit" className='addBtn'>ADD</button>
          </form>
        </div>
      </div>}

      {isEditOpen && <div className="addNoteContainer">
        <div className="addNoteWrapper">
          <div className="TodoHeader">
            <h2 className='addTodoTitle'>ADD TODO</h2>
            <button className='closeTodoBtn'><img src={x} className='closeTodoIcon' onClick={closeEditForm} /></button>
          </div>
          <form className="todoForm" onSubmit={handleEditSubmit}>
            <input onChange={(e) => setTitle(e.target.value)} value={title} className='titleInput' type="text" placeholder='Add Title' />
            <input onChange={(e) => setSubTitle(e.target.value)} value={subTitle} className='titleInput' type="text" placeholder='Add Subtitle' />
            <textarea onChange={(e) => setTodo(e.target.value)} value={todo} className='addTodoInput' type="text" placeholder='Add your Todo Here' />
            <button type="submit" className='addBtn'>Update</button>
          </form>
        </div>
      </div>}

      {openFullTodo && <div className="fullPreviewTodo">
        <div className="fullPreviewTodoWrapper">
          <div className="fullTodoHeader">
            <h3 className='fullTodoTitle'>{todos[viewData].title}</h3>

            <button className='closeTodoBtn' onClick={() => fullTodoHandler()}><img src={x} className='closeTodoIcon' /></button>
          </div>
          <h4 className='fullTodoSubtitle'>{todos[viewData].subTitle}</h4>
          <pre className='fullTodoContent'>
            {todos[viewData].todo}
          </pre>
        </div>
      </div>}
    </div>
  )
}

export default Home