<script>
    import { editingNote, showModal } from '../lib/stores';

    export let note;
    export let onDelete; 

    const handleEdit = () => {
        editingNote.set({ ...note });
        showModal.set(true);
    };
</script>

<div class="bg-white rounded-lg shadow p-4 mb-4">
    <div class="flex justify-between items-start">
        <h3 class="text-lg font-semibold text-gray-800">{note.title}</h3>
        <div class="flex space-x-2">
        <button
            on:click={handleEdit}
            class="text-blue-500 hover:text-blue-700"
        >
            Edit
        </button>
        <button
            on:click={() => onDelete(note.id)}
            class="text-red-500 hover:text-red-700"
        >
            Delete
        </button>
        </div>
    </div>
    <p class="text-gray-600 mt-2">{note.content}</p>
    <p class="text-xs text-gray-400 mt-2">
        Created: {new Date(note.createdAt).toLocaleString()}
    </p>
</div>