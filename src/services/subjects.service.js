import service from './index';


const subjectService = {
    getAllSubjects: () => service.get('/api/subjects'),
    deleteSSubjects: (subjectId) => service.delete(`/api/subjects/${subjectId}`),
    createSubjects: (dataForm) => service.post('/api/subjects', dataForm),
    updateSubjects: (subjectId, dataForm) => service.put(`/api/subjects/${subjectId}`, dataForm),
    getOneSubject: (subjectId) => service.get(`/api/subjects/${subjectId}`)
}

export default subjectService;