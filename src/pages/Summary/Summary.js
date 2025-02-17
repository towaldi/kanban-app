import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
// Icons
import { Check, ChevronUp, Edit2, LoaderCircle, MessageCircle, StickyNote } from 'lucide-react';
// Style
import '../../App.css';
import './Summary.css';

export default function Summary() {
    // State variables for each card
    const [toDoCount, setToDoCount] = useState(0);
    const [inProgressCount, setInProgressCount] = useState(0);
    const [awaitFeedbackCount, setAwaitFeedbackCount] = useState(0);
    const [doneCount, setDoneCount] = useState(0);
    const [urgentCount, setUrgentCount] = useState(0);
    const [totalTasks, setTotalTasks] = useState(0);
    
    // Fetch data from Firestore
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksSnapshot = await getDocs(collection(db, 'tasks'));
                const tasks = tasksSnapshot.docs.map(doc => doc.data());
                // Calculate counts
                const toDo = tasks.filter(task => task.status === 'To Do').length;
                const inProgress = tasks.filter(task => task.status === 'In Progress').length;
                const awaitFeedback = tasks.filter(task => task.status === 'Await Feedback').length;
                const done = tasks.filter(task => task.status === 'Done').length;
                const urgent = tasks.filter(task => {
                    const today = new Date().toISOString().split('T')[0];
                }).length;
                const total = tasks.length;

                // Update state
                setToDoCount(toDo);
                setInProgressCount(inProgress);
                setAwaitFeedbackCount(awaitFeedback);
                setDoneCount(done);
                setUrgentCount(urgent);
                setTotalTasks(total);
                
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div className='workspace'>
            <div className='workspace-header'>
                <h1>Summary</h1>
            </div>
            <div className='grid'>
                <div className='card c-1'>
                    <div className='card-header'>
                        <Edit2
                            className='feature-icon'
                            size={56}
                        />
                        <h1>{toDoCount}</h1>
                    </div>
                    <h2>To Do's</h2>
                    <p>Tasks that are yet to be started.</p>
                </div>

                <div className='card c-2'>
                    <div className='card-header'>
                        <Check
                            className='feature-icon'
                            size={56}
                        />
                        <h1>{doneCount}</h1>
                    </div>
                    <h2>Done</h2>
                    <p>Tasks that are completed.</p>
                </div>

                <div className='card c-3'>
                    <div className='card-header'>
                        <ChevronUp
                            className='feature-icon'
                            size={56}
                        />
                        <h1>{urgentCount}</h1>
                    </div>
                    <h2>Urgent</h2>
                    <p>Tasks due today.</p>
                </div>

                <div className='card c-4'>
                    <div className='card-header'>
                        <StickyNote
                            className='feature-icon'
                            size={56}
                        />
                        <h1>{totalTasks}</h1>
                    </div>
                    <h2>Tasks on Board</h2>
                    <p>Total number of tasks.</p>
                </div>

                <div className='card c-5'>
                    <div className='card-header'>
                        <LoaderCircle
                            className='feature-icon'
                            size={56}
                        />
                        <h1>{inProgressCount}</h1>
                    </div>
                    <h2>Tasks in Progress</h2>
                    <p>Tasks that are currently being worked on.</p>
                </div>

                <div className='card c-6'>
                    <div className='card-header'>
                        <MessageCircle
                            className='feature-icon'
                            size={56}
                        />
                        <h1>{awaitFeedbackCount}</h1>
                    </div>
                    <h2>Awaiting Feedback</h2>
                    <p>Tasks waiting for feedback.</p>
                </div>
            </div>
        </div>
    )
}
