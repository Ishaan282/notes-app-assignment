<script>
  import { onMount } from 'svelte';
  import { notes, isLoading, error, editingNote, showModal } from './lib/stores';
  import { getNotes, createNote, updateNote, deleteNote } from './lib/api';
  import Note from './components/Note.svelte';
  import NoteForm from './components/NoteForm.svelte';
  import Modal from './components/Modal.svelte';
  
  let isCreating = false;
  
  onMount(async () => {
    await fetchNotes();
  });
  
  async function fetchNotes() {
    isLoading.set(true);
    try {
      const fetchedNotes = await getNotes();
      notes.set(fetchedNotes);
      error.set(null);
    } catch (err) {
      error.set(err.message);
    } finally {
      isLoading.set(false);
    }
  }
  
  async function handleCreate(newNote) {
    isLoading.set(true);
    try {
      await createNote(newNote);
      await fetchNotes();
      isCreating = false;
      error.set(null);
    } catch (err) {
      error.set(err.message);
    } finally {
      isLoading.set(false);
    }
  }
  
  async function handleUpdate(updatedNote) {
    isLoading.set(true);
    try {
      await updateNote(updatedNote.id, updatedNote);
      await fetchNotes();
      showModal.set(false);
      error.set(null);
    } catch (err) {
      error.set(err.message);
    } finally {
      isLoading.set(false);
    }
  }
  
  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this note?')) return;
    
    isLoading.set(true);
    try {
      await deleteNote(id);
      await fetchNotes();
      error.set(null);
    } catch (err) {
      error.set(err.message);
    } finally {
      isLoading.set(false);
    }
  }
</script>

<main class="container mx-auto p-4 max-w-3xl">
  <h1 class="text-3xl font-bold text-gray-800 mb-6">Notes App</h1>
  
  {#if $error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {$error}
    </div>
  {/if}
  
  <div class="mb-6">
    {#if !isCreating}
      <button
        on:click={() => isCreating = true}
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create New Note
      </button>
    {:else}
      <div class="bg-white rounded-lg shadow p-4 mb-4">
        <NoteForm onSubmit={handleCreate} onCancel={() => isCreating = false} />
      </div>
    {/if}
  </div>
  
  {#if $isLoading}
    <div class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  {:else}
    <div class="space-y-4">
      {#each $notes as note (note.id)}
        <Note {note} onDelete={handleDelete} />
      {:else}
        <p class="text-gray-500 text-center py-8">No notes found. Create one!</p>
      {/each}
    </div>
  {/if}
  
  {#if $showModal}
    <Modal>
      <h2 class="text-xl font-semibold mb-4">Edit Note</h2>
      <NoteForm
        note={$editingNote}
        onSubmit={(updatedNote) => handleUpdate(updatedNote)}
        onCancel={() => showModal.set(false)}
      />
    </Modal>
  {/if}
</main>