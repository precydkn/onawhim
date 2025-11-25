//---login function---
export const loginUser = async (email, password) => {
    try {
        const response = await fetch('http://localhost:3300/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        return { ok: response.ok, data };
    } catch (err) {
        return { ok: false, data: { error: 'Network error' } };
    }
};
//---

//---signup function---
export const signupUser = async (email, password) => {
    try {
        const response = await fetch('http://localhost:3300/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        return { ok: response.ok, data };
    } catch (err) {
        return { ok: false, data: { error: 'Network error' } };
    }
};
//---