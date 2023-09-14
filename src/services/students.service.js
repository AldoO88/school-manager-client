import service from './index';


const studentService = {
    getAllStudents: () => service.get('/api/students'),
    deleteStudents: (studentId) => service.delete(`/api/students/${studentId}`),
    createStudents: (dataForm) => service.post('/api/students', dataForm),
    updateStudents: (studentId, dataForm) => service.put(`/api/students/${studentId}`, dataForm),
    getOneStudent: studentId => service.get(`/api/students/${studentId}`)
}

export default studentService;