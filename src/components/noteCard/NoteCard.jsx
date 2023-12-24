import React, { useState } from 'react'
import "./noteCard.css"
import vertical from "../../assets/more-vertical.svg";
import x from "../../assets/x.svg";
const NoteCard = ({ fullTodoHandler, todo, setTodos, index, openEditForm, todos }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const closeMenuHandler = () => {
    setOpenMenu(!openMenu);
  }
  const openMenuHandler = () => {
    setOpenMenu(!openMenu);
  }
  const month = todo.month == 1 ? "Jan" :
    todo.month == 2 ? "Feb" :
      todo.month == 3 ? "Mar" :
        todo.month == 4 ? "Apr" :
          todo.month == 5 ? "May" :
            todo.month == 6 ? "June" :
              todo.month == 7 ? "July" :
                todo.month == 8 ? "Aug" :
                  todo.month == 9 ? "Sept" :
                    todo.month == 10 ? "Oct" :
                      todo.month == 11 ? "Nov" :
                        todo.month == 12 ? "Dec" : ""

  const deleteHandler = (index) => {
    setTodos(() => {
      const data = JSON.parse(localStorage.getItem("beyondbrainTodo"));
      const item = data.filter((e) => e.id != index);
      localStorage.setItem("beyondbrainTodo", JSON.stringify(item));
      return item;

    }
    );
    setOpenMenu(!openMenu);
  }

  return (
    <div className='cardContainer'>
      <div className="cardHeader">
        <div className='headerDiv'>
          <h3>{todo.title}</h3>
        </div>
        <img className='openEditListIcon' src={vertical} onClick={openMenuHandler} />
      </div>
      <span className='createdDate'>{todo.day} {month} {todo.year}</span>
      <span className="subTitle">
        <div className='yellowDot'></div>{todo.subTitle}</span>
      <pre className="todos">
        {todo.todo}
      </pre>

      {openMenu && <div className="editOptions">
        <button className='editOptionCloseBtn' onClick={closeMenuHandler}><img className='editOptionCloseIcon' src={x} /></button>
        <span onClick={() => openEditForm(todo.id)}>edit</span>
        <span onClick={() => deleteHandler(todo.id)}>delete</span>
        <span onClick={() => fullTodoHandler(index)}>See full</span>
      </div>}
    </div>
  )
}

export default NoteCard