import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { getDoc, doc, collection } from "firebase/firestore/lite";
import type { Subject, AssignedSubject } from "../../routes/(home)/dashboard/schedule-graph.svelte";
import db from "./firebase.app";

export async function getStudentData() {
    if (!browser) return;

    const student = await getDoc(
        doc(
            collection(db, 'students'),
            sessionStorage.getItem('student-name') ?? ''
        )
    );

    if (!student.exists()) {
        goto('/login');
        return;
    }

    const { firstname, middlename, lastname, email, assigned_subjects } =
        student.data()!;

    const subjects: Subject[] = await (
        assigned_subjects as AssignedSubject[]
    ).reduce(async (arr, { faculty, subject_name }) => {
        const sub = await getDoc(subject_name);

        if (!sub.exists()) return arr;

        const data = sub.data();
        (await arr).push({
            code: subject_name.id,
            desc: data.subject_description,
            faculty: faculty.id,
            units: {
                lec: data.Units.lecture,
                lab: data.Units.laboratory,
            },
            schedule: data.Schedule,
        });

        return arr;
    }, Promise.resolve<Subject[]>([]));

    // console.log(subjects);

    return {
        studentID: student.id,
        name: `${firstname} ${middlename[0].toUpperCase()}. ${lastname}`,
        email,
        subjects,
    };
}