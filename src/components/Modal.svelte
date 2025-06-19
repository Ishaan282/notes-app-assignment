<script>
    import { showModal } from '../lib/stores';
</script>

<div
    class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50"
    on:click={() => showModal.set(false)}
    >
    <div
        class="bg-white rounded-lg max-w-md w-full p-6"
        on:click|stopPropagation
    >
        <slot />
    </div>
</div>