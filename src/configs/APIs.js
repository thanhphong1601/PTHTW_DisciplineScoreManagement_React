import axios from "axios";
import cookie from 'react-cookies'


const BASE_URL = 'http://localhost:8080/DisciplineScoreManagement/';

export const endpoints = {
    'activities': '/api/activities/',
    'register': '/api/users/',
    'login': '/api/login/',
    'current-user': '/api/current-user/',
    'faculties': '/api/faculties/',
    'classes': '/api/classes/',
    'activity-detail': (activityId) => `/api/activities/${activityId}/`,
    'comments': (activityId) => `/api/activities/${activityId}/comments/`,
    'create-comment': '/api/comments/',
    'activity-registration': (activityId) => `/api/activities/${activityId}/registration/`,
    'activity-joined': "/api/activities/joined/",
    'create-report': "/api/reports/",
    'reports': "/api/reports/",
    'criterions': "/api/criterions/",
    'scores-detail': "/api/scores/details/",
    'score-total': "/api/scores/total/",
    'stat-class': "/api/stats/class/",
    'stat-class-pdf': "/api/stats/class/pdf/",
    'activity-upload-csv': "/api/activities/upload-csv/"
}

// console.info(cookie.load('token'))

export const authApi = () => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': cookie.load('token')
        }
    })
}

export default axios.create({
    baseURL: BASE_URL
});