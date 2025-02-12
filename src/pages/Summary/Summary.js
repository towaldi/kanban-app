import React from 'react';
// Components

// Icons
import { Check, ChevronUp, Edit2, Loader, LoaderCircle, MessageCircle, StickyNote } from 'lucide-react';

// Style
import '../../App.css';
import './Summary.css';

export default function Summary() {

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
                        <h1>1</h1>
                    </div>
                    <h2>To Do's</h2>
                    <p>Placeholder Text</p>
                </div>

                <div className='card c-2'>
                    <div className='card-header'>
                        <Check
                            className='feature-icon'
                            size={56}
                        />
                        <h1>1</h1>
                    </div>
                    <h2>Done</h2>
                    <p>Placeholder Text</p>
                </div>

                <div className='card c-3'>
                    <div className='card-header'>
                        <ChevronUp
                            className='feature-icon'
                            size={56}
                        />
                        <h1>1</h1>
                    </div>
                    <h2>Urgent</h2>
                    <p>Placeholder Text</p>
                </div>

                <div className='card c-4'>
                    <div className='card-header'>
                        <StickyNote
                            className='feature-icon'
                            size={56}
                        />
                        <h1>1</h1>
                    </div>
                    <h2>Tasks on Board</h2>
                    <p>Placeholder Text</p>
                </div>

                <div className='card c-5'>
                    <div className='card-header'>
                        <LoaderCircle
                            className='feature-icon'
                            size={56}
                        />
                        <h1>1</h1>
                    </div>
                    <h2>Tasks in Progress</h2>
                    <p>Placeholder Text</p>
                </div>

                <div className='card c-6'>
                    <div className='card-header'>
                        <MessageCircle
                            className='feature-icon'
                            size={56}
                        />
                        <h1>1</h1>
                    </div>
                    <h2>Awaiting Feedback</h2>
                    <p>Placeholder Text</p>
                </div>
            </div>
        </div>
    )
}
