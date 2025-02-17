"use client";
import React, { useState, useEffect } from 'react';
import LoadingPage from '@/app/loading'; 
import { FaRegUserCircle, FaFileSignature } from "react-icons/fa";
import { PiOfficeChairFill } from "react-icons/pi";
import { MdAttachEmail } from "react-icons/md";
import { LiaUserCheckSolid } from "react-icons/lia";
import { FaUserPen } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

async function fetchUsers() {
    const response = await fetch('https://602e7c2c4410730017c50b9d.mockapi.io/users');
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const users = await response.json();
    return users;
}

const Users = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsername, setSelectedUsername] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await fetchUsers();
                if (!Array.isArray(users)) {
                    throw new Error('Data format is incorrect');
                }
                setUsers(users);
                toast.warning('Please click on User to view details!');
            } catch (error) {
                setHasError(true);
                toast.error('Fetching users failed.');
                console.error('Fetching users failed:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const toggleUserDetails = (username) => {   //toggle function is written usually with id as id is unique, but in this dataset same ids have duplicate records and hence I wrote the function using username
        setSelectedUsername((prevSelectedUsername) => (prevSelectedUsername === username ? null : username));
    };

    const handleImageError = (event) => {
        event.target.src = 'https://www.svgrepo.com/show/408429/user-person-profile-block-account-circle.svg'; 
    };

    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <div className="bg-white text-black">
            <ToastContainer />
            <h1 className="p-5 font-bold">Users</h1>
            <hr />
            <hr />
            {hasError || users.length === 0 ? (
                <div className="text-center p-5">
                    <h2><MdError className='text-3xl text-red-700 justify-center items-center' /> No data to show</h2>
                </div>
            ) : (
                users.map((user) => (
                    <div key={user.id} className="mb-4">
                        <div 
                            className="flex items-center cursor-pointer ps-7" 
                            onClick={() => toggleUserDetails(user.profile.username)}
                        >
                            <img 
                                src={user.avatar} 
                                alt="" 
                                className="rounded-full w-10 h-10 mr-4 mb-2" 
                                onError={handleImageError}
                            />
                            <div>
                                <h1 className="font-bold flex text-sm lg:text-md mb-2">
                                    {user.profile.firstName} {user.profile.lastName}
                                </h1>
                            </div>
                        </div>
                        <hr />
                        <hr />
                        {selectedUsername === user.profile.username && (
                            <div className="block lg:flex mt-2">
                                <div className='text-center'>
                                    <img
                                        src={user.avatar}
                                        alt="No data to show"
                                        className="rounded-full w-20 h-20 ms-7 me-7 mt-7 mb-7 justify-center items-center"
                                        onError={handleImageError}
                                    />
                                </div>
                                <div className=" ps-5 text-sm">
                                    <h2 className="font-bold flex"><FaRegUserCircle className='mr-2 mt-1'/>Username: {user.profile.username}</h2>
                                    <h2 className="text-slate-600 flex"><PiOfficeChairFill className='mr-2 mt-1'/>{user.jobTitle}</h2>
                                    <p className='flex'><FaUserPen className='mr-2 mt-1'/>Bio: {user.Bio}</p>
                                    <p className='flex'><FaFileSignature className='mr-2 mt-1'/>Name: {user.profile.firstName} {user.profile.lastName}</p>
                                    <p className='flex'><LiaUserCheckSolid className='mr-2 mt-1'/>User ID: {user.id}</p>
                                    <p className='flex'><MdAttachEmail className='mr-2 mt-1'/>Email: {user.profile.email}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default Users;

