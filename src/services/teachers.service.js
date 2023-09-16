import service from './index';


const teacherService = {
    getAllTeachers: () => service.get('/api/teachers'),
    addSubject: (teacherId, subjectSelected) => service.put(`/api/teachers/addSubject/${teacherId}`, subjectSelected),
    deleteSubject: (teacherId, subjectSelected) => service.put(`/api/teachers/deleteSubject/${teacherId}`, subjectSelected),
    getSubjectRigth: (teacherId) => service.get(`/api/teachers/subjects/${teacherId}`),
    getSubjectLeft: (teacherId) => service.get(`/api/teachers/noSubjects/${teacherId}`),
    deleteTeacher: (teacherId) => service.put(`/api/teachers/${teacherId}`)

}

export default teacherService;