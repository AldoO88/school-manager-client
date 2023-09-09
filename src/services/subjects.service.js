import service from './index';


const subjectService = {
    getAllSubject: () => service.get('/api/subjects'),
    deleteSSubjects: (subjectId) => service.delete(`/api/subjects/${subjectId}`),
    createSubjects: (dataForm) => service.post('/api/subjects', dataForm),
    updateSubjects: (subjectId, dataForm) => service.put(`/api/subjects/${subjectId}`, dataForm)
}

export default subjectService;