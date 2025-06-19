import { writable } from 'svelte/store';

export const notes = writable([]);
export const isLoading = writable(false);
export const error = writable(null);
export const editingNote = writable(null);
export const showModal = writable(false);
//this file is used for storing the data 