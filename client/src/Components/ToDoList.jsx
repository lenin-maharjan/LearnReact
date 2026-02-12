export const ToDoList = () => {
    const [task, setTask] = useState("");
    const [list, setList] = useState([]);

    function addToList(e) {
        e.preventDefault();
        if (task.trim() === "") return;
        setList([...list, task]);
        setTask("");
    }

    function deleteTask(index) {
        const newList = list.filter((_, i) => i !== index);
        setList(newList);
    }

    return (
        <div className='p-12 mx-5 my-12'>
            <h1 className="text-3xl font-bold text-center mt-24">To Do List</h1>
            <div className='flex justify-center mx-12 my-18 gap-8 mt-10'>
                <form onSubmit={addToList} className='flex gap-4'> 
                    <input 
                        type="text" 
                        placeholder='Enter Your Task' 
                        className='border w-2xl border-red-400 px-4 py-2 outline-none' 
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <button type='submit' className='bg-amber-300 px-4 py-2 font-bold'>Add</button>
                </form>
            </div>

            <div className='max-w-2xl mx-auto mt-12'>
                <ul className='flex flex-col gap-4'>
                    {list.map((item, index) => (
                        <li key={index} className='flex justify-between items-center p-4 bg-gray-50 border-l-4 border-amber-300 shadow-sm'>
                            <span className='text-lg'>{item}</span>
                            <button 
                                onClick={() => deleteTask(index)}
                                className='text-red-500 hover:text-red-700 font-semibold'
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
                {list.length === 0 && (
                    <p className='text-center text-gray-400 mt-10'>Your list is empty.</p>
                )}
            </div>
        </div>
    )
}