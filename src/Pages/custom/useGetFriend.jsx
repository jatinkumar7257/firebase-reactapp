import { useState, useEffect } from 'react';

// Import Axios
import axios from 'axios';

const useGetFriend = (conversationArray, user) => {
    const [friend, setFriend] = useState(null);

    const friendId = conversationArray.members.find((m) => m !== user._id);
    useEffect(() => {
        const getFriend = async () => {
            try {
                const { data } = await axios("/api/user?userId=" + friendId);
                setFriend(data);
            } catch (err) {
                console.log(err);
            }
        }
        getFriend()
    }, [user._id, friendId]);

    return friend;
}

export default useGetFriend;