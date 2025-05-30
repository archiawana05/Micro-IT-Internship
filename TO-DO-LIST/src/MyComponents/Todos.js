import React from 'react';
import { TodoItem } from "./TodoItem";

export const Todos = (props) => {
    let myStyle = {
        minHeight: "70vh",
        margin: "40px auto"
    }

    return (
        <div className="container" style={myStyle}>
            <h3 className="add-task-heading">
                Todos List 
                <span className="task-count">({props.todos.length})</span>
            </h3>

            {props.todos.length === 0 ? (
                <p className="empty-message">No Todos to display</p>
            ) : (
                props.todos.map((todo) => {
                    return (
                        <TodoItem 
                            todo={todo} 
                            key={todo.sno} 
                            onDelete={props.onDelete} 
                        />
                    )
                })
            )}
        </div>
    )
}

