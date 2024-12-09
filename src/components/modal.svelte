<script module lang="ts">
    import { browser } from '$app/environment';
    import { type Snippet } from 'svelte';
    import { fade, fly } from 'svelte/transition';

    let children = $state<Snippet | string>();
    let open = $state(false);
    let el: HTMLElement;

    export function updateModalContent(content: Snippet | string) {
        children = content;
    }

    export function openModal(content?: Snippet | string) {
        open = true;
        el?.focus();

        if (content) {
            children = content;
        }
    }

    export function closeModal() {
        open = false;
    }
</script>

<script lang="ts">
    if (browser) {
        window.addEventListener('keydown', (e) => {
            if ((e.code === 'Escape' || e.code === 'Enter') && open) {
                e.preventDefault();
                closeModal();
            }
        });
    }
</script>

{#if open}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="modal-bg" onclick={closeModal} transition:fade bind:this={el}>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
            class="modal-content"
            onclick={(e) => e.stopPropagation()}
            transition:fly={{ y: '-3rem' }}>
            <button class="icon" onclick={closeModal} aria-label="close"><i class="ph-bold ph-x"></i></button>
            {#if typeof children === 'string'}
                {@html children}
            {:else}
                {@render children?.()}
            {/if}
        </div>
    </div>
{/if}

<style lang="scss">
    .modal-bg {
        position: fixed;
        inset: 0;

        background-color: hsla(0, 0%, 0%, 0.5);
        z-index: 999;

        isolation: isolate;

        display: flex;
        flex-direction: column;
        align-items: center;

        padding: 3rem;

        .modal-content {
            background-color: var(--color-primary);
            max-width: 80vw;

            padding: 1.5rem;
            border-radius: 1rem;

            position: relative;

            button {
                position: absolute;
                right: 0.25rem;
                top: 0.25rem;

                background: transparent;
                color: var(--color-brand);

                i {
                    font-size: 1.25rem;
                }
            }
        }
    }
</style>
