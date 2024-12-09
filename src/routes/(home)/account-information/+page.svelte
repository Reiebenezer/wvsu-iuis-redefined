<script lang="ts">
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import { getStudentData } from '$lib/ts/db';
    import db from '$lib/ts/firebase.app';
    import GradientText from '@/gradient-text.svelte';
    import { openModal } from '@/modal.svelte';
    import {
        collection,
        doc,
        getDoc,
        updateDoc,
    } from 'firebase/firestore/lite';

    async function changePassword(
        e: Event & { currentTarget: HTMLFormElement },
        id: string
    ) {
        e.preventDefault();

        const entries = new FormData(e.currentTarget);
        const oldPassword = entries.get('old-password');
        const newPassword = entries.get('new-password');

        const studentDoc = doc(collection(db, 'students'), id);
        const student = await getDoc(studentDoc);

        if (!student.exists() && browser) {
            goto('/login');
            return;
        }

        if (student.data()?.['password'] !== oldPassword) {
            return openModal(
                `<div>
                    <h2>Password Change Error</h2>
                    <br>
                    <p>The old password you have entered is incorrect.</p>
                </div>`
            );
        }

        updateDoc(studentDoc, {
            password: newPassword,
        })
            .then(() =>
                openModal(
                    `<div>
                <h2>Password Change Success</h2>
                <br>
                <p>
                    You have successfully changed your password. Please save 
                    your new password so that you won't forget it in the future.
                </p>
            </div>`
                )
            )
            .catch((err) =>
                openModal(
                    `<div>
                    <h2>Password Change Error</h2>
                    <br>
                    <p>
                        Something went wrong while changing your password.
                        <br><br>
                        Detailed Error Message:
                        <br>#${err}#
                    </p>
                </div>`
                )
            )
            .finally(() => {
                e.currentTarget.reset();
            });
    }

    const { data } = $props();
    const { studentData } = data;
</script>

<h1>Account Information</h1>

{#if studentData}
    <div class="main-card">
        <section>
            <span>
                <img src="" alt="" />
                <div>
                    <GradientText gradientRule="var(--gradient-accent-brand)">
                        <h2>{studentData?.name}</h2>
                    </GradientText>
                    <p class="opacity-faded">
                        Student ID: {studentData?.studentID}
                    </p>
                </div>
            </span>
            <button disabled>Edit Personal Information</button>
        </section>

        <h3>Academic Information</h3>
        <ul>
            <li>
                <strong>Program/Degree:</strong> Bachelor of Science in Computer
                Science
            </li>
            <li><strong>Year Level:</strong> Third</li>
            <li><strong>Status:</strong> Regular</li>
        </ul>

        <h3>Personal Information</h3>
        <ul>
            <li>
                <i class="ph ph-envelope"></i>reiebenezer.duhina@wvsu.edu.ph
            </li>
            <li>
                <i class="ph ph-map-pin"></i>Purok 1, Yapo, Barbaza, Antique
            </li>
            <li><i class="ph ph-phone"></i>+63 997 087 1255</li>
        </ul>
    </div>

    <div class="main-card">
        <h2>Change Password</h2>
        <form onsubmit={(e) => changePassword(e, studentData!.studentID)}>
            <label>
                Old Password
                <input type="password" name="old-password" required />
            </label>

            <label>
                New Password
                <input type="password" name="new-password" required />
            </label>

            <button>Change Password</button>
        </form>
    </div>
{/if}

<style lang="scss">
    section:first-of-type {
        display: flex;
        align-items: center;
        justify-content: space-between;

        > span {
            display: inherit;
            align-items: inherit;
            gap: 1rem;

            img {
                width: 6rem;
                height: 6rem;
                object-fit: cover;
                border-radius: 100vw;
            }
        }
    }

    ul {
        list-style-type: none;

        li {
            display: flex;
            align-items: center;
        }

        strong, i {
            margin-right: 1ch;
        }
    }

    form {
        max-width: 50%;
        display: grid;
        gap: 1rem;

        button {
            width: fit-content;
        }
    }
</style>
