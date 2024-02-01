export const validPassword = { password: "123456" };

export const validEmail = { email: "exemplo@exemplo.com" };

export const validRequest = {...validEmail, ...validPassword};

export const validToken = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc" 
}

export const invalidPassword = { password: "123" };

export const invalidEmail = { email: "exemplo.com" };

export const invalidRequest = {...validEmail, ...validPassword};
