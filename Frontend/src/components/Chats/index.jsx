import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import ShowContact from "../ShowContact/index.jsx";
import Lens from "../Lens/index.jsx";
import Lock from "../Lock/index.jsx";
import Head from "../Head/index.jsx";
// import { io } from "socket.io-client";
import socket from './connection.jsx';

export default function Chats({ onChatClick }) {
    const back = (
        <svg viewBox="0 0 24 24" height="24" width="24">
            <title>back</title>
            <path
                fill="currentColor"
                d="M10 6l-6 6 6 6 1.41-1.41L6.83 12l4.58-4.59z"
            ></path>
        </svg>
    );

    const [users, setUsers] = useState([]);
    const [me, setMe] = useState([]);
    const [chatData, setChatData] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [displayedChats, setDisplayedChats] = useState([]);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    "http://localhost:9000/whatsapp/users",
                    {
                        credentials: "include"
                    }
                );
                const { users, me } = await response.json();

                setUsers(users);
                setMe(me);
                socket.emit('connected', me[0]._id);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers()
    }, []);




    function filterChats(searchQuery) {
        return chatData.filter((chat) =>
            chat.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    const handleSearchChange = (e) => {
        const newSearchValue = e.target.value;
        setSearchValue(newSearchValue);

        const filteredChats = filterChats(newSearchValue);
        setDisplayedChats(filteredChats);
    };

    return (
        <div className={styles.container}>
            <Head text="Chats" iconType="Archieved" />

            <div className={`${styles.head} ${styles.searchBar}`}>
                <div className={styles.lens}>{isFocused ? back : <Lens />}</div>
                <div>
                    <input
                        type="text"
                        placeholder={isFocused ? "" : "Search"}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 100)}
                        onChange={handleSearchChange}
                        value={searchValue}
                    />
                </div>
            </div>
            <div className={styles.filter}>
                <button
                    className={styles.btn}
                    onClick={() => setDisplayedChats(chatData)}
                >
                    All
                </button>
                <button
                    className={styles.btn}
                    onClick={() =>
                        setDisplayedChats(
                            chatData.filter((chat) => chat.unread !== 0)
                        )
                    }
                >
                    Unread
                </button>
                <button
                    className={styles.btn}
                    onClick={() =>
                        setDisplayedChats(
                            chatData.filter((chat) => chat.favourite)
                        )
                    }
                >
                    Favourites
                </button>
                <button
                    className={styles.btn}
                    onClick={() =>
                        setDisplayedChats(chatData.filter((chat) => chat.group))
                    }
                >
                    Groups
                </button>
            </div>

            <div className={styles.contactList}>
                {users ? (
                    users.map((chat) => {
                        return (
                            <div
                                key={chat._id}
                                onClick={() => onChatClick(chat, me)}
                                className={styles.chatItem}
                            >
                                <ShowContact chatData={chat} userId={me[0]._id} />
                            </div>
                        );
                    })
                ) : (
                    <div>Loading chats...</div>
                )}
                <div className={styles.endMessage}>
                    <div>
                        <Lock />
                    </div>
                    <div>
                        Your personal messages are{" "}
                        <span className={styles.encryptionMsg}>
                            end-to-end encrypted
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}