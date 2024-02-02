export const validPassword = { password: "123456" };

export const validEmail = { email: "user@user.com" };

export const validRequest = {...validEmail, ...validPassword};

export const invalidPassword = { password: "123" };

export const invalidEmail = { email: "exemplo.com" };

export const invalidRequest = {...validEmail, ...validPassword};

export const dbUser= {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$10$zQXrWhzbsxkTMwrl5D5UWOgVIfHYz6DO1tv.1WhhQeDpWLOdbKc8O'
}

export const validToken = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJ1c2VybmFtZSI6IlVzZXIiLCJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJyb2xlIjoidXNlciJ9LCJpYXQiOjE3MDY4MTc4NzZ9.aMeazUvbrpxRwbiq-li-E3GFb2zCREhP3mMw-acjMjo"
  }

  export const invalidToken = {
    token: "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJ1c2VybmFtZSI6IlVzZXIiLCJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJyb2xlIjoidXNlciJ9LCJpYXQiOjE3MDY4MTc4NzZ9.aMeazUvbrpxRwbiq-li-E3GFb2zCREhP3mMw-acjMjo"
  }

export const validHeaderRequest = { authorization: `Bearer ${ validToken.token }` }
export const invalidHeaderRequest = { authorization: `Bearer ${ invalidToken.token }` }