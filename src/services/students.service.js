import service from './index';


const studentService = {
    getAllStudents: () => service.get('/api/students'),
    deleteStudents: (studentId) => service.delete(`/api/schools/${studentId}`),
    createStudents: (dataForm) => service.post('/api/schools', dataForm),
    updateStudents: (studentId, dataForm) => service.put(`/api/schools/${studentId}`, dataForm)
}

export default studentService;