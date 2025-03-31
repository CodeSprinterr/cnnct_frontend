//service/index.js
export const API_URL = import.meta.env.VITE_API_URL;

export async function registerService({ data }) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response;
}
export async function login({ data }) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response;
}
export async function updateProfile(data) {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch(`${API_URL}/auth/updateProfile`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}


export async function setuserName({ username, category }) {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch(`${API_URL}/user/setUserName`, {
        method: "POST",
        body: JSON.stringify({ username, category }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });

    return response;
}
export async function fetchUser() {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch(`${API_URL}/user/getUser`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function fetchEvent() {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch(`${API_URL}/event/fetch`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function create(data) {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch(`${API_URL}/event/create`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });

    return response;
}

export async function updateEventStatus(eventId, isActive) {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch(`${API_URL}/event/update-status/${eventId}`, {
        method: "PUT",
        body: JSON.stringify({ isActive }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function deleteEvent(eventId) {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch(`${API_URL}/event/delete/${eventId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function updateEvent(eventId, updatedData) {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch(`${API_URL}/event/update/${eventId}`, {
        method: "PUT",
        body: JSON.stringify(updatedData),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function myEvents() {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch(`${API_URL}/event/my-events`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function updateBookingStatus(participantId, status) {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch(`${API_URL}/event/update-booking-status/${participantId}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}


export async function myCalenderEvents() {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch(`${API_URL}/event/my-calender-events`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function saveTimeSlot(updatedAvailability) {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch(`${API_URL}/user/availability`, {
        method: "POST",  // ✅ Fix: Ensure it's a POST request
        body: JSON.stringify(updatedAvailability),  // ✅ Fix: Pass data properly
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function getAvailability() {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch(`${API_URL}/user/get-availability`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}















