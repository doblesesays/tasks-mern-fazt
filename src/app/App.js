import React, { useEffect } from 'react';

function App() {

    // State hooks
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [tasks, setTasks] = React.useState([]);
    const [id, setId] = React.useState('');

    function addTask(e) {
        if (!id) {
            console.log(title)
            console.log(description)

            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify({ title, description }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(({ status }) => {
                    console.log(status)
                    M.toast({ html: status });
                    setTitle('');
                    setDescription('');
                    getTasks();
                })
                .catch(err => console.log(err));
        } else {
            fetch('/api/tasks/' + id, {
                method: 'PUT',
                body: JSON.stringify({title, description}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(({status}) => {
                    console.log(status)
                    M.toast({ html: status });
                    setTitle('');
                    setDescription('');
                    setId('');
                    getTasks();
                })
        }

        e.preventDefault();
    }

    function getTasks() {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setTasks(data)
            })
            .catch(err => console.log(err));
    }

    function deleteTask(id) {
        if (confirm('Are you sure?')) {
            fetch('/api/tasks/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(({ status }) => {
                    console.log(status)
                    M.toast({ html: status });
                    getTasks();
                })
                .catch(err => console.log(err));
        }
    }

    function editTask(task) {
        setTitle(task.title);
        setDescription(task.description);
        setId(task._id);
    }

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div>
            { /* Navegacion */}
            <nav className="light-blue darken-4">
                <div className="container">
                    <a href="/" className="brand-logo">MEARN STACK</a>
                </div>
            </nav>

            <div className="container">
                <div className="row">
                    <div className="col s5">
                        <div className="card">
                            <div className="card-content">
                                <form onSubmit={addTask}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input value={title} onChange={e => setTitle(e.target.value)} name="title" type="text" placeholder="Task title" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <textarea value={description} onChange={e => setDescription(e.target.value)} className="materialize-textarea" name="description" id="" cols="30" rows="10" placeholder="Task description..."></textarea>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn light-blue darken-4">
                                        Send
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col s7">
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tasks.map(task => {
                                        return (
                                            <tr key={task._id}>
                                                <td>{task.title}</td>
                                                <td>{task.description}</td>
                                                <td>
                                                    <button onClick={e => deleteTask(task._id)} className="btn light-blue darken-4">
                                                        <i className="material-icons">delete</i>
                                                    </button>
                                                    <button onClick={e => editTask(task)} style={{ margin: "4px" }} className="btn light-blue darken-4">
                                                        <i className="material-icons">edit</i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;