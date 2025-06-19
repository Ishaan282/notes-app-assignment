const API_URL = 'https://68540312a2a37a1d6f4ad1fd.mockapi.io/hi/notes';

export const getNotes = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Failed to fetch notes');
    }
    return await response.json();
};

export const createNote = async (note) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Failed to create note');
    }
    return await response.json();
};

export const updateNote = async (id, note) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Failed to update note');
    }
    return await response.json();
};

export const deleteNote = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Failed to delete note');
    }
    return await response.json();
};