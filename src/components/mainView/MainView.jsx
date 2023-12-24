import React, { useState } from 'react'
import "./mainView.css"
import search from "../../assets/search.svg"
import NoteCard from '../noteCard/NoteCard'
import up from "../../assets/chevron-up.svg";
import down from "../../assets/chevron-down.svg";

const MainView = ({ openNotebook, fullTodoHandler, todos, setTodos, openEditForm }) => {
  const [openMonths, setOpenMonths] = useState(false);

  const openMonthsHandler = () => {
    setOpenMonths(!openMonths);
  }

  const filterByToday = () => {
    const date = new Date();
    const TodayDate = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    setTodos((todo) => {
      const data = todo.filter((i) => i.day == TodayDate && i.year == year && i.month == month);
      return data;
    })
  }

  const allClickHandler = () => {
    const data = JSON.parse(localStorage.getItem("beyondbrainTodo"));
    setTodos(data)
  }
  const filterByThisMonth = () => {
    const date = new Date();
    const TodayDate = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    setTodos(() => {
      const data = JSON.parse(localStorage.getItem("beyondbrainTodo"));
      const item = data.filter((i) => i.year == year && i.month == month);
      return item;
    })

  }

  const monthFilter = (month) => {
    openMonthsHandler();
    setTodos(() => {
      const data = JSON.parse(localStorage.getItem("beyondbrainTodo"));
      const item = data.filter((i) => i.month == month);
      return item;
    })
  }
  return (
    <div className='mainViewContainer'>
      <div className="mainViewWrapper">
        <div className="searchContainer">
          <img className='searchIcon' src={search} />
          <input className='searchInput' placeholder='Search...' />
        </div>
        <div className="filterAndAddNote">
          <div className="filterNote">
            <span className='filNote' onClick={allClickHandler}>All</span>
            <span className='filNote' onClick={filterByToday}>Today</span>
            <span className='filNote' onClick={filterByThisMonth}>This month</span>
            <div className='otherFilter'>
              <span className='otherTitle'>Other
                <img onClick={openMonthsHandler} src={openMonths ? up : down} className='downIcon' /></span>
              {openMonths && <div className="allMonths">
                <span onClick={() => monthFilter(1)}>January</span>
                <span onClick={() => monthFilter(2)}>February</span>
                <span onClick={() => monthFilter(3)}>March</span>
                <span onClick={() => monthFilter(4)}>April</span>
                <span onClick={() => monthFilter(5)}>May</span>
                <span onClick={() => monthFilter(6)}>June</span>
                <span onClick={() => monthFilter(7)}>July</span>
                <span onClick={() => monthFilter(8)}>August</span>
                <span onClick={() => monthFilter(9)}>September</span>
                <span onClick={() => monthFilter(10)}>October</span>
                <span onClick={() => monthFilter(11)}>November</span>
                <span onClick={() => monthFilter(12)}>December</span>
              </div >}
            </div >
          </div >
          <div>
            <span className='addNote' onClick={openNotebook}>+ Add note</span>
          </div>
        </div >
        <div className="noteCards">
          {
            todos.length > 0 ? todos.map((todo, index) => (
              <NoteCard key={index} fullTodoHandler={fullTodoHandler} todo={todo} setTodos={setTodos} index={index} openEditForm={openEditForm} todos={todos} />
            ))
              :
              <div className='nothingTitle'>
                <h3>
                  Nothing here!
                </h3></div>
          }
        </div>
      </div >
    </div >
  )
}

export default MainView