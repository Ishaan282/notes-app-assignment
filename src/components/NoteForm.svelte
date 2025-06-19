<script>
    export let note = { title: '', content: '' };
    export let onSubmit;
    export let onCancel;
    
    let title = note.title;
    let content = note.content;
    </script>

    <form
    on:submit|preventDefault={() => onSubmit({ title, content })}
    class="space-y-4"
    >
    <div>
        <label for="title" class="block text-sm font-medium text-gray-700"
        >Title</label
        >
        <input
        type="text"
        id="title"
        bind:value={title}
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
        />
    </div>
    
    <div>
        <label for="content" class="block text-sm font-medium text-gray-700"
        >Content</label
        >
        <textarea
        id="content"
        bind:value={content}
        required
        rows="4"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
        ></textarea>
    </div>
    
    <div class="flex justify-end space-x-3">
        {#if onCancel}
        <button
            type="button"
            on:click={onCancel}
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
            Cancel
        </button>
        {/if}
        <button
        type="submit"
        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
        Save
        </button>
    </div>
</form>