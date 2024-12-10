<script lang="ts">
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';

    if (browser) {
        goto(
            sessionStorage.getItem('student-name') !== null ?
                '/dashboard'
            :   '/login'
        );
    }
</script>

<style lang="scss">
</style>
