import React, { useState, useRef, useEffect } from "react";

const AddTodo = ({ addTodo, changeTab, filterType }) => {
    const [input, setInput] = useState('');
    const inputRef = useRef(null);

    const filters = [{ type: 'all', name: 'All' }, { type: 'active', name: 'Active' }, { type: 'completed', name: 'Completed' }];
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        addTodo({
            id: Date.now(),
            title: input,
            done: false,
            show: true
        });
        setInput('');
    }

    return (
        <>
            <div className="filters">
                {filters.map((item, index) => (
                    <div key={index} onClick={() => filterType !== item.type && changeTab(item.type)} className={filterType === item.type ? 'activeFilter filterButton' : 'filterButton'}>{item.name}</div>
                ))}
            </div>
            {filterType !== 'completed' && <div className="addTodo">
                <form className="todoForm" onSubmit={submitHandler}>
                    <input className="textInput" value={input} placeholder='add details' onChange={(e) => setInput(e.target.value)} ref={inputRef} />
                    <input className="submitBtn" type='submit' value='Add' />
                </form>
            </div>
            }
        </>
    )
}

export default AddTodo;