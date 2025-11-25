import { createContext, useState, useEffect } from 'react'

// create the context
export const UserContext = createContext();

// provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // null = not logged in
    const [activities, setActivities] = useState([]);

    // func: auto-logout user when token is expired (after 30 days)
    const handleAuthError = () => {
        setUser(null);
        localStorage.removeItem('user');
        setActivities([]);
        alert("Your session expired. Please log in again.");
    }

    // load user and their activities when logged in
    useEffect(() => {
        const fetchActivities = async () => {
            const storedUser = localStorage.getItem('user');
            if (!storedUser) return;

            const userData = JSON.parse(storedUser);
            setUser(userData);

            try {
                const res = await fetch(`https://onawhim-backend.onrender.com/activities`, {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userData.token}`
                    }
                });

                if (res.status === 401) {
                    handleAuthError();
                    return;
                }

                if (!res.ok) {
                    console.error("Failed to fetch activities:", res.status, res.statusText);
                    setActivities([]);
                    return;
                }

                const data = await res.json();
                setActivities(data);
            } catch (err) {
                console.error("Network error fetching activities:", err);
                setActivities([]);
            }
        };

        fetchActivities();
    }, []);

    // func: log in
    const login = async (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));

        try {
            const res = await fetch(`https://onawhim-backend.onrender.com/activities`, {
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData.token}`
                }
            });

            if (res.status === 401) {
                handleAuthError();
                return;
            }

            if (!res.ok) {
                console.error("Failed to fetch activities after login:", res.status, res.statusText);
                setActivities([]);
                return;
            }

            const data = await res.json();
            setActivities(data);
        } catch (err) {
            console.error("Network error fetching activities after login:", err);
            setActivities([]);
        }
    }

    // func: log out
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        setActivities([]);
    }

    // func: add new activity
    const addActivity = async (name) => {
        if (!user) return;

        // prevent duplicates
        const exists = activities.some(act => act.name === name);
        if (exists) {
            alert("This activity is already in your list :)");
            return;
        }

        try {
            const res = await fetch(`https://onawhim-backend.onrender.com/activities`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify({ name, userId: user._id })
            });

            if (!res.ok) {
                const errData = await res.json();
                alert(errData.error || "Failed to add activity.");
                return;
            }

            const newAct = await res.json();

            // ensure _id exists (temporary fallback if backend fails to send it)
            if (!newAct._id) {
                newAct._id = Date.now().toString();
                console.warn("Backend did not return _id, using temporary key.");
            }

            setActivities(prev => [...prev, newAct]);
            alert("Activity added!");
        } catch (err) {
            console.error(err);
            alert("Failed to add activity.");
        }
    }

    // func: toggle activity status
    const toggleActivityStatus = async (id) => {
        const activity = activities.find(act => act._id === id);
        if (!activity) return;

        const newStatus = activity.status === "undone" ? "done" : "undone";

        try {
            const res = await fetch(`https://onawhim-backend.onrender.com/activities/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            const data = await res.json();

            if (res.status === 401) {
                handleAuthError();
                return;
            }

            if (res.ok) {
                setActivities(prev => prev.map(act => act._id === id ? data : act));
            } else {
                alert(data.error || "Failed to update activity");
            }
        } catch (err) {
            console.error(err);
        }
    }

    // func: delete an activity
    const deleteActivity = async (id) => {
        try {
            const res = await fetch(`https://onawhim-backend.onrender.com/activities/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const data = await res.json();

            if (res.status === 401) {
                handleAuthError();
                return;
            }

            if (res.ok) {
                setActivities(prev => prev.filter(act => act._id !== id));
            } else {
                alert(data.error || "Failed to delete activity");
            }
        } catch (err) {
            console.error(err);
        }
    }

    // func: delete user account
    const deleteUser = async (userId) => {
        if (!user) return;

        try {
            const res = await fetch(`https://onawhim-backend.onrender.com/users/${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            });

            if (res.status === 401) {
                handleAuthError();
                return;
            }

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || "Failed to delete account.");
                return;
            }

            // Success clear everything
            setUser(null);
            localStorage.removeItem("user");
            setActivities([]);

            alert("Your account has been permanently deleted.");
        } catch (err) {
            console.error("Error deleting user:", err);
            alert("Failed to delete account.");
        }
    };


    // values that other pages will use from UserContext
    const value = {
        user,
        login,
        logout,
        activities,
        addActivity,
        deleteActivity,
        toggleActivityStatus,
        deleteUser
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}