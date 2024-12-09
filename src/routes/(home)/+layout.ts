import { getStudentData } from "$lib/ts/db";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ url }) => {
    const studentData = await getStudentData();
    return { studentData, pathname: url.pathname };
};