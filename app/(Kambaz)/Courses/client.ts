import axios from "axios";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const axiosWithCredentials = axios.create({ withCredentials: true });

const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const MODULES_API = `${HTTP_SERVER}/api/modules`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

// MODULES
export const findModulesForCourse = async (courseId: string) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/modules`);
    console.log("modules for cours: ", response)
  return response.data;
}

export const createModuleForCourse = async (courseId: string, module: any) => {
  console.log("in client ts: ", courseId, module)
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
 const response = await axios.delete(`${COURSES_API}/${courseId}/modules/${moduleId}`);
 return response.data;
};

export const updateModule = async (courseId: string,module: any) => {
  const {data} = await axios.put(`${COURSES_API}/${courseId}/modules/${module._id}`, module);
  return data;
}

// COURSES
export const fetchAllCourses = async () => {
    const {data} = await axios.get(COURSES_API);
    return data;
}

export const findMyCourses = async () => {
    console.log(`${USERS_API}/`);
    const {data} = await axiosWithCredentials.get(`${USERS_API}/current/courses`)
    console.log(data)
    return data;
}

export const createCourse = async (course : any) => {
    const {data} = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
    return data;
}

export const deleteCourse = async (courseId: string) => {
    const {data} = await axios.delete(`${COURSES_API}/${courseId}`);
    return data;
}
export const updateCourse = async (course: any) => {
    const {data} = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
    return data;
}

export const enrollIntoCourse = async (userId: string, courseId: string) => {
const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
return response.data;
};
export const unenrollFromCourse = async (userId: string, courseId: string) => {
const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}`);
return response.data;
};

// Add at the end of the file, after COURSES section:

// ENROLLMENTS
export const enrollInCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/${userId}/courses/${courseId}/enroll`
  );
  return response.data;
};

export const findEnrollmentsForUser = async (userId: string) => {
  const response = await axiosWithCredentials.get(
    `${USERS_API}/${userId}/enrollments`
  );
  return response.data;
};

export const findUsersForCourse = async (courseId: string) => {
const response = await axios.get(`${COURSES_API}/${courseId}/users`);
return response.data;
};

// ASSIGNMENTS
export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const createAssignment = async (courseId: string, assignment: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

export const updateAssignment = async (assignment: any) => {
  const response = await axios.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return response.data;
};