<<<<<<< HEAD
export const APIURL = 'api/';
//export const APIURL = 'http://localhost:5000/api/';
=======
export const APIURL = (
    process.env.NODE_ENV === 'production' ? 'api/' : 'http://localhost:5000/api/'
);

// export const APIURL = 'api/';
// export const APIURL = 'http://localhost:5000/api/';
>>>>>>> b7890e9e45a05d868b2a1bd35a723cc1f8b12d2e
